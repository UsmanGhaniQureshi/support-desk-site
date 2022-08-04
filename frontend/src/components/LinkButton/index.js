import { Link } from "react-router-dom";

const LinkButton = ({ children, url, linkText, className }) => {
  return (
    <Link
      className={`flex items-center justify-center space-x-2 ${className}`}
      to={url}
    >
      <span className="inline-block mx-2">{children}</span>
      {linkText}
    </Link>
  );
};

export default LinkButton;
