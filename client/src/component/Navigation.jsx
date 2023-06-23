import { Link, Outlet, useNavigate } from "react-router-dom"
import { Footer } from "./Footer"
import { useCookies } from "react-cookie"
import axios from "axios"
import { useEffect, useState } from "react"

export const Navigation = (props) => {
  const [isLog, setIsLog] = useState(false)
  const [cookies] = useCookies(["connect.sid"])

  const navigate = useNavigate()
  const isAuth = localStorage.getItem("auth")

  useEffect(() => {
    setIsLog(isAuth)
  }, [isLog, isAuth])

  const handleLougout = async () => {
    const { data } = await axios.get("http://localhost:3001/logout")
    setIsLog(false)
    localStorage.removeItem("auth")
    localStorage.removeItem("userID")
    navigate(0)
  }

  return (
    <div>
      <nav>
        <ul className="navbar">
          {!isLog ? (
            <>
              <Link to="/connection/login">
                <li>Connection</li>
              </Link>
              <Link to="/connection/register">
                <li>Enregistrement</li>
              </Link>
            </>
          ) : (
            <li>
              <button onClick={handleLougout}> Logout </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}
