import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./components/login/Login";
import { useDispatch } from "react-redux";
import { setTokenFromLocalStorage } from "./slice/userSlice";
import { useEffect } from "react";

import Reserve from "./pages/booking/Reserve";
import { Homepage } from "./slice/thunk/Homepage";
import Register from "./components/regiter/Register";
import Transaction from "./pages/Transaction/Transaction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTokenFromLocalStorage()); // Kiểm tra token từ localStorage mỗi khi ứng dụng khởi chạy
    dispatch(Homepage());
  }, [dispatch]);
  return (
    <Routes>
      {routesConfig.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

const routesConfig = [
  { path: "/", element: <Home /> },
  { path: "/hotels", element: <List /> },
  { path: "/hotels/:id", element: <Hotel /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/reserve", element: <Reserve /> },
  { path: "/transaction", element: <Transaction /> },
  // Thêm các route khác vào đây...
];
export default App;
