export default function handler(req, res) {
  if (req.method === "POST") {
    const emailUser = req.body.email;

    if (!emailUser || !emailUser.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    res.status(201).json({ message: `Email ${emailUser} added` });
  }
}
