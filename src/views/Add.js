import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import axios from "axios";
import { API, POST } from "../constants";
import Menubar from "../components/Menubar";

const Add = () => {
  const [user, loading] = useAuthState(auth);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const params = useParams();
  const { id } = params;
  const url = `${API}${POST}${id}`;
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getImage = async () => {
    console.log(url);
    const response = await axios.get(`${url}.json`);
    setImage(response.data.file_url);
  };

  const addPost = async () => {
    await addDoc(collection(db, "posts"), {
      title,
      image,
      source: url,
      posteruid: user.uid,
    });
    navigate("/");
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      return navigate("/login");
    }
    getImage();
  }, [getImage, loading, navigate, user]);

  return (
    <>
      <Menubar />
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md="6">
            <Image src={image} style={{ width: "100%" }} />
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="title">
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                </Form>
                <Row>
                  <Col className="col-2 text-nowrap fst-italic ms-2">
                    Source:
                  </Col>
                  <Col>
                    <a href={url}>{url}</a>
                  </Col>
                </Row>
                <Row className="justify-content-end">
                  <Button
                    onClick={() => navigate("/search")}
                    variant=""
                    className="col-1 p-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="red"
                      class="bi bi-x-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </Button>
                  <Button
                    onClick={() => addPost()}
                    variant=""
                    className="col-1 px-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="blue"
                      class="bi bi-send-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                    </svg>
                  </Button>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Add;
