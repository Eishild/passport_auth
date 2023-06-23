import { Schema, model } from "mongoose"

const CommentsSchema = Schema({
  content: String,
  User: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
})

const Comments = model("Comments", CommentsSchema)

export default Comments
