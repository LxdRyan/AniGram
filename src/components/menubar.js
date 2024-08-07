import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Menubar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const NavOptions = () => {
    if (user) {
      return (
        <>
          <Nav.Link href="/search">New Post</Nav.Link>
          <Nav.Link
            onClick={() => {
              signOut(auth);
              navigate("/login");
            }}
          >
            Sign Out
          </Nav.Link>
          <Nav.Link href={`/user/${user.uid}`}>
            <Image
              src={user.photoURL}
              style={{
                height: "2rem",
                width: "2rem",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Nav.Link>
        </>
      );
    } else {
      return <Nav.Link href="/login">Login</Nav.Link>;
    }
  };

  return (
    <Navbar variant="light" bg="light">
      <Container>
        <Navbar.Brand href="/">AniGram</Navbar.Brand>
        <Nav>
          <NavOptions />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menubar;
