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
        "id": "125197527977624",
        "name": "Pike Apps",
        "token": "EAARnnh5nes0BAA8ZCvQg"
    }
}
```

## /logout (GET)

Supprime l'utilisateur de la session. 
Ne le d�connecte pas de Facebook.

## /games
### GET

R�cup�re les parties dont la date est sup�rieure � la date du jour.

#### Objet renvoy�

```js
[
    {
        "_id":"5863e3b6a09e5410e4f5e1b8",
        "place":"Moga",
        "date":"2017-10-31T14:00:00.000Z",
        "level":"debutant",
        "nbMissingPlayers":3,
        "message":"toto",
        "__v":0, // VersionKey: utilis� par le package npm mongoose
        "players":[]
    },
    ...
]
```

### POST

Cr�� une nouvelle partie

#### Headers

<b>Content-Type (obligatoire)</b>: format du body de la requ�te
```js
Content-Type: "application/json"
```

#### Body
```js
{ 
    "place": "Moga",
    "date": "2017-10-31T14:00:00.000Z",
    "level": "debutant",
    "nbMissingPlayers": 3,
    "message": "toto"
}
```

### PUT

Met � jour les informations d'une partie: place, date, players, message.

#### Headers

<b>Content-Type (obligatoire)</b>: format du body de la requ�te
```js
Content-Type: "application/json"
```

#### Body
```js
{
    "_id":"58644c88bad24c1d049077d3",
    "creator":"titi pala",
    "place":"Moga",
    "date":"2017-10-31T14:00:00.000Z",
    "level":"debutant",
    "nbMissingPlayers":3,
    "message":"titi",
    "__v":0,
    "players":[]
}
```
## /games/id/:id
### DELETE

Supprime une partie � partir de son _id

# Lancement en local

Pour lancer le service :

le service se lance sur le port 8080 par d�faut
```cmd
> node server.js 
```

lance le service en sp�cifiant un port
```cmd
> node server.js --port=12345
```    