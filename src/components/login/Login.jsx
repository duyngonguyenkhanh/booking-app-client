import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../utils/decodeToken";
import { LoginUser } from "../../slice/thunk/LoginUser";
import { resetSuccess } from "../../slice/userSlice";

const Login = () => {
  const { error, isSuccess, res } = useSelector((state) => state.user);


  useEffect(() => {

    if (res !== null) {
      const decodedToken = decodeToken(res.token);
      console.log("Decoded Token:", decodedToken);
    }
  }, [res]);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [newAccount, setNewAccount] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const UserLogin = {
      email: newAccount.email,
      password: newAccount.password,
    };
    dispatch(LoginUser(UserLogin));
  };

  useEffect(() => {
    if (isSuccess) {
      setNewAccount({
        email: "",
        password: "",
      });
      navigate("/");
    }
    dispatch(resetSuccess())
  }, [navigate, isSuccess, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen ">
        <form onSubmit={handleLogin}>
          <div className="">
            <div className="">
              <h1 className="text-3xl text-center font-medium mb-2">
                Đăng Nhập
              </h1>
              <div>
                <input
                  className=" border hover:border-[#003580] py-2 w-[400px] mb-6"
                  type="text"
                  placeholder="Nhập email"
                  onChange={handleChange}
                  name="email"
                  value={newAccount.email}
                />
              </div>
              <div>
                <input
                  className=" border hover:border-[#003580] py-2 w-[400px] mb-6"
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={handleChange}
                  name="password"
                  value={newAccount.password}
                />
              </div>
            </div>
            {error && <p className="text-red-500">{error.error}</p>}
          </div>
          <button
            type="submit"
            className="hover:bg-[#003580] bg-[#265aa2] text-white rounded-sm py-2 w-[400px]"
          >
            Đăng nhập
          </button>
          <p className="text-center mt-2">
            tạo 1 tài khoản mới?{" "}
            <i
              className="font-bold text-[#003580]"
              onClick={() => navigate("/register")}
            >
              Sigup
            </i>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
