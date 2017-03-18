import * as app from '../constants/App.js';
import * as gameData from '../constants/GameData.js';
import areIntlLocalesSupported  from 'intl-locales-supported';

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

export function getAuthCookie() {
    var value = "; " + document.cookie;
    var parts = value.split("; " + app.AUTHORIZATION_COOKIE_KEY + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export function removeAuthCookie() {
    document.cookie = app.AUTHORIZATION_COOKIE_KEY + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function mapPlaceType(type) {
    switch (type) {
        case gameData.FRONTON:
            return 'Place libre';
        case gameData.MUR_GAUCHE:
            return 'Mur à Gauche';
        case gameData.TRINQUET:
            return 'Trinquet';
        default:
            return 'Type inconnu';
    }
}


export function getDateTimeFormat() {
    /**
     * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
     */
    if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
        return global.Intl.DateTimeFormat;
    } else {
        const IntlPolyfill = require('intl');
        require('intl/locale-data/jsonp/fr');
        require('intl/locale-data/jsonp/fa-IR');
        return IntlPolyfill.DateTimeFormat;
    }
}

export function getFormattedTime(dateTime) {
    var datetime = new Date(dateTime);
    var hour = datetime.getHours();
    var minutes = datetime.getMinutes();
    if (minutes.toString().length < 2) {
        minutes = "0" + minutes;
    }

    return hour + ":" + minutes;
}

const isSameDay = (date1, date2) => {
    var firstDate = new Date(date1);
    var secondDate = new Date(date2);

    return firstDate.setHours(0, 0, 0, 0) === secondDate.setHours(0, 0, 0, 0);
};

const gameIsToday = (date) => {
    var today = new Date();
    return isSameDay(date, today);
};

const gameIsTomorrow = (date) => {
    var today = new Date();
    var tomorrow = today.setDate(today.getDate() + 1);
    return isSameDay(date, tomorrow);
};

export function getFormattedDate(dateTime) {
    if (gameIsToday(dateTime)) {
        return "Aujourd'hui";
    }

    if (gameIsTomorrow(dateTime)) {
        return "Demain";
    }

    var date = new Date(dateTime);
    var day = translateDay[date.getDay()];
    var numberInMonth = date.getDate();
    var month = translateMonth[date.getMonth()];
    var year = date.getFullYear();

    return day + " " + numberInMonth + " " + month + " " + year;
}