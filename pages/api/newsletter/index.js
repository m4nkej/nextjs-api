import { connectDatabase, insertDocument } from "../../../helpers/db-util";

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
      const documents = await insertDocument(client, "newsletter", {
        email: emailUser,
      });
      await client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }
    res.status(201).json({ message: `Email ${emailUser} added` });
  }
}
