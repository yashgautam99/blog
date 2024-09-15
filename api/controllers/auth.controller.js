import User from "../../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  const { username, password, email } = req.body;
  if (!email || !username || !username || username === "" || email === "") {
    return res.status(400).json({ message: "All fields are required." });
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
