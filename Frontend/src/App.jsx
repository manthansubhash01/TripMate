import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Profile from "./pages/Profile";
import MapPage from "./pages/MapPage";
import Itinerary from "./pages/Itinerary";
import ExpenseTracker from "./pages/ExpenseTracker";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/itinerary"
            element={
              <ProtectedRoute>
                <Itinerary />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <ExpenseTracker />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
