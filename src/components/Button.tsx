import { Link } from "react-router-dom";

interface ButtonProps {
  to: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-sm transition duration-150"
    >
      {children}
    </Link>
  );
};

export default Button;