import * as app from '../constants/App.js';
import * as gameData from '../constants/GameData.js';
import areIntlLocalesSupported  from 'intl-locales-supported';

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