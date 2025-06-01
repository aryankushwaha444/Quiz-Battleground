import Navbar from "./NavBar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login"; // Your Login page
import Footer from "./footer";
import HomePage from "./HomePage";
import Register from "./Register";

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>


      </Routes>
      <Footer/>
    </Router>

  )

}

export default App