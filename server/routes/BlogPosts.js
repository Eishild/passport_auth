import express from "express"
import {
  createPost,
  getAllPosts,
  postById,
  updatePost,
} from "../controllers/blogPosts.js"

const router = express.Router()

router.get("/allPosts", getAllPosts)
router.get("/post", postById)
router.post("/createPost", createPost)
router.post("/update/:id", updatePost)

export default router
