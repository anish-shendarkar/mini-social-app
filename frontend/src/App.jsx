import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/login";
import Signup from "../pages/signup";
import Feed from "../pages/feed";

import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
