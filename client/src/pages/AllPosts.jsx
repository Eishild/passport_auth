import React from "react"
import axios from "axios"
import { useLoaderData } from "react-router-dom"

const AllPosts = () => {
  const allPost = useLoaderData()
  console.log(allPost)
  return (
    <div className="home">
      {allPost.map((post) => (
        <div key={post._id} className="post">
          {post.title}
        </div>
      ))}
    </div>
  )
}

export const getAllPost = async () => {
  const allPost = await axios.get("http://localhost:3001/blogpost/allPosts")

  return allPost.data
}

export default AllPosts
