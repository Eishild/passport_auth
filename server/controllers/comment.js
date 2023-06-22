import BlogPosts from "../models/BlogPosts.js"
import Comments from "../models/Comments.js"

export const createComment = async (req, res) => {
  const { content, userID } = req.body
  const { id } = req.params
  try {
    console.log(content, userID)
    const foudPost = await BlogPosts.findById(id)

    if (!foudPost) return res.send("post not found")

    const newComment = new Comments({ content, User: userID })
    await BlogPosts.findByIdAndUpdate(id, {
      $push: {
        Comments: newComment._id,
      },
    })

    newComment.save()
    res.send(newComment)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const commentByUser = async (req, res) => {
  try {
    const { userID } = req.body

    const comments = await Comments.find({
      User: userID,
    })

    if (comments.length === 0)
      return res.send("No comments found for this user")

    res.send(comments)
  } catch (error) {
    res.send(error)
  }
}

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params
    const { userID, content } = req.body

    const comment = await Comments.findById(id)

    if (String(comment.User) !== userID) {
      return res.status(401).send("Unauthorized")
    }
    await Comments.findByIdAndUpdate(id, { content })

    res.send(comment)
  } catch (error) {}
}
