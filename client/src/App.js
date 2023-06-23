import "./App.css"
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom"
import { Footer } from "./component/Footer"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Navigation } from "./component/Navigation"
import AllPosts, { getAllPost } from "./pages/AllPosts"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigation />}>
          <Route index element={<AllPosts />} loader={getAllPost} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        {/* <Footer /> */}
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
