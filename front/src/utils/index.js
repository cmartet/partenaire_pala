import * as app from '../constants/App.js';

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
        case 'place_libre':
            return 'Place libre';
        case 'mur_a_gauche':
            return 'Mur à Gauche';
        case 'trinquet':
            return 'Trinquet';
        default:
            return 'Type inconnu';
    }
}