import { MongoClient } from "mongodb";
// Connection URL
const username = "api_user"; //move to env on prod
const pass = "xGDeobpcSsFlfcoj"; //move to env on prod
const url = `mongodb+srv://${username}:${pass}@cluster0.kuo5qqj.mongodb.net/?retryWrites=true&w=majority`;
// Database Name
const dbName = "events";

export async function connectDatabase() {
  const client = await new MongoClient(url).connect();

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db(dbName);
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, filter, sort) {
  const db = client.db(dbName);
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
  return documents;
}
