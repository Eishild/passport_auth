import { Form, Link, redirect } from "react-router-dom"
import axios from "axios"

export const Register = () => {
  return (
    <>
      <div className="register-container">
        <h1>S'enregistrer</h1>
        <Form
          className="form-register"
          method="POST"
          action="/connection/register"
        >
          <input
            type="text"
            placeholder="User name"
            name="username"
            id="username"
            required
            autoComplete="off"
          />
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
              S'enregistrer
            </button>
          </div>
        </Form>
        <div className="container-signin">
          <p>
            Vous êtes déja enregistré ?{" "}
            <Link to={"/connection/login"}>Connectez vous!</Link>.
          </p>
        </div>
      </div>
    </>
  )
}

export const registerAction = async ({ request }) => {
  const formData = await request.formData()

  const registerForm = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  }
  try {
    const { data } = await axios.post(
      "http://localhost:3001/register",
      registerForm
    )

    return redirect("/connection/login")
  } catch ({ response }) {
    return { error: response.data }
  }
}
