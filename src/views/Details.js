import { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import Menubar from "../components/Menubar";

const Details = () => {
  const [user, loading] = useAuthState(auth);
  const params = useParams();
  const { id } = params;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const deletePost = async (id) => {
    const imageRef = ref(getStorage(), `images/${image.name}`);
    await deleteObject(imageRef);
    await deleteDoc(doc(db, "posts", id));
    navigate("/");
  };

  const getPost = async (id) => {
    const post = (await getDoc(doc(db, "posts", id))).data();
    setCaption(post.caption);
    setImage(post.image);
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      return navigate("/login");
    }
    getPost(id);
  }, [id, loading, navigate, user]);

  return (
    <>
      <Menubar />
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md="6">
            <Image src={image.url} style={{ width: "100%" }} />
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>{caption}</Card.Text>
                <Card.Link href={`/update/${id}`}>Edit</Card.Link>
                <Card.Link
                  onClick={() => deletePost(id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Details;
