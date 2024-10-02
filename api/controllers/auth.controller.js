import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// signup route------------------------------------------------------------------------------------------------
export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;
  if (!email || !username || !password || username === "" || email === "") {
    next(errorHandler(400, "All fields are required"));
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
    next(error);
  }
};

// signin route----------------------------------------------------------------------------------------------
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(401, "User not found "));
    }
    const isPasswordValid = bcryptjs.compareSync(password, validUser.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid Password"));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })

      .json(rest);
  } catch (error) {
    next(error);
  }
};

// google sign in
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    // Check if the user already exists
    const user = await User.findOne({ email });

    if (user) {
      // If the user exists, generate a JWT token and send it back
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      // Generate a random password for the new user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      // Create a new user
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        password: hashedPassword,
        email,
        profilePicture: googlePhotoUrl,
      });

      // Save the new user to the database
      await newUser.save();

      // Generate a JWT token for the new user and send it back
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(201)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
