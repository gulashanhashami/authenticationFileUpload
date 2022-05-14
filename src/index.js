const express = require("express");
const { register, login } = require("./controllers/auth.controller");
const postController = require("./controllers/post.controller");

const app = express();
app.use(express.json());
app.post("/register", register);
app.post("/login", login);
app.use("/posts", postController);  
module.exports = app;
