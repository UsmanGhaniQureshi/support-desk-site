import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      Page Not Found , Click here to <Link to="/">Home</Link>{" "}
    </div>
  );
};

export default NotFound;
