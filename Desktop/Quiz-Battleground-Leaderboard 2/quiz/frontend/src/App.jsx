import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer.jsx";
import HomePage from "./HomePage.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import JoinQuiz from "./JoinQuiz.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";
import PrivateRoute from "./PrivateRoute.jsx";
import UserLeaderboard from "./UserLeaderboard.jsx";
import QuizPage from "./QuizPage.jsx";
import Malware from "./Malware.jsx";
import DevOps from "./DevOps.jsx";
import EventLobby from "./EventLobby.jsx";
import Offensive from "./Offensive.jsx";
import Defesive from "./Defensive.jsx";
import ReverseEngineer from "./ReverseEngineer.jsx";
import EventQuiz from "./EventQuiz.jsx";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/*  Provide authentication context */}
      <Router>
        <QuizNavigationGuard />
        <Navbar /> {/*  Navbar will now respond to login status */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/malware" element={<Malware />} />
          <Route path="/devops" element={<DevOps />} />
          <Route path="/offensive" element={<Offensive />} />
          <Route path="/defensive" element={<Defesive />} />
          <Route path="/reverse-engineering" element={<ReverseEngineer />} />
          <Route
            path="/eventquiz"
            element={
              <PrivateRoute>
                <EventQuiz />
              </PrivateRoute>
            }
          />
          <Route path="/eventquiz/:joinID" element={<EventQuiz />} />
          <Route path="/event-lobby/:joinID" element={<EventLobby />} />

          <Route
            path="/leaderboard"
            element={
              <PrivateRoute>
                <UserLeaderboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/quiz"
            element={
              <PrivateRoute>
                <QuizPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/join-quiz"
            element={
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

// Redirect away from any route if an active quiz is in progress
function QuizNavigationGuard() {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const joinID = localStorage.getItem("quiz_joinID");
    const quizEnded = localStorage.getItem("event_quizEnded") === "true";
    const isActiveThisTab = sessionStorage.getItem("quiz_active") === "true";

    if (joinID && !quizEnded && isActiveThisTab) {
      const quizPath = `/eventquiz/${joinID}`;
      if (location.pathname !== quizPath) {
        navigate(quizPath, { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  return null;
}
