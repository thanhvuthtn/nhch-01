import "./updatemonhoc.css";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//Redux
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setMonHoc,
  UpdateMaMonHoc,
  UpdateTenMonHoc,
  UpdateMonHocs,
  iMonHoc,
} from "../../../redux/monhoc/monhocslince";
//Axios
import axios from "axios";
//Giao diện
type iId = {
  monHocId: string;
};
//--------------------------------------
export const UpdateMonHoc = () => {
  //params
  const { monHocId } = useParams<iId>();
  const myId = monHocId as string;
  //-------------------------------------------

  //Lấy thông tin từ Redux
  const dispatch = useDispatch();
  const monHoc = useSelector((state: RootState) => state.monHoc.value.monHoc);
  useEffect(() => {
    dispatch(setMonHoc(myId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myId]);
  //------------------------------------------
  //State
  const [error, setError] = useState("");
  //--------------------------------------------
  //onChange
  const TenMonHocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(UpdateTenMonHoc(e.target.value));
  };

  const MaMonHocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(UpdateMaMonHoc(e.target.value));
  };
  //----------------------------------------------
  //Axios và Navigate
  const client = axios.create({
    baseURL: "http://localhost:3162",
  });
  const navigate = useNavigate();
  //--------------------------------------------
  //Onclick Button
  const UpdateButtonClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      //Kiểm tra điều kiện rổng
      if (monHoc.maMonHoc === "") {
        setError("Bạn chưa nhập mã môn học");
        return;
      }

      if (monHoc.tenMonHoc === "") {
        setError("Bạn chưa nhập tên môn học");
        return;
      }
      //Setting axios
      await client
        .post("/v1/monhoc/update", {
          id: monHoc._id,
          tenMonHoc: monHoc.tenMonHoc,
          maMonHoc: monHoc.maMonHoc,
        })
        .then((response) => {
          //alert(response.data);
          const newMonHoc: iMonHoc = response.data;
          dispatch(UpdateMonHocs(newMonHoc));
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
      console.log((err as Error).message);
    }
  };
  //--------------------------------------------
  return (
    <div>
      <h4 className="text-center">CẬP NHẬT MÔN HỌC</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={monHoc.maMonHoc}
            onChange={MaMonHocChange}
            placeholder="Mã môn học"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={monHoc.tenMonHoc}
            onChange={TenMonHocChange}
            placeholder="Tên môn học"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Link to=".." className="btn btn-secondary" id="quayve">
            Quay về
          </Link>
          <Button onClick={UpdateButtonClick}>Cập nhật</Button>
        </Form.Group>
      </Form>
      <div id="error" className="text-danger">
        {error}
      </div>
    </div>
  );
};
