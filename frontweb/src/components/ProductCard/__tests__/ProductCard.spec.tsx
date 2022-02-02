import { render, screen } from "@testing-library/react";
import { Product } from "types/product";
import ProductCard from "..";


describe('ProductCard  tests', () => {
    test('Should render ProductCard', () => {
      //ARRANGE

      const product : Product = {
        name: "Computador",
        price: 2345.67,
        imgUrl: "hhtps://google.com",
      } as Product;

  
      //ACT
      render(<ProductCard product =  {product} />);
  
      // eslint-disable-next-line testing-library/no-debugging-utils
      //screen.debug();
  
      //ASSERT
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByAltText(product.name)).toBeInTheDocument();
      expect(screen.getByText("R$")).toBeInTheDocument();
      expect(screen.getByText("2.345,67")).toBeInTheDocument();
    });
  });