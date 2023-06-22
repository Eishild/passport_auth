import express from "express"
import {
  commentByUser,
  createComment,
  updateComment,
} from "../controllers/comment.js"

const router = express.Router()

router.post("/create/:id", createComment)
router.post("/user", commentByUser)
router.post("/update/:id", updateComment)

export default router
