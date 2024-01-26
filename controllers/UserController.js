import User from "../models/UserModal.js";

export const fetchUser = async (req, res) => {
  try {
    const Users = await User.find();
    res
      .status(200)
      .json({ message: "users fetched", data: Users, status: "ok" });
  } catch (err) {
    res
      .status(404)
      .json({ message: "error fetching user", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = await req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        return res
          .status(200)
          .json({ message: "User found", data: user, status: "ok" });
      } else {
        return res.status(404).json({
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
    res.status(404).json({
      message: "Error Logging in",
      error: err.message,
      status: "failed",
    });
  }
};

export const newUser = async (req, res) => {
  const user = await req.body;
  try {
    const newUser = new User({
      userName: user.userName,
      email: user.email,
      password: user.password,
    });

    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
      status: "ok",
    });
  } catch (err) {
    res.status(404).json({
      message: "Error Logging in",
      error: err.message,
      status: "failed",
    });
  }
};
