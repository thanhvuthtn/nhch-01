import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { Admin } from "./pages/admin/admin.tsx";
import ToTruong from "./pages/totruong/totruong.tsx";
import { GiaoVien } from "./pages/giaovien/giaovien.tsx";
import { Login } from "./pages/login/login.tsx";
import { ThuMuc } from "./pages/thumuc/thumuc.tsx";
import { CauHoi } from "./pages/cauhoi/cauhoi.tsx";
import { User } from "./pages/user/user.tsx";
import { MonHoc } from "./pages/monhoc/monhoc.tsx";
import { TaoMonHocMoi } from "./pages/monhoc/taomonhocmoi/taomonhocmoi.tsx";
import { XoaMonHoc } from "./pages/monhoc/xoamonhoc/xoamonhoc.tsx";
import { UpdateMonHoc } from "./pages/monhoc/updatemonhoc/updatemonhoc.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="admin" element={<Admin />}>
              <Route path="user" element={<User />}></Route>
              <Route path="monhoc" element={<MonHoc />}>
                <Route path="taomonhocmoi" element={<TaoMonHocMoi />}></Route>
                <Route
                  path=":monHocId/xoamonhoc"
                  element={<XoaMonHoc />}
                ></Route>
                <Route
                  path=":monHocId/updatemonhoc"
                  element={<UpdateMonHoc />}
                ></Route>
              </Route>
            </Route>
            <Route path="totruong" element={<ToTruong />}></Route>
            <Route path="giaovien" element={<GiaoVien />}>
              <Route path="thumuc" element={<ThuMuc />}></Route>
              <Route path="cauhoi" element={<CauHoi />}></Route>
            </Route>
            <Route path="login" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
