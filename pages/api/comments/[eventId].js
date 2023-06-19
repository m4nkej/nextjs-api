function hander(req, res) {
  const eventId = req.query.eventId;
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
    const newComment = { id: new Date().toISOString(), email, name, text };
    console.log(newComment);
    res.status(201).json({ message: "Added", text: newComment });
  }
  if (req.method === "GET") {
    const dummyData = [
      {
        id: "c1",
        name: "Max",
        text: "test text",
      },
      {
        id: "c2",
        name: "Max2",
        text: "test text",
      },
    ];
    res.status(200).json({ comments: dummyData });
  }
}

export default hander;
