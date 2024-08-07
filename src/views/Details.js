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
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import Menubar from "../components/Menubar";

const Details = () => {
  const [user, loading] = useAuthState(auth);
  const params = useParams();
  const { id } = params;
  const [posteruid, setPosterUID] = useState("");
  const [poster, setPoster] = useState({});
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [source, setSource] = useState("");
  const navigate = useNavigate();

  const deletePost = async () => {
    await deleteDoc(doc(db, "posts", id));
    navigate("/");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPost = async () => {
    const post = (await getDoc(doc(db, "posts", id))).data();
    setPosterUID(post.posteruid);
    setTitle(post.title);
    setImage(post.image);
    setSource(post.source);
    getPoster();
  };

  const getPoster = async (uid) => {
    const { displayName } = auth.getUser(uid);
    setPoster(displayName);
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      return navigate("/login");
    }
    getPost();
  }, [getPost, id, loading, navigate, user]);

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
                <Card.Title className="text-center my-2">{title}</Card.Title>
                <Card.Subtitle className="text-muted text-end mx-2 mb-3">
                  {poster}
                </Card.Subtitle>
                <Row>
                  <Col className="col-2 text-nowrap fst-italic ms-2">
                    Source:
                  </Col>
                  <Col>
                    <a href={source}>{source}</a>
                  </Col>
                </Row>
                <Row className="justify-content-end">
                  <Button
                    onClick={() => deletePost()}
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
                  {/* <Button
                    onClick={() => likePost()}
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
                  </Button> */}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Details;
