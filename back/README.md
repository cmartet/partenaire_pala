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
    "creatorId":         "5698e3b6a09e5410e4f5e1b8", //_id du créateur
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

## /users
### GET /users/id/:id

Récupère les informations d'un utilisateur en fonction de son id

#### Objet renvoyé

```js
{
    "_id":    "5863e3b6a09e5410e4f5e1b8",
    "token" : "dd458dsfsdfs",
    "email" : "partenairepala@aol.fr",
    "name":   "Partenaire Pala",
    "__v":    0,
}
```

## /places
### GET /places

Récupère les informations des lieux

#### Objet renvoyé

```js
{
    "_id":      "5863e3b6a09e5410e4f5e1b8",
    "name" :    "Maïtena",
    "city" :    "Villenave d'Ornon",
    "adress":   "Rue des tilleuls",
    "type":     3, //1: place libre, 2: mur à gauche, 3: trinquet
    "photoUrl": "maitena.png",
    "__v":      0,
}
```

### GET /places/search/\<search\>

Récupère les lieux en filtrant sur une chaine de caractères.

Les champs pris en compte sont: name, city et adress.

### POST

Créé un nouveau lieu

#### Headers

<b>Content-Type (obligatoire)</b>: format du body de la requête
```js
Content-Type: application/json
```

#### Body
```js
{ 
    "name" :    "Maïtena",
    "city" :    "Villenave d'Ornon",
    "adress":   "Rue des tilleuls",
    "type":     3, //1: place libre, 2: mur à gauche, 3: trinquet
    "photoUrl": "maitena.png",
}
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