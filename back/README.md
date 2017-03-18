API CRUD du site WEB Partenaire Pala

# Les méthodes

## /ping (GET)

Permet de vérifier si le service est en ligne en retournant "ok" et un status 200

## /auth/facebook (GET)

Authentifie l'utilisateur via Facebook.
Si l'utilisateur n'est pas connecté à Facebook, redirige vers la page d'authentification Facebook.

#### Objet renvoyé

Les informations du profil de l'utilisateur

```js
{ 
    "_id": "58638cf7fb1c20286837d2b8",
    "facebook": {
        "id":    "125197527977624",
        "name":  "Pike Apps",
        "token": "EAARnnh5nes0BAA8ZCvQg"
    }
}
```

## /logout (GET)

Supprime l'utilisateur de la session. 
Ne le déconnecte pas de Facebook.

## /games
### GET

Récupère les parties en filtrant sur une date de début et/ou une date de fin et/ou un lieu. Les filtres sont optionnels.

Exemple sans filtre: 
```
/games
```

Exemple filtre date de début: 
```
/games?search={"start":"2017-03-11T14:00:00.000Z"}
```

Exemple filtre date de fin: 
```
/games?search={"end":"2017-03-11T14:00:00.000Z"}
```

Exemple filtre lieu: 
```
/games?search={"place":"begles"}
```

Exemple avec tous les filtres: 
```
/games?search={"start":"2017-03-11T14:00:00.000Z","end":"2017-03-12T14:00:00.000Z","place":"begles"}
```

#### Objet renvoyé

```js
[
    { 
        "_id" : "58c14f2387f8c551ccdc45c8", 
        "date" : "2017-03-13T22:02:14.196+0000", 
        "level" : "expert", 
        "maxMissingPlayers" : NumberInt(4), 
        "message" : "toto", 
        "players" : [{
            "_id" : "456197527977624", 
            "name" : "Madame michue"
        }], 
        "place" : {
            "fronton_id" : NumberInt(184), 
            "type" : "place_libre", 
            "permalink" : "http://www.frontons.net/fronton/33610-cestas-france-184.html", 
            "photo" : "http://static.frontons.net/data/photos/medium/fronton-33610-cestas-france-184_0.jpg", 
            "name" : "33610 Cestas, France", 
            "location" : {
                "lat" : 44.741801, 
                "lng" : -0.680074, 
                "address" : "10 Avenue de la Chênaie, 33610 Cestas, France", 
                "search_key" : "10 Avenue de la Chenaie, 33610 Cestas, France" //utilisé pour la recherche serveur
            }
        }, 
        "creator" : {
            "_id" : "125197527977624", 
            "name" : "Pike Apps"
        }, 
        "__v" : NumberInt(0) //utilisé par mongoose
    }
]
```

### POST

Créé une nouvelle partie

#### Headers

<b>Content-Type (obligatoire)</b>: format du body de la requête
```js
Content-Type: application/json
```

<b>Authorization (obligatoire)</b>: token d'authentification
```js
Authorization: Bearer abcd1234
```

#### Body
```js
{
    "creator": { 
        "_id": "5698e3b6a09e5410e4f5e1b8", 
        "name": "Madame michue" 
    },
    "place": {
        "fronton_id": 2087,
        "type": "place_libre",
        "photo": "http://static.frontons.net/data/photos/medium/fronton-64130-viodos-abense-de-bas-france-2087_0.jpg",
        "permalink": "http://www.frontons.net/fronton/64130-viodos-abense-de-bas-france-2087.html",
        "name": "64130 Viodos-Abense-de-Bas, France",
        "location":
        {
            "lat": 43.260503,
            "lng": -0.880155,
            "address": "D11, 64130 Viodos-Abense-de-Bas, France"
        }
    },
    "date": "2099-01-01T14:00:00.000Z",
    "level": "debutant",
    "maxMissingPlayers": 3,
    "message": "toto",
    "players": []
}
```

### PUT /games/id/:id

Met à jour les informations d'une partie. Seul le créateur de la partie peut effectuer cette action.

#### Headers

<b>Content-Type (obligatoire)</b>: format du body de la requête
```js
Content-Type: application/json
```
<b>Authorization (obligatoire)</b>: token d'authentification
```js
Authorization: Bearer abcd1234
```

#### Body
```js
{
    "_id" : "58c14f2387f8c551ccdc45c8", 
    "creator": { 
        "_id": "5698e3b6a09e5410e4f5e1b8", 
        "name": "Madame michue" 
    },
    "place": {
        "fronton_id": 2087,
        "type": "place_libre",
        "photo": "http://static.frontons.net/data/photos/medium/fronton-64130-viodos-abense-de-bas-france-2087_0.jpg",
        "permalink": "http://www.frontons.net/fronton/64130-viodos-abense-de-bas-france-2087.html",
        "name": "64130 Viodos-Abense-de-Bas, France",
        "location":
        {
            "lat": 43.260503,
            "lng": -0.880155,
            "address": "D11, 64130 Viodos-Abense-de-Bas, France"
        }
    },
    "date": "2099-01-01T14:00:00.000Z",
    "level": "debutant",
    "maxMissingPlayers": 3,
    "message": "toto",
    "players": []
}
```

### PUT /games/join/id/:id

Permet à un joueur de rejoindre une partie. 

Un joueur ne peut pas rejoindre une partie si il a déjà rejoint cette partie ou si la partie est complète.

L'id dans l'appel correspond à l'id de la partie que le joueur souhaite rejoindre.

#### Headers

<b>Authorization (obligatoire)</b>: token d'authentification
```js
Authorization: Bearer abcd1234
```

### PUT /games/unjoin/id/:id

Permet à un joueur de sortir d'une partie. 

L'id dans l'appel correspond à l'id de la partie que le joueur souhaite quitter.

#### Headers

<b>Authorization (obligatoire)</b>: token d'authentification
```js
Authorization: Bearer abcd1234
```

### DELETE /games/id/:id

Supprime une partie à partir de son _id. 
Seul le créateur de la partie peut effectuer cette action.

#### Headers

<b>Authorization (obligatoire)</b>: token d'authentification
```js
Authorization: Bearer abcd1234
```

## /places
### GET /places/search/\<search>

Récupère les frontons en filtrant sur une chaine de caractères. 

Le nombre de frontons renvoyés est limité à 25.

#### Objet renvoyé

```js
[
    {
        "fronton_id":2087,
        "created_at":"2016-04-13 19:35:27",
        "type":"place_libre",
        "permalink":"http://www.frontons.net/fronton/64130-viodos-abense-de-bas-france-2087.html",
        "photo":"http://static.frontons.net/data/photos/medium/fronton-64130-viodos-abense-de-bas-france-2087_0.jpg",
        "name":"64130 Viodos-Abense-de-Bas, France",
        "location":
        {
            "lat":43.260503,
            "lng":-0.880155,
            "address":"D11, 64130 Viodos-Abense-de-Bas, France"
        }
    },
    ...
]
```

### GET /places/lat/\<lat>/lng/\<lng>/radius/\<radius>

Récupère les frontons en filtrant une géolocalisation précise (latitude, longitude et rayon de recherche).

Le nombre de frontons renvoyés est limité à 25.

#### Objet renvoyé

```js
[
    {
        "fronton_net_id":2087,
        "created_at":"2016-04-13 19:35:27",
        "type":"place_libre",
        "permalink":"http://www.frontons.net/fronton/64130-viodos-abense-de-bas-france-2087.html",
        "photo":"http://static.frontons.net/data/photos/medium/fronton-64130-viodos-abense-de-bas-france-2087_0.jpg",
        "name":"64130 Viodos-Abense-de-Bas, France",
        "location":
        {
            "lat":43.260503,
            "lng":-0.880155,
            "address":"D11, 64130 Viodos-Abense-de-Bas, France"
        }
    },
    ...
]
```

# Lancement en local

Pour lancer le service :

le service se lance sur le port 8090 par défaut
```cmd
> node server.js 
```

lance le service en spécifiant un port
```cmd
> node server.js --port=12345
```    