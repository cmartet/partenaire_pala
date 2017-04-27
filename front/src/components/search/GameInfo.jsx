import React, {Component}   from 'react';
import {hashHistory}        from 'react-router';
import Chip                 from 'material-ui/Chip';
import FlatButton           from 'material-ui/FlatButton';
import PropTypes            from 'prop-types';
import RaisedButton         from 'material-ui/RaisedButton';
import * as utils           from '../../utils';

var PersonIcon = require('react-icons/lib/io/person-stalker.js');

import './GameInfo.scss';

const propTypes = {
    creator: PropTypes.string,
    creatorId: PropTypes.string,
    connectedUserId: PropTypes.string,
    date: PropTypes.object.dateTime,
    deleteGame: PropTypes.func,
    displayMode: PropTypes.boolean,
    gameId: PropTypes.string,
    joinGame: PropTypes.func,
    leaveGame: PropTypes.func,
    level: PropTypes.string,
    maxPlayers: PropTypes.number,
    place: PropTypes.string.required,
    placePicture: PropTypes.string,
    players: PropTypes.array
};

const defaultProps = {
    placePicture: null
};

const chipsStyle = {
    chip: {
        margin: 4,
        fontSize: '10px'
    }
};

class GameInfo extends Component {

    playersList = () => {
        const listItems = this.props.players.map((player) =>
            <Chip style={chipsStyle.chip} key={player.name}>{player.name}</Chip>
        );
        return (<div className="players">{listItems}</div>);
    };

    gameIsOver = () => {
        return new Date(this.props.date) < new Date();
    };

    gameHasEnoughPlayers = () => {
        return !this.props.displayMode && this.props.maxPlayers <= this.props.players.length;
    };

    isGameComplete = () => {
        return this.gameIsOver() || this.gameHasEnoughPlayers();
    };

    getNbPlayersInfo = () => {
        let nbPlayers = this.props.players.length;
        return (
            <div>
                <span className="nb-players-present">
                    {nbPlayers}
                </span>
                <span className="nb-players-max"> / {this.props.maxPlayers}</span>
            </div>);
    };

    userIsCreator = () => {
        return this.props.creatorId === this.props.connectedUserId;
    };

    userAlreadyJoined = () => {
        var userAlreadyInGame = false;
        for (var i = 0; i < this.props.players.length; i++) {
            if (this.props.players[i]._id === this.props.connectedUserId) {
                userAlreadyInGame = true;
                break;
            }
        }

        return userAlreadyInGame;
    };

    handleButtons = () => {
        if (this.props.displayMode) {
            return null;
        }

        if (this.userIsCreator()) {
            return (
                <div>
                    <FlatButton secondary={true}
                                label="Editer"
                                onClick={() => {hashHistory.push('/update/' + this.props.gameId)}}/>

                    <RaisedButton secondary={true}
                                  label="Supprimer"
                                  onClick={() => this.props.deleteGame(this.props.gameId)}/>
                </div>);
        }

        if (this.userAlreadyJoined()) {
            return (<RaisedButton primary={true}
                                  label="Ne plus participer"
                                  onClick={() => this.props.leaveGame(this.props.gameId)}/>);
        }
        else {
            return (<RaisedButton primary={true}
                                  disabled={this.isGameComplete()}
                                  label="Rejoindre"
                                  onClick={() => this.props.joinGame(this.props.gameId)}/>);
        }
    };

    displayPlacePicture = () => {
        if (this.props.placePicture !== null) {
            return (<img src={this.props.placePicture} alt={this.props.place}/>);
        }
    };

    render() {
        return (
            <div className="GameInfo">
                <div className="header-info">
                    <div className="place">
                        {this.props.place}
                    </div>
                    <div className="nb-players-info">
                        {React.createElement(PersonIcon, null)}{this.getNbPlayersInfo()}
                    </div>
                </div>

                <div className="all-info">
                    <div>
                        Proposé par
                          <span className="creator-name">
                              &nbsp;{this.props.creator} ({this.props.level})
                          </span>
                    </div>
                    {this.displayPlacePicture()}
                    <div className="game-datetime">
                        <div className="date">{utils.getFormattedDate(this.props.date)}</div>
                        <div className="time">{utils.getFormattedTime(this.props.date)}</div>
                    </div>

                    {this.props.displayMode && this.props.players.length === 0 ? null :
                        this.props.players.length > 0 ?
                            (<div className="players-info">
                                <div className="players-list">Participants</div>
                                {this.playersList()}
                            </div>) :
                            (<div>Aucun joueur n'a rejoint cette partie pour le moment.</div>)
                    }
                    {this.handleButtons()}

                </div>
            </div>
        );
    }
}

GameInfo.protoTypes = propTypes;
GameInfo.defaultProps = defaultProps;

export default GameInfo;
