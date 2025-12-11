interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return <div className="flex flex-col px-[100px] py-[80px]">{children}</div>;
};

export default Layout;
