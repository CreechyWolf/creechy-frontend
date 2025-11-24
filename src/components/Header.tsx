interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <div className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-[#6A0DAD] to-[#6A0DAD] shadow-lg text-center">
      {title}
    </div>
  );
}

export default Header;
