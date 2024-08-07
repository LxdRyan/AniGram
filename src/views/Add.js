import { useEffect, useState } from "react";
import { Button, Container, Form, Image, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import Menubar from "../components/Menubar";

const Add = () => {
  const [user, loading] = useAuthState(auth);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const addPost = async () => {
    await addDoc(collection(db, "posts"), {
      title,
      image: preview,
    });
    navigate("/");
  };

  const ShowPreview = () => {
    if (preview) {
      return (
        <Image
          src={preview}
          style={{ objectFit: "cover", width: "12rem", height: "12rem" }}
        />
      );
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      return navigate("/login");
    }
  }, [loading, navigate, user]);

  return (
    <>
      <Menubar />
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Add Post</h1>
        <Form>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Caption"
              value={title}
              onChange={(text) => setTitle(text.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const imageFile = e.target.files[0];
                const previewUrl = URL.createObjectURL(imageFile);
                setPreview(previewUrl);
                setImage(imageFile);
              }}
            />
          </Form.Group>
          <Row className="mb-3">
            <ShowPreview />
          </Row>
          <Button variant="primary" onClick={async (e) => addPost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Add;
