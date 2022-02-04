import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '..';

describe('Pagination  tests', () => {
  test('Should Render Pagination', () => {
    //ARRANGE
    const pageCount = 3;
    const range = 3;

    //ACT
    render(<Pagination pageCount={pageCount} range={range} />);

    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();

    //ASSERT

    const page1 = screen.getByText('1');
    const page2 = screen.getByText('2');
    const page3 = screen.getByText('3');
    const page4 = screen.queryByText('4');

    expect(page1).toBeInTheDocument();
    expect(page1).toHaveClass('pagination-link-active');

    expect(page2).toBeInTheDocument();
    expect(page2).not.toHaveClass('pagination-link-active');

    expect(page3).toBeInTheDocument();
    expect(page3).not.toHaveClass('pagination-link-active');

    expect(page4).not.toBeInTheDocument();
  });

  test('Next arrow should be called onChange', () => {
    //ARRANGE
    const pageCount = 3;
    const range = 3;
    const onChange = jest.fn();

    //ACT
    render(
      <Pagination pageCount={pageCount} range={range} onChange={onChange} />
    );

    const arrowNext = screen.getByTestId("arrow-next");

    userEvent.click(arrowNext);

    // chamando a segunda bolinha, a primeira e 0 (zero)
    expect(onChange).toHaveBeenCalledWith(1);
  });

  test('Previous arrow should be called onChange', () => {
    //ARRANGE
    const forcePage = 1;
    const pageCount = 3;
    const range = 3;
    const onChange = jest.fn();

    //ACT
    render(
      <Pagination forcePage = {forcePage} pageCount={pageCount} range={range} onChange={onChange} />
    );

    const arrowPrevious = screen.getByTestId("arrow-previous");

    userEvent.click(arrowPrevious);

    expect(onChange).toHaveBeenCalledWith(0);
  });

  test('Page Link should call onChange', () => {
    //ARRANGE
    const pageCount = 3;
    const range = 3;
    const onChange = jest.fn();

    //ACT
    render(
      <Pagination pageCount={pageCount} range={range} onChange={onChange} />
    );

    const page2 = screen.getByText('2');

    userEvent.click(page2);

    // chamando a segunda bolinha, a primeira e 0 (zero)
    expect(onChange).toHaveBeenCalledWith(1);
  });
});