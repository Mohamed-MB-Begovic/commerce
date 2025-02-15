import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

 
function App() {
  return (
    <div className="w-full">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
