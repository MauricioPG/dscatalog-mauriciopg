import { render, screen } from "@testing-library/react";
import ProductPrice from "..";


describe('ProductPrice  tests', () => {
    test('Should render ProductPrice', () => {
      //ARRANGE
      const value = 10.7;
  
      //ACT
      render(<ProductPrice price = {value} />);
  
      // eslint-disable-next-line testing-library/no-debugging-utils
      //screen.debug();
  
      //ASSERT
      expect(screen.getByText("R$")).toBeInTheDocument();
      expect(screen.getByText("10,70")).toBeInTheDocument();
    });
  });