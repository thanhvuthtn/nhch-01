import { useParams } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setMonHoc,
  iMonHoc,
  DeleteMonHoc,
} from "../../../redux/monhoc/monhocslince";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./xoamonhoc.css";
import axios from "axios";

type iId = {
  monHocId: string;
};
export const XoaMonHoc = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const monHoc = useSelector((state: RootState) => state.monHoc.value.monHoc);
  const { monHocId } = useParams<iId>();
  const myId = monHocId as string;

  useEffect(() => {
    dispatch(setMonHoc(myId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myId]);
  //Xóa môn học
  const client = axios.create({
    baseURL: "http://localhost:3162",
  });
  const navigate = useNavigate();
  const XoaMonHocOnClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await client
        .post("/v1/monhoc/delete", {
          id: monHoc._id,
        })
        .then((response) => {
          //alert(response.data);
          const newMonHoc: iMonHoc = response.data;
          dispatch(DeleteMonHoc(newMonHoc));
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
  return (
    <div>
      <h5 className="text-center" id="title">
        XÓA MÔN HỌC
      </h5>
      <div>
        Mã môn học: <span className=" text-black">{monHoc.maMonHoc}</span>
      </div>
      <div>
        Tên môn học: <span className=" text-black">{monHoc.tenMonHoc}</span>
      </div>
      <div id="action">
        <Link to=".." className=" btn btn-secondary">
          Quay về
        </Link>
        <span> </span>
        <Button className="btn btn-primary" onClick={XoaMonHocOnClick}>
          Xóa môn học
        </Button>
      </div>
      <div id="error" className=" text-danger">
        {error}
      </div>
    </div>
  );
};
