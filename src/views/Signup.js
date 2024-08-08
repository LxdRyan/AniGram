import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { API, POST, RANDOM } from "../constants";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const randomPfp = async () => {
    console.log("askfljhfdkfh");
    const response = await axios.get(`${API}${POST}${RANDOM}`);
    return response.data.preview_file_url;
  };

  const addUser = async () => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      email: auth.currentUser.email,
      username: auth.currentUser.displayName,
      photo: auth.currentUser.photoURL,
    });
  };

  return (
    <Container>
      <h1 className="my-3">Create a new AniGram Account</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Row>
            <Col lg="1" className="col-12">
              <Form.Label className="pt-2">Email:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="email"
                placeholder="Enter the email address to be associated with your account"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Row>
            <Col lg="1" className="col-12">
              <Form.Label className="pt-2">Username:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter a username for your account"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Text className="text-muted">
                Username cannot include spaces. Spaces will be replaced with
                underscores by default. If left empty or invalid, a username
                will be generated from your email.
              </Form.Text>
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
                placeholder="Enter a password for your account"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>
        <Row>
          <a href="/login">
            Have an existing AniGram account? Login here instead!
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
                  await createUserWithEmailAndPassword(auth, email, password);
                  if (!username) {
                    await updateProfile(auth.currentUser, {
                      displayName: email.split("@")[0],
                    });
                  } else if (username.match(" ")) {
                    await updateProfile(auth.currentUser, {
                      displayName: username.replaceAll(" ", "_"),
                    });
                  } else {
                    await updateProfile(auth.currentUser, {
                      displayName: username,
                    });
                  }
                  await updateProfile(auth.currentUser, {
                    photoURL: await randomPfp(),
                  });
                  addUser();
                  console.log(
                    `User:\t${auth.currentUser.displayName} created\nEmail:\t${email}\nProfile Image:\t${auth.currentUser.photoURL}`
                  );
                  navigate("/");
                } catch (error) {
                  setError(error.message);
                }
              }
            }}
          >
            Create Account
          </Button>
        </Row>
      </Form>
      <p>{error}</p>
    </Container>
  );
};

export default SignUp;
