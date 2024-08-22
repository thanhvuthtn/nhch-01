import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import MenuItems from "../../components/menuitems/menuitems";
export const GiaoVien = () => {
  const myMenu = [
    {
      title: "Thư mục",
      link: "thumuc",
    },
    {
      title: "Câu hỏi",
      link: "cauhoi",
    },
  ];
  return (
    <Container>
      <Row>
        <Col sm={2}>
          <ul className="list-group">
            {myMenu.map((item, index) => (
              <li className="list-group-item list-group-item-light">
                <MenuItems item={item} key={index} />
              </li>
            ))}
          </ul>
        </Col>
        <Col sm={10}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};
