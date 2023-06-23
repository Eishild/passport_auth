import "./App.css"
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom"
import { Login, loginAction } from "./pages/Login"
import { Register, registerAction } from "./pages/Register"
import AllPosts, { getAllPost } from "./pages/AllPosts"

import Connection from "./pages/Connection"
import UserComment from "./pages/UserComment"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<AllPosts />} loader={getAllPost} />

        <Route path="/connection" element={<Connection />}>
          <Route
            path="register"
            element={<Register />}
            action={registerAction}
          />
          <Route path="login" element={<Login />} action={loginAction} />
        </Route>
        <Route path="/:id" element={<UserComment />} />
      </>
    )
  )
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
