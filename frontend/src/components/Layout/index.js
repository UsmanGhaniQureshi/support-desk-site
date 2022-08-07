import { Link } from "react-router-dom";
import LinkButton from "../LinkButton";
import { FaUserAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authSlice";

const Layout = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  if (isLoading) return <p>Loading ....</p>;
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
              <FiLogIn />
            </LinkButton>
          </div>
        )}
        {user && <button onClick={() => dispatch(logout())}>Logout</button>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
