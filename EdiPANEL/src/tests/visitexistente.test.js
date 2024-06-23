import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/Footers/AdminFooter';

describe('Footer component', () => {
  test('renders footer with copyright text and link', () => {
    const { getByText, getByRole } = render(<Footer />);

    // Año actual para hacer la prueba más flexible
    const currentYear = new Date().getFullYear();

    // Usar expresión regular para buscar el texto de copyright
    const copyrightText = getByText(
      (content, node) => {
        const hasText = (node) => node.textContent === `© ${currentYear} EdiPanel`;
        const nodeHasText = hasText(node);
        // Recorrer cada nodo hijo para verificar si alguno cumple con el criterio
        const childrenDontHaveText = Array.from(node.children).every(
          (child) => !hasText(child)
        );
        return nodeHasText && childrenDontHaveText;
      },
      { exact: false } // Permite coincidencias parciales
    );

    // Asegurarse de que el texto de copyright se encuentre
    expect(
      copyrightText
    ).toBeInTheDocument();

    // Verificar que el enlace al sitio web esté presente y tenga las propiedades correctas
    const linkElement = getByRole('link', { name: /EdiPanel/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://youtube.com');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

