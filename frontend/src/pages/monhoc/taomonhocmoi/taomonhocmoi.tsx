import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./taomonhocmoi.css";
import { useState } from "react";
import axios from "axios";
import { iMonHoc, AddNewMonHoc } from "../../../redux/monhoc/monhocslince";
import { useDispatch } from "react-redux";
export const TaoMonHocMoi = () => {
  const dispatch = useDispatch();

  const client = axios.create({
    baseURL: "http://localhost:3162",
  });
  const [error, setError] = useState("");
  const [tenMonHoc, setTenMonHoc] = useState("");
  const [maMonHoc, setMaMonHoc] = useState("");
  const navigate = useNavigate();
  //----------------------------------------------------------------
  //handel
  const TenMonHocOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError("");
    setTenMonHoc(e.currentTarget.value);
  };
  const MaMonHocOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError("");
    setMaMonHoc(e.currentTarget.value);
  };

  const handleAdd = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      if (maMonHoc === "") {
        setError("Bạn chưa nhập mã môn học");
        return;
      }

      if (tenMonHoc === "") {
        setError("Bạn chưa nhập tên môn học");
        return;
      }
      await client
        .post("/v1/monhoc/addnew", {
          maMonHoc,
          tenMonHoc,
        })
        .then((response) => {
          //alert(response.data);
          const newMonHoc: iMonHoc = response.data;
          dispatch(AddNewMonHoc(newMonHoc));
          navigate("..");
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            //alert(error.response.status);
            //alert(error.response.data);
            //alert(error.response.headers);
            setError(error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            //console.log(error.request);
            setError(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            //console.log("Error", error.message);
            setError(error.message);
          }
          console.log(error.config);
        });
    } catch (err) {
      //setError((err as Error).message);
      console.log((err as Error).message);
    }
  };
  //----------------------------------------------------------------------
  return (
    <div>
      <h5 className="text-center" id="title">
        THÊM MÔN HỌC MỚI
      </h5>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Mã môn học"
            value={maMonHoc}
            onChange={MaMonHocOnChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Tên môn học"
            value={tenMonHoc}
            onChange={TenMonHocOnChange}
            required
          />
        </Form.Group>
        <Link to=".." className="btn btn-secondary" id="quayve">
          Quay về
        </Link>
        <Button variant="primary" type="submit" onClick={handleAdd}>
          Thêm môn học mới
        </Button>
      </Form>
      <div id="error" className="text-danger">
        {error}
      </div>
    </div>
  );
};
