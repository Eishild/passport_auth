import { Schema, model } from "mongoose"

const userSchema = Schema({
  username: String,
  email: String,
  password: String,
})

const User = model("User", userSchema)

export default User
