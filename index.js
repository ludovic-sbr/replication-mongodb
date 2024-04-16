import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker";

const uri = "mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/?replicaSet=rs0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    console.log("Connexion au serveur mongodb...");
    await client.connect();

    const db = client.db("test");
    const collection = db.collection("users");

    console.log("[1] - Insertion des données de base...");
    const userData = [];
    for (let i = 0; i < 100; i++) {
      userData.push({
        name: faker.internet.userName(),
        age: faker.number.int({ min: 1, max: 99 }),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
      });
    }

    const insertManyUsersResult = await collection.insertMany(userData);
    console.log(`[1] - ${insertManyUsersResult.insertedCount} nouveau(x) document(s) créé(s).`);

    console.log("[2] - Insertion d'un nouvel utilisateur en base de données...");
    const insertSingleUserResult = await collection.insertOne({
      name: faker.internet.userName(),
      age: faker.number.int({ min: 1, max: 99 }),
      email: faker.internet.email(),
      createdAt: faker.date.past(),
    });
    console.log(`[2] - ${insertSingleUserResult.insertedCount} nouveau(x) document(s) créé(s).`);

    console.log("[3] - Affichage de tous les utilisateurs de plus de 30 ans...");
    const usersOverThirty = await collection.find({ age: { $gt: 30 } }).toArray();
    console.log(`[3] - Utilisateurs de plus de 30 ans : `, usersOverThirty);

    console.log("[4] - Ajout de 5 ans à tous les utilisateurs...");
    const updateResult = await collection.updateMany({}, { $inc: { age: 5 } });
    console.log(`[4] - ${updateResult.modifiedCount} document(s) mis à jours.`);

    console.log("[5] - Suppression de tous les utilisateurs ayant moins de 18 ans...");
    const deleteResult = await collection.deleteMany({ age: { $lt: 18 } });
    console.log(`[5] - ${deleteResult.deletedCount} document(s) supprimés.`);

    console.log("Fin de l'exécution du script.");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
  } finally {
    client.close();
  }
}

run();
