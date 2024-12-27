import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  // Lấy token từ Redux store
  const user = useSelector((state) => state.user.user);
  
  const navigate = useNavigate();

  return (
    <div>
      {user === null ? (
        <div className="navbar">
          <div className="navContainer">
            <span onClick={()=> navigate('/')} className="logo">Booking Website</span>
            <div className="navItems">
              <button
                className="navButton"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
              <button className="navButton" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar">
          <div className="navContainer">
            <span onClick={()=> navigate('/')} className="logo">Booking Website</span>
            <div className="navItems flex content-center justify-center">
              <p>{user.email}</p>
              <button className="navButton" onClick={() => {navigate('/transaction')}}>Transaction</button>
              <button
                className="navButton"
                onClick={() => {
                  dispatch(logout()); // Thực hiện hành động logout từ Redux store
                  localStorage.removeItem("token"); // Xóa token từ localStorage
                  
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
