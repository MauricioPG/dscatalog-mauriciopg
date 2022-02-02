import { render, screen } from '@testing-library/react';
import ButtonIcon from '..';

describe('ButtonICon  tests', () => {
  test('ButtonIcon should render button with given text', () => {
    //ARRANGE
    const text = 'Fazer login';

    //ACT
    render(<ButtonIcon text={text} />);

    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();

    //ASSERT
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
