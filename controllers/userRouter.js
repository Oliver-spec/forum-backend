const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

const usersQuery = require("../database/usersQuery");
const validateUser = require("../middlewares/validateUser");

// route to get user by id
userRouter.get("/getUser/:id", async (req, res, next) => {
  try {
    const userFound = await usersQuery.findUserById(req.params.id);
    return res.status(200).send(userFound);
  } catch (err) {
    return next(err);
  }
});

// route to create user
userRouter.post("/createUser", validateUser, async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const insertId = await usersQuery.createUser(username, passwordHash);

    // return created user
    const createdUser = await usersQuery.findUserById(insertId);

    return res.status(201).send(createdUser);
  } catch (err) {
    return next(err);
  }
});

module.exports = userRouter;
