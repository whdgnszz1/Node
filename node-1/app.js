import express from "express";
import mongoose from "mongoose";
// import { MongoClient } from "mongodb";
import { config } from "dotenv";
import postSchema from "./utils/schemas/post.schema.js";


config()
const port = process.env.PORT
const app = express();
// const client = new MongoClient(process.env.MONGODB_URI);
// let db = client.db("node2");

mongoose.connect(process.env.MONGODB_URI);

app.use(express.json())


// POST: 새로운 post 생성
app.post("/posts", async (req, res) => {
  try {
    const post = new postSchema(req.body);
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    console.error("Error occurred:", error); 
    res.status(400).send(error);
  }
});

// GET: 모든 posts 가져오기
app.get("/posts", async (req, res) => {
  try {
    const posts = await postSchema.find();
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET: 특정 post 가져오기
app.get("/posts/:postId", async (req, res) => {
  try {
    const post = await postSchema.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

// PUT: 특정 post 수정
app.put("/posts/:postId", async (req, res) => {
  try {
    const updatedPost = await postSchema.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE: 특정 post 삭제
app.delete("/posts/:postId", async (req, res) => {
  try {
    const deletedPost = await postSchema.findByIdAndDelete(req.params.postId);
    res.json(deletedPost);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
