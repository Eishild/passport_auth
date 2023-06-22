import BlogPosts from "../models/BlogPosts.js"
import Users from "../models/User.js"

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await BlogPosts.find({})
    const posts = allPosts.map((post) => post._id)
    const users = await Users.find({
      BlogPosts: {
        $in: posts,
      },
    })
    res.send(allPosts)
  } catch (error) {
    res.send(error)
  }
}

export const postById = async (req, res) => {
  const { userID } = req.body
  try {
    const posts = await Users.findById(userID).populate("BlogPosts").exec()
    res.send(posts)
  } catch (error) {
    res.send(error)
  }
}

export const createPost = async (req, res) => {
  const { title, content, userID } = req.body
  try {
    const foundUser = Users.findById(userID)
    if (!foundUser) {
      res.send("User not found")
    }

    const newBlogPost = new BlogPosts({ title, content })

    await Users.findByIdAndUpdate(userID, {
      $push: {
        BlogPosts: [newBlogPost._id],
      },
    })
    await newBlogPost.save()

    res.send(newBlogPost)
  } catch (error) {
    res.send(error)
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body
  console.log(title)
  try {
    const updatePost = await BlogPosts.findByIdAndUpdate(
      id,
      { title, content },
      {
        new: true,
      }
    )
    res.send(updatePost)
  } catch (error) {
    res.send(error)
  }
}
