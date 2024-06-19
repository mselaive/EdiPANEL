import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form_delivery from '../views/examples/Form_delivery';

jest.mock('axios');

test('renders form delivery component', () => {
  const { getByPlaceholderText, getByText } = render(<Form_delivery />);

  expect(getByText('form.form-title4')).toBeInTheDocument();
  expect(getByPlaceholderText('form.building')).toBeInTheDocument();
  expect(getByPlaceholderText('form.apartment')).toBeInTheDocument();
  expect(getByText('form.search')).toBeInTheDocument();
});

describe('Form_delivery component', () => {
  test('handles form submission successfully and checks for Carlos Serra', async () => {
    const mockResidentData = [
      { resident_name: 'John Doe', email: 'john.doe@example.com', whatsapp: '+123456789' },
      { resident_name: 'Carlos Serra', email: 'carlos.serra@gmail.com', whatsapp: '+987654321' },
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResidentData),
    });

    const { getByPlaceholderText, getByText, getByLabelText, queryByText } = render(<Form_delivery />);

    fireEvent.change(getByPlaceholderText('form.building'), { target: { value: 'A' } });
    fireEvent.change(getByPlaceholderText('form.apartment'), { target: { value: '101' } });
    fireEvent.click(getByText('form.search'));

    // Esperar hasta que se carguen los datos y se actualice el DOM
    await waitFor(() => {
      const carlosSerraOption = queryByText('Carlos Serra');
      expect(carlosSerraOption).toBeInTheDocument();

      // Verificar que las checkboxes se puedan clickear
      const checkbox1 = getByLabelText('form.mail');
      const checkbox2 = getByLabelText('form.wsp');
      
      fireEvent.click(checkbox1);
      fireEvent.click(checkbox2);

      // Verificar que ambas checkboxes se hayan clickeado correctamente
      expect(checkbox1).toBeChecked();
      expect(checkbox2).toBeChecked();
    });
  });
});
