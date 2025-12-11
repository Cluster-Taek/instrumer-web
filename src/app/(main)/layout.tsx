import Header from '@/components/layout/header';

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex flex-col w-full relative">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
