import React from "react"
import { Outlet } from "react-router-dom"
import { Navigation } from "../component/Navigation"

const Connection = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  )
}

export default Connection
