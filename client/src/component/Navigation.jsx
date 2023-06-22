import { Link, Outlet } from "react-router-dom"
import { useCookies } from "react-cookie"

export const Navigation = (props) => {
  //   const [cookies] = useCookies(["simple"])
  return (
    <div>
      <nav>
        <ul className="navbar">
          <Link to="login">
            <li>Connection</li>
          </Link>
          <Link to="register">
            {" "}
            <li>Enregistrement</li>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
