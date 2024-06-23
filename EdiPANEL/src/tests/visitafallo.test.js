import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Frecuent_visit from 'views/examples/Frecuent_visits';

describe('Frecuent_visit component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({})
    });
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restaurar todos los mocks después de cada prueba
  });

  test('shows error in console when network response is not ok', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { getByText, getByPlaceholderText } = render(<Frecuent_visit />);

    fireEvent.change(getByPlaceholderText('index.commun-title'), { target: { value: 'Alfredo Camilo' } });
    fireEvent.change(getByPlaceholderText('12345678-9'), { target: { value: '19806166-6' } });
    fireEvent.change(getByPlaceholderText('form.building'), { target: { value: 'A' } });

    fireEvent.change(getByPlaceholderText('form.patent'), { target: { value: 'KLLR41' } });

    fireEvent.click(getByText('form.register'));

    global.fetch = jest.fn((url) => {
      if (url === 'https://edipanelvercel.vercel.app/api/getfrequentvisits' || 
          url === 'https://edipanelvercel.vercel.app/api/getapartments') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: 'Success' }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'User created successfully' }),
      });
    });

    // Verificar que el mensaje de error se haya mostrado en la consola
    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith('There was an error!', expect.any(Error));
    });

    // Restaurar console.error después de la prueba
    consoleErrorMock.mockRestore();
  });
});
