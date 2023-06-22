import { Schema, model } from "mongoose"

const usersSchema = Schema({
  username: String,
  email: String,
  password: String,
  BlogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "BlogPosts",
    },
  ],
})

const Users = model("Users", usersSchema)

export default Users
