import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, useParams } from 'react-router-dom';
import selectEvent from 'react-select-event';
import { ToastContainer } from 'react-toastify';
import history from 'util/history';
import Form from '../Form';
import { productResponse, server } from './fixtures';

beforeAll(() => {
   server.listen();
});

afterEach(() => {
   server.resetHandlers();
});

afterAll(() => {
   server.close();
});

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useParams: jest.fn(),
}));

describe('Product Form create tests', () => {
   beforeEach(() => {
      (useParams as jest.Mock).mockReturnValue({
         productId: 'create',
      });
   });

   test('Should show toast and redirect when submit form correctly', async () => {
      render(
         <Router history={history}>
            <ToastContainer />
            <Form />
         </Router>
      );
      const nameInput = screen.getByTestId('name');
      const priceInput = screen.getByTestId('price');
      const imgUrlInput = screen.getByTestId('imgUrl');
      const descriptionInput = screen.getByTestId('description');
      const categoriesInput = screen.getByLabelText('Categorias');

      const submitButton = screen.getByRole('button', { name: /salvar/i });

      userEvent.type(nameInput, 'Computador');
      userEvent.type(priceInput, '500.12');
      userEvent.type(
         imgUrlInput,
         'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg'
      );
      userEvent.type(descriptionInput, 'La computadora vita');

      await selectEvent.select(categoriesInput, [
         'Eletrônicos',
         'Computadores',
      ]);

      userEvent.click(submitButton);

      await waitFor(() => {
         const toastElement = screen.getByText(
            'Produto cadastrado com sucesso!'
         );
         expect(toastElement).toBeInTheDocument();
      });

      expect(history.location.pathname).toEqual('/admin/products');
   });

   test('Should show 5 validation messages when just click submit', async () => {
      render(
         <Router history={history}>
            <Form />
         </Router>
      );
      const submitButton = screen.getByRole('button', { name: /salvar/i });

      userEvent.click(submitButton);

      await waitFor(() => {
         const messages = screen.getAllByText('Campo obrigatório');

         expect(messages).toHaveLength(5);
      });
   });

   test('Should clear validation messages when filling out the form', async () => {
      render(
         <Router history={history}>
            <Form />
         </Router>
      );
      const submitButton = screen.getByRole('button', { name: /salvar/i });
      userEvent.click(submitButton);

      await waitFor(() => {
         const messages = screen.getAllByText('Campo obrigatório');
         expect(messages).toHaveLength(5);
      });

      const nameInput = screen.getByTestId('name');
      const priceInput = screen.getByTestId('price');
      const imgUrlInput = screen.getByTestId('imgUrl');
      const descriptionInput = screen.getByTestId('description');
      const categoriesInput = screen.getByLabelText('Categorias');

      await selectEvent.select(categoriesInput, [
         'Eletrônicos',
         'Computadores',
      ]);
      userEvent.type(nameInput, 'Computador');
      userEvent.type(priceInput, '500.12');
      userEvent.type(
         imgUrlInput,
         'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg'
      );
      userEvent.type(descriptionInput, 'La computadora vita');

      await waitFor(() => {
         const messages = screen.queryAllByText('Campo obrigatório');
         expect(messages).toHaveLength(0);
      });
   });
});

describe('Product Form update tests', () => {
   beforeEach(() => {
      (useParams as jest.Mock).mockReturnValue({
         productId: '2',
      });
   });

   test('Should show toast and redirect when submit form correctly', async () => {

      render(
         <Router history={history}>
            <ToastContainer />
            <Form />
         </Router>
      );

      await waitFor(() => {
         const nameInput = screen.getByTestId('name');

   
         expect(nameInput).toHaveValue(productResponse.name);

      });

      const priceInput = screen.getByTestId('price');
      const imgUrlInput = screen.getByTestId('imgUrl');
      const descriptionInput = screen.getByTestId('description');
      const formElement = screen.getByTestId("form");

      expect(priceInput).toHaveValue(String(productResponse.price));
      expect(imgUrlInput).toHaveValue(productResponse.imgUrl);
      expect(descriptionInput).toHaveValue(productResponse.description);

      const ids = productResponse.categories.map(x => String(x.id));
      expect(formElement).toHaveFormValues({categories: ids });

      const submitButton = screen.getByRole('button', { name: /salvar/i });
      userEvent.click(submitButton);

      await waitFor(() => {
         const toastElement = screen.getByText(
            'Produto cadastrado com sucesso!'
         );
         expect(toastElement).toBeInTheDocument();
      });
   });
});
