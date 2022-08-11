import { Link, useNavigate } from "react-router-dom";
import LinkButton from "../LinkButton";
import { FaUserAlt, FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../store/auth/authSlice";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  const dispatch = useDispatch();
  return (
    <div className="w-full md:w-3/5 md:mx-auto">
      <div className="flex justify-between items-center border-b  py-5">
        <Link to="/">Support Desk</Link>
        {!user && (
          <div className="flex items-center space-x-3">
            <LinkButton
              url="/login"
              linkText="Login"
              className="font-bold text-xs"
            >
              <FaUserAlt />
            </LinkButton>
            <LinkButton
              url="/register"
              className="font-bold text-xs"
              linkText="Register"
            >
              <FaSignInAlt />
            </LinkButton>
          </div>
        )}
        {user && <button onClick={logoutHandler}>Logout</button>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
