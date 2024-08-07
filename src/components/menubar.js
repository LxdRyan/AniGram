import { Container, Nav, Navbar } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Menubar = () => {
  return (
    <Navbar variant="light" bg="light">
      <Container>
        <Navbar.Brand href="/">AniGram</Navbar.Brand>
        <Nav>
          <Nav.Link href="/search">New Post</Nav.Link>
          <Nav.Link onClick={() => signOut(auth)}>🚪</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menubar;
