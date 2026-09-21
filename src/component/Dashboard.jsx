import { Alert, Button, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Faild to Logout");
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="d-block">
            <strong>Email:</strong> {currentUser && currentUser.email}
          </div>
          <strong>Password:</strong> {currentUser.password}
          <Link to="/updateprofile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button className="btn btn-primary" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
