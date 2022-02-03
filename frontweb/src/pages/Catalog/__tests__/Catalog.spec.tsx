/* eslint-disable testing-library/no-debugging-utils */
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import history from 'util/history';
import Catalog from '..';

describe('Catalog  tests', () => {
   test('Shoul render Catalog with products', async () => {
      //ARRANGE

      //ACT
      render(
         <Router history={history}>
            <Catalog />
         </Router>
      );

      //screen.debug();

      //ASSERT
      expect(screen.getByText('Catálogo de produtos')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('Smart TV')).toBeInTheDocument()
      });
      
   });
});
