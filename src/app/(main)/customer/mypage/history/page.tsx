interface IPageProps {
  children?: React.ReactNode;
}

const Page = ({ children }: IPageProps) => {
  return (
    <div className="block">
      <div>{children}</div>
    </div>
  );
};

export default Page;
