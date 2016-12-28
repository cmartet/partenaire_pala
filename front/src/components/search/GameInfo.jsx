import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

import './GameInfo.scss';

const propTypes = {
    place: React.PropTypes.string,
    placePicture:  React.PropTypes.string,
    date: React.PropTypes.object.dateTime,
    level: React.PropTypes.bool.string,
    maxPlayers:  React.PropTypes.number,
    players: React.PropTypes.array
};

class GameInfo extends Component {

    gameIsOver(){
        return this.props.date > new Date();
    }

    gameHasEnoughPlayers(){
        return this.props.maxPlayers >= this.props.players.length
    }

    isGameComplete(){
        return this.gameIsOver || this.gameHasEnoughPlayers;
    }

    render() {
        return (
            <div className="GameInfo">
                <div className="place">{this.props.place}</div>
                <img src={this.props.placePicture}/>
                <div className="date">{this.props.date}</div>

                <Button disabled={this.isGameComplete()}>Rejoindre</Button>
            </div>
        );
    }
}

GameInfo.protoTypes = propTypes;

export default GameInfo;
