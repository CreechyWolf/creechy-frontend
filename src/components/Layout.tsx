import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

function Layout({ title, children }: LayoutProps) {
  return (
    <>
      <Header title={title} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
