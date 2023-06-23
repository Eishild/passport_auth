import React, { useEffect, useState } from "react"
import axios from "axios"
import { useLoaderData, useNavigate } from "react-router-dom"
import { Navigation } from "../component/Navigation"

const AllPosts = () => {
  const [isEdditing, setIsEdditing] = useState()
  const [isEddited, setIsEddited] = useState(false)
  const [allPost, setAllPost] = useState(useLoaderData())
  const [userSelected, setUserSelected] = useState()

  const userID = localStorage.getItem("userID")
  const navigate = useNavigate()
  useEffect(() => {
    const data = async () => {
      const newData = await axios.get("http://localhost:3001/blogpost/allPosts")
      setAllPost(newData.data)
      return
    }
    data()
  }, [isEddited])

  const handleComment = async (postId) => {
    const res = await axios.post(
      `http://localhost:3001/comment/update/${postId}`,
      {
        content: isEdditing.content,
        userID: userID,
      }
    )
    setIsEddited(true)
    setIsEdditing(null)
  }

  return (
    <div>
      <Navigation />
      <div className="home">
        {allPost.map((post) => (
          <div className="containPost" key={post._id}>
            <div key={post._id} className="post">
              <div>
                <p onClick={() => navigate(`/${post.User._id}`)}>
                  {post.User.username}
                </p>
                <p className="post-title">{post.title}</p>
              </div>
            </div>
            <p className="commentTitle">Comments</p>
            {post.Comments && post.Comments.length !== 0 ? (
              <div className="postComment">
                {post.Comments.map((comment) => (
                  <div key={comment._id} className="commentContainer">
                    <div className="commentUsername">
                      <span onClick={() => navigate(`/${comment.User._id}`)}>
                        {comment.User.username}
                      </span>{" "}
                      {userID === comment.User._id && (
                        <button
                          onClick={() => {
                            setIsEdditing({
                              id: comment._id,
                              content: comment.content,
                            })
                            setIsEddited(false)
                          }}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    {isEdditing?.id === comment._id ? (
                      <div>
                        <input
                          value={isEdditing.content}
                          onChange={(e) =>
                            setIsEdditing((edit) => ({
                              ...edit,
                              content: e.target.value,
                            }))
                          }
                        />
                        <button onClick={() => handleComment(comment._id)}>
                          save
                        </button>
                      </div>
                    ) : (
                      <p className="commentContent">{comment.content}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="commentContent">No comment for this post</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export const getAllPost = async () => {
  const allPost = await axios.get("http://localhost:3001/blogpost/allPosts")
  return allPost.data
}

export default AllPosts
