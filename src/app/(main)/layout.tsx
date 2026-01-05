import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex flex-col w-full relative bg-gray-50">
      <Header />
      <main className="max-w-screen-xl mx-auto w-full">{children}</main>
      <footer className="mt-20">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
