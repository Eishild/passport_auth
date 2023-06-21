import "./App.css"
import { Route, Routes } from 'react-router-dom'
import { Footer } from "./component/Footer"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Navigation } from "./component/Navigation"

function App() {
  return (<>
    <Navigation />
    <nav>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
      </Routes>
      <Footer />
    </nav>
  </>
  )
}

export default App
