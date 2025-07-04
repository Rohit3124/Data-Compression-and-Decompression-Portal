const Joi = require("joi");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

function validateSignup(data) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(100).required(),
  });
  return schema.validate(data);
}

async function hashPassword(password) {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
}

exports.signup = async (req, res) => {
  const { error } = validateSignup(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User signed up successfully", user: newUser });
  } catch (err) {
    res
      .status(500)
      .send("An unexpected error occurred. Please try again later.");
  }
};

exports.signout = async (req, res) => {
  try {
    res.clearCookie("auth_token").status(200).json("User has been signed out");
  } catch (error) {
    res.status(500).send("Something went wrong. Please try again later.");
  }
};
