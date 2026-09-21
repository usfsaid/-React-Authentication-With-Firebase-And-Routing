import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(redirectPath, { replace: true });
    } catch {
      setError("Login is Failed");
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" ref={emailRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="passward">Passward</Form.Label>
              <Form.Control type="password" id="password" ref={passwordRef} />
            </Form.Group>

            <Button
              variant="primary w-100 mt-3"
              type="submit"
              style={{}}
              disabled={loading}
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgetpassward">Forget Passward</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Create Acount <Link to="/signup">Signup</Link>
      </div>
    </>
  );
};

export default Login;
