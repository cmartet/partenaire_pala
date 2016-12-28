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
        "id": "125197527977624",
        "name": "Pike Apps",
        "token": "EAARnnh5nes0BAA8ZCvQg"
    }
}
````

## /logout (GET)

Supprime l'utilisateur de la session. 
Ne le déconnecte pas de Facebook.


## Status Codes
_200: OK_

L'appel s'est déroulé correctement.

# Lancement en local

Pour lancer le service :

le service se lance sur le port 8080 par défaut
```cmd
> node server.js 
```

lance le service en spécifiant un port
```cmd
> node server.js --port=12345
```    