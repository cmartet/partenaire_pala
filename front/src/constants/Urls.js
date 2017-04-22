export const DOMAIN_NAME = process.env.API_URL;

export const GET_GAMES = DOMAIN_NAME + '/games';
export const GET_PLACES = DOMAIN_NAME + '/places/search/';
export const CREATE_GAME = DOMAIN_NAME + '/games';
export const DELETE_GAME = DOMAIN_NAME + '/games/id/';

export const FACEBOOK_AUTH = DOMAIN_NAME + '/auth/facebook/from/1';
export const LOGOUT = DOMAIN_NAME + '/logout';
export const GET_PROFILE = DOMAIN_NAME + '/profile';

export const JOIN_GAME = DOMAIN_NAME + '/games/join/id/';
export const UNJOIN_GAME = DOMAIN_NAME + '/games/unjoin/id/';