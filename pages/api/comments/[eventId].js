import { MongoClient } from "mongodb";
async function hander(req, res) {
  const eventId = req.query.eventId;
  // Connection URL
  const url =
    "mongodb+srv://api_user:xGDeobpcSsFlfcoj@cluster0.kuo5qqj.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url);

  // Database Name
  const dbName = "events";

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === "" ||
      !email ||
      !email.includes("@")
    ) {
      console.log(email, name, text);
      res.status(422).json({ message: "Invalid data." });
      return;
    }
    const newComment = { email, name, text, eventId };

    try {
      await client.connect();
      const db = client.db(dbName);
      const result = await db.collection("comments").insertOne(newComment);
      newComment.id = result.insertedId;
      res.status(201).json({ message: "Added", comment: newComment });
    } finally {
      await client.close();
    }
  }
  if (req.method === "GET") {
    try {
      await client.connect();
      const db = client.db(dbName);
      const documents = await db
        .collection("comments")
        .find()
        .sort({ _id: -1 })
        .toArray();

      res.status(200).json({ comments: documents });
    } finally {
      await client.close();
    }
  }
}

export default hander;
