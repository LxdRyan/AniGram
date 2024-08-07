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
      poster: user.email,
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
    console.log(user);
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
                      fill="grey"
                      class="bi bi-trash3-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                  </Button>
                  <Button
                    onClick={() => addPost()}
                    variant=""
                    className="col-1 px-0 mx-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="red"
                      class="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                      />
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
