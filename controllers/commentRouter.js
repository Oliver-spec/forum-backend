const express = require("express");
const commentRouter = express.Router();

const commentsQuery = require("../database/commentsQuery");

// find comments belonging to a post
commentRouter.get("/findComments/:id", async (req, res, next) => {
  try {
    const post_id = req.params.id;
    const commentsFound = await commentsQuery.findCommentsByPostId(post_id);

    return res.status(200).send(commentsFound);
  } catch (err) {
    next(err);
  }
});

// post comment
commentRouter.post("/postComment", async (req, res, next) => {
  try {
    const { user_id, post_id, body } = req.body;
    const updateInfo = await commentsQuery.makeComment(user_id, post_id, body);

    return res.status(201).send(updateInfo);
  } catch (err) {
    next(err);
  }
});

module.exports = commentRouter;
