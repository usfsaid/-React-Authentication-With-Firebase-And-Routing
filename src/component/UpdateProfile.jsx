import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordconfirmRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordconfirmRef.current.value) {
      return setError("Passward not matching");
    }
    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError("Failed to update account");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                ref={emailRef}
                defaultValue={currentUser?.email}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="passward">Passward</Form.Label>
              <Form.Control
                type="password"
                id="passward"
                ref={passwordRef}
                defaultValue={currentUser.password}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="passward-confirm">
                Passward Confirmation
              </Form.Label>
              <Form.Control
                type="password"
                id="passward-confirm"
                ref={passwordconfirmRef}
              />
            </Form.Group>
            <Button
              variant="primary w-100 mt-4"
              type="submit"
              style={{}}
              disabled={loading}
            >
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      ;
      <div className="w-100 text-center mt-2">
        <Link to="/login">Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
