import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <Container>
      <h1 className="my-3">Sign up for an account</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="/login">Have an existing account? Login here.</a>
        </Form.Group>
        <Button
          variant="primary"
          onClick={async () => {
            setError("");
            const notEmpty = username && password;
            if (notEmpty) {
              try {
                await createUserWithEmailAndPassword(auth, username, password);
                navigate("/");
                console.log(`${username} created`);
              } catch (error) {
                setError(error);
              }
            }
          }}
        >
          Sign Up
        </Button>
      </Form>
      <p>{error}</p>
    </Container>
  );
};

export default SignUp;
