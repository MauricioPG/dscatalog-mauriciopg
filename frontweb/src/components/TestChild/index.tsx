type Props = {
  price: number;
  children: React.ReactNode;
};

const TestChildren = ({ price, children }: Props) => {
  return (
    <>
      <h1>Preço = {price}</h1>
      {children}
    </>
  );
};

export default TestChildren;
