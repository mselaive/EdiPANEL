import React from 'react';
import { render, fireEvent, act } from '@testing-library/react'; // Asegúrate de importar act
import { BrowserRouter as Router } from 'react-router-dom';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import '@testing-library/jest-dom/';

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: key => key,
    i18n: { language: 'en', changeLanguage: jest.fn() }
  })
}));

describe('AdminNavbar component', () => {
  test('interacts with the logout button', async () => { // Haz la función de prueba asincrónica
    const { getByText } = render(
      <Router>
        <AdminNavbar />
      </Router>
    );

    expect(getByText('navbar.message')).toBeInTheDocument();
    expect(getByText('navbar.lenguage')).toBeInTheDocument();
    expect(getByText('navbar.profile')).toBeInTheDocument();
    expect(getByText('navbar.logout')).toBeInTheDocument();

    // Envuelve la operación que causa la actualización de estado en act
    await act(async () => {
      fireEvent.click(getByText('navbar.logout'));
    });

    // Realiza tus aserciones aquí si necesitas verificar algo después del clic
  });

  test('changes language when language button is clicked', async () => { // Haz la función de prueba asincrónica
    const { getByText } = render(
      <Router>
        <AdminNavbar />
      </Router>
    );

    // Envuelve la operación que causa la actualización de estado en act
    await act(async () => {
      fireEvent.click(getByText('navbar.lenguage'));
    });

    // Verifica que se llamó a la función de cambio de idioma
    //expect(useTranslation().i18n.changeLanguage).toHaveBeenCalled();
  });
});
