import React from "react"
import axios from "axios"
import { useLoaderData } from "react-router-dom"

const AllPosts = () => {
  const allPost = useLoaderData()
  console.log(allPost)
  return (
    <div className="home">
      {allPost.map((post) => (
        <div className="containPost">
          <div key={post._id} className="post">
            <div>
              <p>{post.User.username}</p>
              <p className="post-title">{post.title}</p>
            </div>
          </div>
          <p className="commentTitle">Comments</p>
          {post.Comments && post.Comments.length !== 0 ? (
            <div className="postComment">
              {post.Comments.map((comment) => (
                <div>
                  <p className="commentUsername">{comment.User.username}</p>
                  <p className="commentContent">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="commentContent">No comment for this post</p>
          )}
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
