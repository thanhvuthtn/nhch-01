import axios from "axios";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
//import { useAppSelector, useAppDispatch } from '../../redux/hook'
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setMonHocs } from "../../redux/monhoc/monhocslince";

export const MonHoc = () => {
  //const [monHocs, setMonHocs] = useState<iMonHoc[]>([]);
  const client = axios.create({
    baseURL: "http://localhost:3162",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    client
      .get("/v1/monhoc/index")
      .then((response) => {
        //setMonHocs(response.data);
        dispatch(setMonHocs(response.data));
        //setReduxMonHocs();
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //---------------------------------------------------------
  const MonHocs = useSelector((state: RootState) => state.monHoc.value.monHocs);
  return (
    <>
      <Container>
        <Row>
          <Col sm={8}>
            <h4 className="text-center">DANH MỤC MÔN HOC</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Mã môn học</th>
                  <th>Tên môn học</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {MonHocs.map((monHoc, index) => (
                  <tr>
                    <td key={index}>{monHoc.maMonHoc}</td>
                    <td>{monHoc.tenMonHoc}</td>
                    <td>
                      <Link to={`${monHoc._id?.toString()}/xoamonhoc`}>
                        Xóa
                      </Link>{" "}
                      -{" "}
                      <Link to={`${monHoc._id?.toString()}/updatemonhoc`}>
                        Sửa
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="taomonhocmoi" className="btn btn-primary">
              Thêm môn học mới
            </Link>
          </Col>
          <Col sm={4}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};
