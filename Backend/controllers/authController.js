const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 7);

    const newUser = new User({
      username: username,
      password: hashedPassword,
      email: email,
      phone: phone,
    });
    await newUser.save();
    res
      .status(200)
      .json({ message: `User registered with username ${username}` });
  } catch (err) {
    res.status(500).json({ message: `Failed to registered` });
  }
};

const login = async (req,res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ message: `User with username ${username} not found` });
    }

    isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: `Invalid Crendentials` });
    }

    const token = await jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({token : token})

  } catch (err) {
    res.status(500).json({ message: `Something went wrong` });
  }
};

module.exports = { register, login };
