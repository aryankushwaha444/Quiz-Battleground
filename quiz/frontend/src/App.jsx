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
import QuizPage from "./QuizPage.jsx";
import Malware from "./Malware.jsx";
import DevOps from "./DevOps.jsx";
import EventLobby from "./EventLobby.jsx";
import Offensive from "./Offensive.jsx";
import Defesive from "./Defensive.jsx";
import ReverseEngineer from "./ReverseEngineer.jsx"



function App() {
  return (
    <AuthProvider>
      {" "}
      {/*  Provide authentication context */}
      <Router>
        <Navbar /> {/*  Navbar will now respond to login status */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/malware" element={<Malware />} />
          <Route path="/devops" element={<DevOps/>}/>
          <Route path="/offensive" element={<Offensive/>}/>
          <Route path="/defensive" element={<Defesive/>}/>
          <Route path="/reverse-engineering" element={<ReverseEngineer/>}/>
          <Route path="/event-lobby" element={<EventLobby />} />

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
                <JoinQuiz/>
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


