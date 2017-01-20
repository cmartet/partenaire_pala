import React, {Component} from 'react';
import {Badge, Button} from 'react-bootstrap';
import PersonIcon from '../../../public/assets/images/ic_person_white.svg';
import PlaceIcon from '../../../public/assets/images/ic_place_white.svg';

import './GameInfo.scss';

const propTypes = {
    place: React.PropTypes.string.required,
    placePicture: React.PropTypes.string,
    date: React.PropTypes.object.dateTime,
    level: React.PropTypes.bool.string,
    maxPlayers: React.PropTypes.number,
    creator: React.PropTypes.bool.string,
    players: React.PropTypes.array
};

const defaultProps = {
    placePicture: null
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

var areDatesSameDay = function (date1, date2) {
    var firstDate = new Date(date1);
    var secondDate = new Date(date2);

    return firstDate.setHours(0, 0, 0, 0) === secondDate.setHours(0, 0, 0, 0);
};

class GameInfo extends Component {

    playersList() {
        const listItems = this.props.players.map((player) =>
            <Badge key={player.name}>{player.name}</Badge>
        );
        return (<div> {listItems}</div>);
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
        return areDatesSameDay(this.props.date, today);
    }

    gameIsTomorrow() {
        var today = new Date();
        var tomorrow = today.setDate(today.getDate() + 1);
        return areDatesSameDay(this.props.date, tomorrow);
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
        return this.props.maxPlayers <= this.props.players.length;
    }

    isGameComplete() {
        return this.gameIsOver() || this.gameHasEnoughPlayers();
    }

    getNbPlayersInfo() {
        return (<div><span className="nb-players-present">
            {this.props.players.length}
        </span>
            <span className="nb-players-max"> / {this.props.maxPlayers}</span>
        </div>);
    }

    render() {
        return (
            <div className="GameInfo">
                <div className="header-info">
                    <div className="place">
                        <img src={PlaceIcon} alt="place-icon"/>
                        {this.props.place}
                    </div>
                    <div className="nb-players-info">
                        <img src={PersonIcon} alt="person-icon"/>
                        {this.getNbPlayersInfo()}</div>
                </div>

                <div className="all-info">
                      <span>
                          Proposé par
                          <span className="creator-name">
                              &nbsp;{this.props.creator}
                          </span>
                      </span>

                    {(this.props.placePicture !== null) ?
                        <img src={this.props.placePicture} alt={this.props.place + " Picture"}/>
                        : null}
                    <div className="game-datetime">
                        <div className="date">{this.getFormattedDate()}</div>
                        <div className="time">{this.getFormattedTime()}</div>
                    </div>
                    <div className="players-info">
                        <div className="players-list">Participants</div>
                        <div className="players">
                            {this.playersList()}
                        </div>
                    </div>
                    <Button disabled={this.isGameComplete()}>Rejoindre</Button>
                </div>
            </div>
        );
    }
}

GameInfo.protoTypes = propTypes;
GameInfo.defaultProps = defaultProps;

export default GameInfo;
