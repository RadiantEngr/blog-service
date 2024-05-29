import express from "express";
import basicAuth from "../middlewares/BasicAuth";

const router = express.Router();

import BlogPostController from "../controllers/BlogPostController";

router.post("/posts", basicAuth, BlogPostController.createPost);
router.get("/posts", basicAuth, BlogPostController.getAllPosts);
router.get("/posts/:postId", basicAuth, BlogPostController.getPostById);
router.put("/posts/:postId", basicAuth, BlogPostController.updatePost);
router.delete("/posts/:postId", basicAuth, BlogPostController.deletePost);

export default router;
