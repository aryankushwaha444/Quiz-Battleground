import Navbar from "./Navbar";
import Footer from "./Footer.jsx";
import HomePage from "./HomePage.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import JoinQuiz from "./JoinQuiz.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";
import PrivateRoute from "./PrivateRoute.jsx";
import UserLeaderboard from "./UserLeaderboard.jsx";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* ✅ Provide authentication context */}
      <Router>
        <Navbar /> {/* ✅ Navbar will now respond to login status */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute>
                <UserLeaderboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/join-quiz"
            element={
              // Protect Route
              <PrivateRoute>
                <JoinQuiz />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
