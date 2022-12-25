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

module.exports = commentRouter;
