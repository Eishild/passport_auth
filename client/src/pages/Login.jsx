import { Form, Link, redirect, useNavigate } from "react-router-dom"
import axios from "axios"

export const Login = () => {
  const handleLoginFacebook = async () => {
    window.location = "http://localhost:3001/login/facebook"
  }

  return (
    <>
      <div className="login-container">
        <h1>Se connecter</h1>
        <Form className="form-login" method="POST" action="/connection/login">
          <input
            type="email"
            placeholder="Adresse e-mail"
            name="email"
            id="email"
            required
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            required
            autoComplete="off"
          />
          <div>
            <button className="button" type="submit">
              Se connecter
            </button>
          </div>
        </Form>
        <div className="container-signin">
          <p>
            Vous n'êtes pas enregistré ?{" "}
            <Link to={"/connection/register"}>Enregistrez vous!</Link>.
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

export const loginAction = async ({ request }) => {
  const formData = await request.formData()
  const loginForm = {
    username: formData.get("email"),
    password: formData.get("password"),
  }
  try {
    const { data } = await axios.post("http://localhost:3001/login", loginForm)

    localStorage.setItem("auth", data.success)
    localStorage.setItem("userID", data.userID)
    return redirect("/")
  } catch ({ response }) {
    return { error: response.data }
  }
}
