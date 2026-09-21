import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./component/Signup";
import Login from "./component/Login";
import ForgetPassward from "./component/ForgetPassward";
import UpdateProfile from "./component/UpdateProfile";
import Dashboard from "./component/Dashboard";
import AuthProvider from "./context/AuthContext";

import RequireAuth from "./context/RequirAuth";

const App = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center "
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/updateprofile"
                element={
                  <RequireAuth>
                    <UpdateProfile />
                  </RequireAuth>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgetpassward" element={<ForgetPassward />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
};

export default App;
