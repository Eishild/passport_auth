import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export const Login = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:3001/login", {
      username: email,
      password,
    })
    console.log(response.data)
    setEmail("")
    setPassword("")
    if (response.data.sucess) {
      navigate("/")
    }
  }

  const handleLoginFacebook = async () => {
    window.location = "http://localhost:3001/login/facebook"
  }

  return (
    <>
      <div className="login-container">
        <h1>Se connecter</h1>
        <form className="form-login" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Adresse e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            id="email"
            required
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="off"
          />
          <div>
            <button className="button">Se connecter</button>
          </div>
        </form>
        <div className="container-signin">
          <p>
            Vous n'êtes pas enregistré ?{" "}
            <Link to={"/register"}>Enregistrez vous!</Link>.
          </p>
        </div>
        <hr />
        <div className="container-login-facebook">
          <div className="center">Ou</div>
          <div className="center">
            Connectez vous avec
            <button className="logo-button" onClick={handleLoginFacebook}>
              {/* <Link to={"http://localhost:3001/login/facebook"}> */}
              <img
                className="logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/240px-Facebook_logo_%28square%29.png"
                alt="facebbok logo"
                width="25px"
                height="25px"
              />
              {/* </Link> */}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
