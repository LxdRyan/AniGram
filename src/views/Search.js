import { useEffect, useState } from "react";
import { Button, Container, Form, Image, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import axios from "axios";
import { API, POSTS, TAGS, LIMIT, PAGE } from "../constants";
import Menubar from "../components/Menubar";

const Search = () => {
  const [user, loading] = useAuthState(auth);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const convertSearch = (input) => {
    return input
      .split(";")
      .map((tag) => tag.trim().replace(" ", "_"))
      .filter((tag) => tag !== "")
      .join("+");
  };

  const getImages = async ({ tags, page }) => {
    const url = `${API}${POSTS}?${tags}${LIMIT}&${PAGE}${page}`;
    console.log(url);
    const response = await axios.get(url);
    setImages(response.data);
    // response.data.forEach((image) => console.log(image));
  };

  const ImageSquare = ({ image }) => {
    const { file_url, id } = image;
    return (
      <Link
        to={`../add/${id}`}
        style={{
          width: "12rem",
          marginLeft: "1rem",
          marginTop: "2rem",
        }}
      >
        <Image
          src={file_url}
          style={{
            objectFit: "cover",
            width: "12rem",
            height: "12rem",
          }}
        />
      </Link>
    );
  };

  const ImagesRow = () => {
    return images.map((image, index) => (
      <ImageSquare key={index} image={image} />
    ));
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
        <h1 style={{ marginBlock: "1rem" }}>Search</h1>
        <Form>
          <Form.Group className="mb-3" controlId="tags">
            <Form.Label>Tags to search:</Form.Label>
            <Form.Control
              type="text"
              placeholder="tag 1; tag 2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Form.Text className="text-muted">
              Input max. 2 tags separated by ;
            </Form.Text>
          </Form.Group>
        </Form>
        <Button
          variant="primary"
          onClick={() => {
            if (search) {
              setTags(`${TAGS}${convertSearch(search)}&`);
            } else {
              setTags("");
            }
            getImages({ tags, page });
          }}
        >
          Search
        </Button>
        <Row className="mb-3">
          <ImagesRow />
        </Row>
        <Button
          variant="primary"
          className="me-1"
          onClick={() => {
            setPage(page - 1);
            getImages({ tags, page: page - 1 });
          }}
        >
          Previous Page
        </Button>
        <Button
          variant="primary"
          className="ms-1"
          onClick={() => {
            setPage(page + 1);
            getImages({ tags, page: page + 1 });
          }}
        >
          Next Page
        </Button>
      </Container>
    </>
  );
};

export default Search;
