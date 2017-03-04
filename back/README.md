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
### GET /date/\<date>/place/\<place>

Récupère les parties en filtrant sur la date et/ou le lieu. Les filtres sont optionnels.

Exemple sans filtre: 
```
/games
```

Exemple filtre date: 
```
/games/date/2017-09-06T14:00:00.000Z
```

Exemple filtre lieu: 
```
/games/place/Moga
```

Exemple filtre date ET lieu: 
```
/games/date/2017-09-06T14:00:00.000Z/place/Moga
```

#### Objet renvoyé

```js
[
    {
        "_id":               "5863e3b6a09e5410e4f5e1b8",
        "creatorId":         "5698e3b6a09e5410e4f5e1b8", //_id du créateur
        "place":             "Moga",
        "date":              "2017-09-06T14:00:00.000Z",
        "level":             "debutant",
        "maxMissingPlayers": 3,
        "message":           "toto",
        "players":           []
        "__v":               0, // VersionKey: utilisé par le package npm mongoose
    },
    ...
]
```

### POST

Créé une nouvelle partie

#### Headers

<b>Content-Type (obligatoire)</b>: format du body de la requête
```js
Content-Type: application/json
```

#### Body
```js
{ 
    "creator":{
        "id":"5698e3b6a09e5410e4f5e1b8", //_id du créateur
        "name":"Madame michue"
    },
    "place":             "Moga",
    "date":              "2017-10-31T14:00:00.000Z",
    "level":             "debutant",
    "maxMissingPlayers": 3,
    "message":           "toto",
    "players":           []
}
```

### PUT

Met à jour les informations d'une partie: place, date, players, message.
Seul le créateur de la partie peut effectuer cette action.

#### Headers

<b>Content-Type (obligatoire)</b>: format du body de la requête
```js
Content-Type: application/json
```

#### Body
```js
{
    "_id":               "58644c88bad24c1d049077d3",
    "creatorId":         "5863df6204f27231c4348849",
    "place":             "Moga",
    "date":              "2017-10-31T14:00:00.000Z",
    "level":             "debutant",
    "maxMissingPlayers": 3,
    "message":           "titi",
    "players":           []
}
```

### DELETE /games/id/:id

Supprime une partie à partir de son _id. 
Seul le créateur de la partie peut effectuer cette action.

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