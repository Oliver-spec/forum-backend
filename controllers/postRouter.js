const express = require("express");
const postRouter = express.Router();

const postsQuery = require("../database/postsQuery");
const validateToken = require("../middlewares/validateToken");

// get one post by post_id
postRouter.get("/getPost/:id", async (req, res, next) => {
  try {
    const post_id = req.params.id;
    const postFound = await postsQuery.findPostById(post_id);

    return res.status(200).send(postFound);
  } catch (err) {
    return next(err);
  }
});

// get all posts
postRouter.get("/getAllPosts", async (req, res, next) => {
  try {
    const postsFound = await postsQuery.findAllPosts();

    return res.status(200).send(postsFound);
  } catch (err) {
    return next(err);
  }
});

// create post
postRouter.post("/createPost", validateToken, async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const insertId = await postsQuery.createPost(req.user_id, title, body);
    const postCreated = await postsQuery.findPostById(insertId);

    return res.status(201).send(postCreated);
  } catch (err) {
    return next(err);
  }
});

module.exports = postRouter;
