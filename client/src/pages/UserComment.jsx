import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Navigation } from "../component/Navigation"

const UserComment = () => {
  const { id } = useParams()
  const [data, setData] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`http://localhost:3001/comment/user/${id}`)
      setData(res.data)
    }
    fetch()
  }, [id])

  return (
    <div>
      <Navigation />
      <div className="commentPage">
        {data.map((comment) => (
          <div key={comment._id} className="commentContainer">
            <div className="commentUsername">
              <span>{comment.User.username}</span>
            </div>

            <p className="commentContent">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserComment
