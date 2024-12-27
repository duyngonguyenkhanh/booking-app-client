import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../slice/thunk/RegisterUser";
import { resetSuccess } from "../../slice/userSlice";

const Register = () => {
  const err = useSelector((state) => state.user.error || []);
  const isSuccess = useSelector((state) => state.user.isSuccess);

  const [errors, setErrors] = useState({});
  const [errorRegister, setErrorRegister] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newAccount, setNewAccount] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (err) {
      setErrorRegister(err.error)
    }
  }, [err])

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Kiểm tra định dạng số điện thoại (10-11 chữ số)
    const phoneRegex = /^\d{10,11}$/;

    let formErrors = {};

    // Kiểm tra email
    if (!emailRegex.test(newAccount.email)) {
      formErrors.email = "Email không hợp lệ!";
    }

    // Kiểm tra số điện thoại
    if (!phoneRegex.test(newAccount.phoneNumber)) {
      formErrors.phoneNumber = "Số điện thoại không hợp lệ!";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Hiển thị lỗi nếu có
      return;
    }

    const newUser = {
      username: newAccount.email,
      password: newAccount.password,
      fullName: newAccount.fullName,
      phoneNumber: newAccount.phoneNumber,
      email: newAccount.email,
      isAdmin: false,
    };
    dispatch(RegisterUser(newUser));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (isSuccess) {
      setNewAccount({
        email: "",
        password: "",
        fullName: "",
        phoneNumber: "",
      });
      setErrorRegister('')
      alert("Tạo tài khoản thành công!");
      navigate("/login");
      dispatch(resetSuccess()); // Reset isSuccess về false
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen ">
        <form onSubmit={handleRegister}>
          <div className="">
            <div className="">
              <h1 className="text-3xl text-center font-medium">Sign Up</h1>
              <div>
                <input
                  className="border hover:border-[#003580] py-2 w-[400px] mb-6"
                  type="text"
                  placeholder="Nhập email"
                  onChange={handleChange}
                  name="email"
                  value={newAccount.email}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  className="border hover:border-[#003580] py-2 w-[400px] mb-6"
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={handleChange}
                  name="password"
                  value={newAccount.password}
                />
              </div>
              <div>
                <input
                  className="border hover:border-[#003580] py-2 w-[400px] mb-6"
                  type="text"
                  placeholder="Họ và Tên"
                  onChange={handleChange}
                  name="fullName"
                  value={newAccount.fullName}
                />
              </div>
              <div>
                <input
                  className="border hover:border-[#003580] py-2 w-[400px] mb-6"
                  type="text"
                  placeholder="Số điện thoại"
                  onChange={handleChange}
                  name="phoneNumber"
                  value={newAccount.phoneNumber}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber}</p>
                )}
              </div>
            </div>
            {errorRegister && <p className="text-red-500">{errorRegister}</p>}
          </div>
          <button
            type="submit"
            className="hover:bg-[#003580] bg-[#265aa2] text-white rounded-sm py-2 w-[400px]"
          >
            Tạo tài khoản
          </button>
          <p className="text-center italic">
            trở về trang đăng nhập?{" "}
            <i
              className="font-bold text-[#003580]"
              onClick={() => navigate("/login")}
            >
              Login
            </i>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
