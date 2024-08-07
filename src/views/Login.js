import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <Container>
      <h1 className="my-3">Login to AniGram</h1>
      <Form>
        <Form.Group className="mb-3" controlId="user">
          <Row>
            <Col lg="1" className="col-12">
              <Form.Label className="pt-2">Email:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter the email address associated with your account"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Row>
            <Col lg="1" className="col-12">
              <Form.Label className="pt-2">Password:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>
        <Row>
          <a href="/signup">
            Don't have an AniGram account yet? Create one here!
          </a>
        </Row>
        <Row className="justify-content-end mx-0 my-2">
          <Button
            variant="primary"
            className="col-12 col-md-2"
            onClick={async () => {
              setError("");
              if (email && password) {
                try {
                  await signInWithEmailAndPassword(auth, email, password);
                  console.log(`{email} logged in`);
                  navigate("/");
                } catch (error) {
                  setError(error.message);
                }
              }
            }}
          >
            Login
          </Button>
        </Row>
      </Form>
      <p>{error}</p>
    </Container>
  );
};

export default Login;
