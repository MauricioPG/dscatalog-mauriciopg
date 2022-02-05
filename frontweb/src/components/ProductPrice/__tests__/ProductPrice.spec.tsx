import { render, screen } from "@testing-library/react";
import ProductPrice from "..";


describe('ProductPrice  tests', () => {
    test('Should render ProductPrice', () => {
      const value = 10.7;
  
      render(<ProductPrice price = {value} />);

      expect(screen.getByText("R$")).toBeInTheDocument();
      expect(screen.getByText("10,70")).toBeInTheDocument();
    });
  });