import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import { API, POSTS, TAGS, LIMIT, PAGE } from "../constants";
import Menubar from "../components/Menubar";

const Search = () => {
  const [user, loading] = useAuthState(auth);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  // const [mode, setMode] = useState("tags");
  // const [placeholder, setPlaceholder] = useState("");
  // const [formtext, setFormtext] = useState("");
  const navigate = useNavigate();

  const convertSearch = (input) => {
    return input
      .toLowerCase()
      .split(";")
      .map((tag) => tag.trim().replace(" ", "_"))
      .filter((tag) => tag !== "")
      .join("+");
  };

  // TODO implement search by id/switching search modes on the same page
  // const getImageWithID = async (id) => {
  //   const url = `${API}${POST}${id}.json`;
  //   const response = await axios.get(url);
  //   console.log(response.data);
  //   if (response.data.file_url) {
  //     navigate(`/add/${response.data.id}`);
  //   } else {
  //     console.log("Image not found"); // TODO show error
  //   }
  // };

  // const SearchMode = () => {
  //   if (mode === "tags") {
  //     setPlaceholder("e.g. (White hair; 1girl)");
  //     setFormtext("Input max. 2 tags separated by ;");
  //     return (
  //       <>
  //         <Row className="mb-3">
  //           <ImagesRow />
  //         </Row>
  //         <Button
  //           variant="primary"
  //           className="me-1"
  //           onClick={() => {
  //             setPage(page - 1);
  //             getImages({ tags, page: page - 1 });
  //           }}
  //         >
  //           Previous Page
  //         </Button>
  //         <Button
  //           variant="primary"
  //           className="ms-1"
  //           onClick={() => {
  //             setPage(page + 1);
  //             getImages({ tags, page: page + 1 });
  //           }}
  //         >
  //           Next Page
  //         </Button>
  //       </>
  //     );
  //   } else {
  //     setPlaceholder("e.g. 507652");
  //     setFormtext("Input the ID of the image");
  //   }
  // };

  const getImages = async ({ tags, page }) => {
    const url = `${API}${POSTS}?${tags}${LIMIT}&${PAGE}${page}`;
    const response = await axios.get(url);
    setImages(response.data);
    // response.data.forEach((image) => console.log(image));
  };

  const ImageSquare = ({ image }) => {
    const { id } = image;
    const url = image.media_asset.variants[1].url;
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
          src={url}
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
          <Form.Group className="mb-3" controlId="search">
            <Row>
              <Col className="col-11">
                <Form.Control
                  type="text"
                  placeholder="e.g. (White hair; 1girl)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Form.Text className="text-muted fst-italic">
                  Input max. 2 tags separated by ;
                </Form.Text>
              </Col>
              <Col className="col-1 p-0">
                <Button
                  variant=""
                  className="col-12 m-0 border border-primary"
                  onClick={() => {
                    if (search) {
                      setTags(`${TAGS}${convertSearch(search)}&`);
                    } else {
                      setTags("");
                    }
                    getImages({ tags, page });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-search p-0 align-middle"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
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
        {/* <Form>
          <Form.Group className="mb-3" controlId="search">
            <Row>
              <Col className="col-11">
                <Form.Control
                  type="text"
                  placeholder="e.g. 507652"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Form.Text className="text-muted fst-italic">
                  Input the ID of the image
                </Form.Text>
              </Col>
              <Col className="col-1 p-0">
                <Button
                  variant=""
                  className="col-12 m-0 border border-primary"
                  onClick={() => {
                    if (search) {
                      getImageWithID(search);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-search p-0 align-middle"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form> */}
        {/* <Button onClick={() => setMode("tags")}>Tags</Button>
        <Button onClick={() => setMode("id")}>ID</Button> */}
      </Container>
    </>
  );
};

export default Search;
