import Navbar from "./Navbar";
import Footer from "./footer";
import HomePage from "./HomePage";
import Login from "./Login";
import Register from "./Register";
import About from "./About";
import Contact from "./Contact";
import JoinQuiz from "./JoinQuiz";
import CreateQuiz from "./CreateQuiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext"; // ✅ Import AuthProvider
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider> {/* ✅ Provide authentication context */}
      <Router>
        <Navbar /> {/* ✅ Navbar will now respond to login status */}
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/join-quiz" element={     // Protect Route
            <PrivateRoute>
              <JoinQuiz/>
            </PrivateRoute>
          }>
          </Route>

        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
