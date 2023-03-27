import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });
    await newUser.save();
    res.status(200).json({ success: true, message: "Successful created" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create" });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });

    //if user doesn't exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    //if user already exists then check the password
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //if password is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }
    const { password, role, ...rest } = user._doc; //remove password , role to user

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({ success: true, message: "Successful login",token ,role , data: { ...rest } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to login" });
  }
};
