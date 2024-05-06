import { useState } from 'react'
import { Outlet } from "react-router-dom"
import Header from "./Header"

function Layout() {

  return (
    <div className="site-wrapper">
        <Header />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout
