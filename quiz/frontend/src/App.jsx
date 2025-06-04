import Navbar from "./NavBar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login"; // Your Login page
import Footer from "./footer";
import HomePage from "./HomePage";
import Register from "./Register";
import About from "./About";
import Contact from "./Contact";
import JoinQuiz from "./JoinQuiz";
import CreateQuiz from "./CreateQuiz";

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/about" element={<About/>}/>
     <Route path="/contact" element={<Contact/>}/>
     <Route path="/join-quiz" element={<JoinQuiz/>}/>
     <Route path="/create-quiz" element={<CreateQuiz/>}/>


      </Routes>
      <Footer/>
    </Router>

  )

}

export default App