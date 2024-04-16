# TP Réplication sous MongoDB

## Etapes préalables au lancement

Lancer les différents services (réplicats)

```bash
docker-compose up -d
```

Se connecter au premier noeud

```bash
docker exec -it tp-replica-set-nosql-mongo1-1 mongosh --port 27017
```

Vérifier l'état du replicaset

```bash
rs.status();
```

## Lancement

Installer les dépendances

```bash
npm install
```

Lancer le script

```bash
node index.js
```

## Equivalents CLI MongoDB

Ici sont détaillés les équivalents CLI aux actions effectuées par le script javascript.

Insérer plusieurs utilisateurs :

```bash
db.users.insertMany([
    {
        name: "Alice Martin",
        age: 31,
        email: "alice.martin@example.com",
        createdAt: new Date()
    },
    {
        name: "Bob Lemoine",
        age: 27,
        email: "bob.lemoine@example.com",
        createdAt: new Date()
    }
]);
```

Insérer un utilisateur :

```bash
db.users.insert({
    name: "Alice Martin",
    age: 31,
    email: "alice.martin@example.com",
    createdAt: new Date()
});
```

Récupérer les utilisateurs âgés de plus de 30 ans :

```bash
db.users.find({ age: { $gt: 30 } })
```

Incrémenter l'âge de tous les utilisateurs de 5 ans :

```bash
db.users.updateMany(
    {},
    { $inc: { age: 5 } }
)
```

Supprimer tous les utilisateurs de moins de 18 ans :

```bash
db.users.deleteMany({ age: { $lt: 18 } })
```

## Difficultés rencontrées

J'ai initialement essayé de mettre en place un réseau pour mes différents conteneurs Docker, ce qui m'a valu plusieurs heures de débogage (tentative de conteneuriser également le script nodejs afin de l'ajouter au réseau ect...) pour finalement me rendre compte que ce n'était pas nécessaire.
