import { MongoClient } from "mongodb";

async function connectDatabase() {
  // Connection URL
  const url =
    "mongodb+srv://api_user:xGDeobpcSsFlfcoj@cluster0.kuo5qqj.mongodb.net/?retryWrites=true&w=majority";
  const client = await new MongoClient(url).connect();

  return client;
}

async function insertDocument(client, document) {
  // Database Name
  const dbName = "events";

  const db = client.db(dbName);
  await db.collection("newsletter").insertOne(document);
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const emailUser = req.body.email;

    if (!emailUser || !emailUser.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Connecting to DB failed!" });
      return;
    }
    try {
      const documents = await insertDocument(client, { email: emailUser });
      await client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }
    res.status(201).json({ message: `Email ${emailUser} added` });
  }
}
