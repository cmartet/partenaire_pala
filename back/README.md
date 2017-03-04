API CRUD du site WEB Partenaire Pala

# Les m�thodes

## /ping (GET)

Permet de v�rifier si le service est en ligne en retournant "ok" et un status 200

## /auth/facebook (GET)

Authentifie l'utilisateur via Facebook.
Si l'utilisateur n'est pas connect� � Facebook, redirige vers la page d'authentification Facebook.

#### Objet renvoy�

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
Ne le d�connecte pas de Facebook.

## /games
### GET /date/\<date>/place/\<place>

R�cup�re les parties en filtrant sur la date et/ou le lieu. Les filtres sont optionnels.

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

#### Objet renvoy�

```js
[
    {
        "_id":               "5863e3b6a09e5410e4f5e1b8",
        "creatorId":         "5698e3b6a09e5410e4f5e1b8", //_id du cr�ateur
        "place":             "Moga",
        "date":              "2017-09-06T14:00:00.000Z",
        "level":             "debutant",
        "maxMissingPlayers": 3,
        "message":           "toto",
        "players":           []
        "__v":               0, // VersionKey: utilis� par le package npm mongoose
    },
    ...
]
```

### POST

Cr�� une nouvelle partie

#### Headers

<b>Content-Type (obligatoire)</b>: format du body de la requ�te
```js
Content-Type: application/json
```

#### Body
```js
{ 
    "creator":{
        "id":"5698e3b6a09e5410e4f5e1b8", //_id du cr�ateur
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

Met � jour les informations d'une partie: place, date, players, message.
Seul le cr�ateur de la partie peut effectuer cette action.

#### Headers

<b>Content-Type (obligatoire)</b>: format du body de la requ�te
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

Supprime une partie � partir de son _id. 
Seul le cr�ateur de la partie peut effectuer cette action.

## /places
### GET /places/search/\<search>

R�cup�re les frontons en filtrant sur une chaine de caract�res. 

Le nombre de frontons renvoy�s est limit� � 25.

#### Objet renvoy�

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

R�cup�re les frontons en filtrant une g�olocalisation pr�cise (latitude, longitude et rayon de recherche).

Le nombre de frontons renvoy�s est limit� � 25.

#### Objet renvoy�

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

le service se lance sur le port 8090 par d�faut
```cmd
> node server.js 
```

lance le service en sp�cifiant un port
```cmd
> node server.js --port=12345
```    