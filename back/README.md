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
````

## /logout (GET)

Supprime l'utilisateur de la session. 
Ne le d�connecte pas de Facebook.


## Status Codes
_200: OK_

L'appel s'est d�roul� correctement.

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