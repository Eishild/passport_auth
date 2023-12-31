import { Schema, model } from "mongoose"

const BlogPostsSchema = Schema({
  title: String,
  content: String,
  User: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  Comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
})

const BlogPosts = model("BlogPosts", BlogPostsSchema)

export default BlogPosts
