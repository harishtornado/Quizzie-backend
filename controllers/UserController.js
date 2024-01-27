import User from "../models/UserModal.js";
import bcrypt from "bcrypt";

export const fetchUser = async (req, res) => {
  try {
    const Users = await User.find();
    if (Users) {
      res
        .status(200)
        .json({ message: "users fetched", data: Users, status: "ok" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "error fetching user", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = await req.body;
  try {
    const user = await User.findOne({ email: email });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (user) {
      if (passwordMatch) {
        return res
          .status(200)
          .json({ message: "User found", data: user, status: "ok" });
      } else {
        return res.status(401).json({
          message: "Password Incorrect",
          data: null,
          status: "failed",
        });
      }
    }
    return res
      .status(404)
      .json({ message: "No such User", data: null, status: "failed" });
  } catch (err) {
    res.status(500).json({
      message: "Error Logging in",
      error: err.message,
      status: "failed",
    });
  }
};

export const newUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
      status: "ok",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
      status: "failed",
    });
  }
};
