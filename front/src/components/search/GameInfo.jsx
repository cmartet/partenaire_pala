import React, {Component, PropTypes}    from 'react';
import Chip                             from 'material-ui/Chip';
import RaisedButton                     from 'material-ui/RaisedButton';

var PersonIcon = require('react-icons/lib/io/person-stalker.js');

import './GameInfo.scss';

const propTypes = {
    gameId: PropTypes.string,
    place: PropTypes.string.required,
    placePicture: PropTypes.string,
    date: PropTypes.object.dateTime,
    level: PropTypes.string,
    maxPlayers: PropTypes.number,
    creator: PropTypes.string,
    creatorId: PropTypes.string,
    players: PropTypes.array,
    connectedUserId: PropTypes.string,
    deleteGame: PropTypes.func,
    displayMode: PropTypes.boolean,
    nbPlayers: PropTypes.number
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

const translateDay = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"];

const translateMonth = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"];

var isSameDay = function (date1, date2) {
    var firstDate = new Date(date1);
    var secondDate = new Date(date2);

    return firstDate.setHours(0, 0, 0, 0) === secondDate.setHours(0, 0, 0, 0);
};

class GameInfo extends Component {

    playersList() {
        const listItems = this.props.players.map((player) =>
            <Chip style={chipsStyle.chip} key={player.name}>{player.name}</Chip>
        );
        return (<div className="players"> {listItems}</div>);
    }

    getFormattedDate() {
        if (this.gameIsToday()) {
            return "Aujourd'hui";
        }

        if (this.gameIsTomorrow()) {
            return "Demain";
        }

        var date = new Date(this.props.date);
        var day = translateDay[date.getDay()];
        var numberInMonth = date.getDate();
        var month = translateMonth[date.getMonth()];
        var year = date.getFullYear();

        return day + " " + numberInMonth + " " + month + " " + year;
    }

    gameIsToday() {
        var today = new Date();
        return isSameDay(this.props.date, today);
    }

    gameIsTomorrow() {
        var today = new Date();
        var tomorrow = today.setDate(today.getDate() + 1);
        return isSameDay(this.props.date, tomorrow);
    }

    getFormattedTime() {
        var datetime = new Date(this.props.date);
        var hour = datetime.getHours();
        var minutes = datetime.getMinutes();
        if (minutes.toString().length < 2) {
            minutes = "0" + minutes;
        }

        return hour + ":" + minutes;
    }

    gameIsOver() {
        return new Date(this.props.date) < new Date();
    }

    gameHasEnoughPlayers() {
        return !this.props.displayMode && this.props.maxPlayers <= this.props.players.length;
    }

    isGameComplete() {
        return this.gameIsOver() || this.gameHasEnoughPlayers();
    }

    getNbPlayersInfo() {
        let nbPlayers = this.props.displayMode ? this.props.nbPlayers : this.props.players.length;
        return (
            <div>
                <span className="nb-players-present">
                    {nbPlayers}
                </span>
                <span className="nb-players-max"> / {this.props.maxPlayers}</span>
            </div>);
    }

    userIsCreator() {
        return this.props.creator
    }

    render() {
        return (
            <div className="GameInfo">
                <div className="header-info">
                    <div className="place">
                        {this.props.place}
                    </div>
                    <div className="nb-players-info">
                        {React.createElement(PersonIcon, null)}{this.getNbPlayersInfo()}</div>
                </div>

                <div className="all-info">
                    <div>
                        Proposé par
                          <span className="creator-name">
                              &nbsp;{this.props.creator} ({this.props.level})
                          </span>
                    </div>

                    {(this.props.placePicture !== null) ?
                        <img src={this.props.placePicture} alt={this.props.place + " Picture"}/>
                        : null}
                    <div className="game-datetime">
                        <div className="date">{this.getFormattedDate()}</div>
                        <div className="time">{this.getFormattedTime()}</div>
                    </div>

                    {this.props.displayMode ? null :
                        this.props.players.length > 0 ?
                            (<div className="players-info">
                                <div className="players-list">Participants</div>
                                {this.playersList()}
                            </div>) :
                            (<div>Aucun joueur n'a rejoint cette partie pour le moment.</div>)

                    }
                    {this.props.displayMode ? null :
                        this.userIsCreator() ?

                            <RaisedButton secondary={true}
                                          label="Supprimer"
                                          onClick={ () => this.props.deleteGame(this.props.gameId)}/> :

                            <RaisedButton primary={true}
                                          disabled={this.isGameComplete()}
                                          label="Rejoindre"/>}

                </div>
            </div>
        );
    }
}

GameInfo.protoTypes = propTypes;
GameInfo.defaultProps = defaultProps;

export default GameInfo;
