const Joi = require("joi");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

function validateSignin(data) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).max(255).required(),
    password: Joi.string().min(6).max(100).required(),
  });
  return schema.validate(data);
}

async function authenticateUser(clear, hashed) {
  return await bcryptjs.compare(clear, hashed);
}

exports.signin = async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const isValid = await authenticateUser(req.body.password, user.password);
    if (!isValid) return res.status(400).send("Invalid email or password");

    const { password, ...rest } = user._doc;
    res.status(200).cookie("auth_token", user.generateAuthToken()).send(rest);
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(500).send("Something went wrong. Please try again later.");
  }
};
