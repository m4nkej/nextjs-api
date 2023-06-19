import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function hander(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Connecting to DB failed!" });
    return;
  }

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
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
      date: new Date().toISOString(),
    };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result._id;
      res.status(201).json({ message: "Added", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comments failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "comments",
        { eventId: eventId },
        { _id: -1 }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
    }
  }

  client.close();
}

export default hander;
