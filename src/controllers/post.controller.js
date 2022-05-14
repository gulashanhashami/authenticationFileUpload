const express = require("express");

const Post = require("../models/post.model");

const uploadUserpost = require("../middlewares/upload");

const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.post(
  "/userpost",
  authenticate,
  uploadUserpost("body"),
  async (req, res) => {
    try {
      const post = await Post.create({
        title: req.body.title,
        user_id: req.body.user_id,
        body: req.file.path, 
      });
      console.log(post)
      return res.send({ post });
    } catch (err) {
      return res.status(500).send(err); 
    }
  }
);
//code, if user is authenticated only 
//then he should able to check all post.
router.get("/userpost", async (req, res) => {
  try {
    const posts = await Post.find().populate({path:"user_id", select: {name:1, email:1}}).lean().exec();
    //console.log(posts)
    return res.send(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
});


module.exports = router;
