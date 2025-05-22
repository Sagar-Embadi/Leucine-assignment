import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import CreateSoftware from "./pages/CreateSoftware.jsx";
import RequestAccess from "./pages/RequestAccess.jsx";
import PendingRequests from "./pages/PendingRequests.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from './pages/Home.jsx';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer/>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/create-software"
            element={
              <ProtectedRoute role="Admin">
                <CreateSoftware />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={<Home/>}
          />
          <Route
            path="/request-access"
            element={
              <ProtectedRoute role="Employee">
                <RequestAccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pending-requests"
            element={
              <ProtectedRoute role="Manager">
                <PendingRequests />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
