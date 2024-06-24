import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Frecuent_visit from 'views/examples/Frecuent_visits';

jest.mock('axios');

describe('Frecuent_visit component', () => {
  test('renders form, fills placeholders, submits form, and checks for alert', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Frecuent_visit />);

    // Verificar la existencia de los placeholders
    expect(getByPlaceholderText('index.commun-title')).toBeInTheDocument();
    expect(getByPlaceholderText('12345678-9')).toBeInTheDocument();
    expect(getByPlaceholderText('form.building')).toBeInTheDocument();
    expect(getByPlaceholderText('form.apartment')).toBeInTheDocument();
    expect(getByPlaceholderText('form.patent')).toBeInTheDocument();

    // Verificar la existencia del botón de submit
    expect(getByText('form.register')).toBeInTheDocument();

    // Rellenar los placeholders con valores específicos
    fireEvent.change(getByPlaceholderText('index.commun-title'), { target: { value: 'Alfredo Camilo' } });
    fireEvent.change(getByPlaceholderText('12345678-9'), { target: { value: '19806166-6' } });
    fireEvent.change(getByPlaceholderText('form.building'), { target: { value: 'A' } });
    fireEvent.change(getByPlaceholderText('form.apartment'), { target: { value: '105' } });
    fireEvent.change(getByPlaceholderText('form.patent'), { target: { value: 'KLLR41' } });

    // Verificar que los valores se hayan rellenado correctamente
    expect(getByPlaceholderText('index.commun-title')).toHaveValue('Alfredo Camilo');
    expect(getByPlaceholderText('12345678-9')).toHaveValue('19806166-6');
    expect(getByPlaceholderText('form.building')).toHaveValue('A');
    expect(getByPlaceholderText('form.apartment')).toHaveValue(105);
    expect(getByPlaceholderText('form.patent')).toHaveValue('KLLR41');

    // Simular clic en el botón de registro
    fireEvent.click(getByText('form.register'));
    console.log('Se ha hecho clic en el botón de registro');
  });
});



// Segundo test

describe('Frecuent_visit component', () => {
  test('submits form and checks API calls', async () => {
    const formData = {
      name: 'Alfredo Camilo',
      rut: '19806166-6',
      building: 'A',
      apartment: '105',
      patent: 'KLLR41',
    };

    // Mock de fetch para simular las llamadas a la API
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

    const { getByText, getByPlaceholderText } = render(<Frecuent_visit />);

    fireEvent.change(getByPlaceholderText('index.commun-title'), { target: { value: formData.name } });
    fireEvent.change(getByPlaceholderText('12345678-9'), { target: { value: formData.rut } });
    fireEvent.change(getByPlaceholderText('form.building'), { target: { value: formData.building } });
    fireEvent.change(getByPlaceholderText('form.apartment'), { target: { value: formData.apartment } });
    fireEvent.change(getByPlaceholderText('form.patent'), { target: { value: formData.patent } });

    fireEvent.click(getByText('form.register'));

    // Esperar a que se realicen las llamadas a la API
    await waitFor(() => {
      // Verificar que se realizaron llamadas a las URLs específicas
      expect(global.fetch).toHaveBeenCalledWith('https://edipanelvercel.vercel.app/api/getfrequentvisits');
      expect(global.fetch).toHaveBeenCalledWith('https://edipanelvercel.vercel.app/api/getapartments');
    });
  });
});


