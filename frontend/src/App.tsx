import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { Footer } from "./components/footer/footer";
import { MenuItems } from "./components/menuitems/menuitems";
import { Outlet } from "react-router-dom";
import { InfoUser } from "./components/info/info";

const menuItems = [
  {
    title: "Admin",
    link: "admin",
  },
  {
    title: "Tổ trưởng",
    link: "totruong",
  },
  {
    title: "Giáo viên",
    link: "giaovien",
  },
  {
    title: "Login",
    link: "login",
  },
];
function App() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            {menuItems.map((item, index) => (
              <MenuItems item={item} key={index} />
            ))}
          </Nav>
          <InfoUser email="nguyenthanhvu.hlk@moet.edu.vn" quyen="admin" />
        </Container>
      </Navbar>
      {/* Main page */}
      <Container>
        <Outlet />
      </Container>
      {/* Footer */}
      <Container>
        <Footer />
      </Container>
    </>
  );
}

export default App;
