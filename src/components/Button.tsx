import { Link } from "react-router-dom";

interface ButtonProps {
  to: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="
        bg-[#6a1b9a]
        hover:bg-[#4a148c]
        text-white
        px-6 py-3
        rounded-md
        shadow-md
        text-base
        font-medium
        transition-all
        duration-200
        w-64
        text-center
      "
    >
      {children}
    </Link>
  );
};

export default Button;