function hander(req, res) {
  const eventId = req.query.eventId;
  if (req.method === "POST") {
    const { email, user, comment } = req.body;
    if (
      !user ||
      user.trim() === "" ||
      !comment ||
      comment.trim() === "" ||
      !email ||
      !email.includes("@")
    ) {
      res.status(422).json({ message: "Invalid data." });
      return;
    }
    const newComment = { id: new Date.toISOString(), email, user, comment };
    console.log(email, user, comment);
    res.status(201).json({ message: "Added", comment: newComment });
  }
  if (req.method === "GET") {
  }
}

export default hander;
