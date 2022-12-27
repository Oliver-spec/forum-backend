const express = require("express");
const commentRouter = express.Router();

const commentsQuery = require("../database/commentsQuery");
const validateToken = require("../middlewares/validateToken");

// find comments belonging to a post
commentRouter.get("/findComments/:id", async (req, res, next) => {
  try {
    const post_id = req.params.id;
    const commentsFound = await commentsQuery.findCommentsByPostId(post_id);

    return res.status(200).send(commentsFound);
  } catch (err) {
    return next(err);
  }
});

// post comment
commentRouter.post("/postComment", validateToken, async (req, res, next) => {
  try {
    const { post_id, body } = req.body;
    const updateInfo = await commentsQuery.makeComment(
      req.user_id,
      post_id,
      body
    );

    return res.status(201).send(updateInfo);
  } catch (err) {
    return next(err);
  }
});

module.exports = commentRouter;
