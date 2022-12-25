const express = require("express");
const postRouter = express.Router();

const postsQuery = require("../database/postsQuery");

// get one post by post_id
postRouter.get("/getPost/:id", async (req, res, next) => {
  try {
    const post_id = req.params.id;
    const postFound = await postsQuery.findPostById(post_id);

    return res.status(200).send(postFound);
  } catch (err) {
    next(err);
  }
});

// get all posts
postRouter.get("/getAllPosts", async (req, res, next) => {
  try {
    const postsFound = await postsQuery.findAllPosts();

    return res.status(200).send(postsFound);
  } catch (err) {
    next(err);
  }
});

// create post
postRouter.post("/createPost", async (req, res, next) => {
  try {
    const { user_id, title, body } = req.body;
    const insertId = await postsQuery.createPost(user_id, title, body);
    const postCreated = await postsQuery.findPostById(insertId);

    return res.status(201).send(postCreated);
  } catch (err) {
    next(err);
  }
});

module.exports = postRouter;
