interface ButtonListProps {
  children: React.ReactNode;
}

function ButtonList({ children }: ButtonListProps) {
  return <div className="flex flex-wrap justify-center gap-4">{children}</div>;
}

export default ButtonList;
