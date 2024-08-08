import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Menubar from "../components/Menubar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const params = useParams();
  const { id } = params;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUser = async () => {
    const user = (await getDoc(doc(db, "users", id))).data();
    setUser(user);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPosts = async () => {
    const q = query(collection(db, "posts"), where("posteruid", "==", id));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
    getUser();
  }, [getPosts, getUser]);

  const ImageSquare = ({ post }) => {
    const { image, id } = post;
    console.log(image);
    return (
      <Link
        to={`post/${id}`}
        style={{
          width: "18rem",
          marginLeft: "1rem",
          marginTop: "2rem",
        }}
      >
        <Image
          src={image}
          style={{
            objectFit: "cover",
            width: "18rem",
            height: "18rem",
          }}
        />
      </Link>
    );
  };

  const ImagesRow = () => {
    return posts.map((post, index) => <ImageSquare key={index} post={post} />);
  };

  return (
    <>
      <Menubar />
      <Container>
        <Row className="pt-2">
          <Col className="col-1">
            <Image
              src={user.photo}
              style={{ height: "5rem", width: "5rem", objectFit: "cover" }}
              roundedCircle
              className="p-0"
            />
          </Col>
          <Col>
            <h1 className="pt-3">{user.username}</h1>
          </Col>
        </Row>

        <Row>
          <ImagesRow />
        </Row>
      </Container>
    </>
  );
};

export default Home;
