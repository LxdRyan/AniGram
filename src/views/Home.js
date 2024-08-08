import { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Menubar from "../components/Menubar";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const query = await getDocs(collection(db, "posts"));
    const posts = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const ImageSquare = ({ post }) => {
    const { image, id } = post;
    // console.log(image);
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
        <Row>
          <ImagesRow />
        </Row>
      </Container>
    </>
  );
};

export default Home;
