interface ButtonListProps {
  children: React.ReactNode;
}

function ButtonList({ children }: ButtonListProps) {
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {children}
    </div>
  );
}

export default ButtonList;