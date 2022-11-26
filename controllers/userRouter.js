const express = require("express");
const userRouter = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const usersQuery = require("../database/usersQuery");
const validateUser = require("../middlewares/validateUser");

const { SECRET } = require("../config");

// route to get user by id
userRouter.get("/getUser/:id", async (req, res, next) => {
  try {
    const user = await usersQuery.findUserById(req.params.id);
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
});

// route to create user
// first validate username and password by middleware
userRouter.post("/createUser", validateUser, async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // save user to database
    const insertId = await usersQuery.createUser(username, passwordHash);

    // return created user
    const createdUser = await usersQuery.findUserById(insertId);
    return res.status(201).send(createdUser);
  } catch (err) {
    return next(err);
  }
});

// login router
userRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // check for wrong username
    const user = await usersQuery.findUserByUsername(username);
    if (!user) return res.status(401).send("Wrong username");

    // check for wrong password
    const passwordCorrect = await bcrypt.compare(password, user.password_hash);
    if (!passwordCorrect) return res.status(401).send("Wrong password");

    // sign a token and save it to a cookie
    const token = jwt.sign({ user_id: user.user_id }, SECRET);
    const userInfo = {
      username: user.username,
      user_id: user.user_id,
      token,
    };
    return res
      .status(200)
      .cookie("user", JSON.stringify(userInfo), { httpOnly: true })
      .end();
  } catch (err) {
    return next(err);
  }
});

module.exports = userRouter;
