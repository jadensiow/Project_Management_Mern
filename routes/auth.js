const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth_Middleware");
const jwt = require("jsonwebtoken");
const { check } = require("express-validator");
require("dotenv").config();

const User = require("../models/User");

// Get authorized user

// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
router.get("/", auth, async (req, res) => {
  try {
    // get everything except password
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
  }
});

// Authenticate user & get token
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    // https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/

    const { email, password } = req.body;

    try {
      // See if email exists from the database
      let user = await User.find((e) => {
        return e.email === email;
      });

      if (!user) {
        return res.status(404).json({
          errors: [{ msg: "Email not registered" }],
        });
      }

      // Check for email and password match
      const matchPwEmail = await bcrypt.compare(password, user.password);
      if (!matchPwEmail) {
        return res.status(404).json({
          errors: [{ msg: "Incorrect password" }],
        });
      }

      // Generating access token
      jwt.sign(
        {
          user: {
            id: user.id,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: "20m" },
        (err, token) => {
          if (err) throw err;

          // Generate new access token based on refresh
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
