import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRef, useState } from "react";

const Signup = () => {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwardRef = useRef();
  const passwardconfirmRef = useRef();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwardRef.current.value !== passwardconfirmRef.current.value) {
      return setError("Passward not matching");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwardRef.current.value);
      navigate("/");
    } catch {
      setError("Faild Create Acount");
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Signup</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="passward">Passward</Form.Label>
              <Form.Control type="password" id="passward" ref={passwardRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="passward-confirm">
                Passward Confirmation
              </Form.Label>
              <Form.Control
                type="password"
                id="passward-confirm"
                ref={passwardconfirmRef}
              />
            </Form.Group>
            <Button
              variant="primary w-100 mt-4"
              type="submit"
              style={{}}
              disabled={loading}
            >
              SignUp
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an acount? <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default Signup;
