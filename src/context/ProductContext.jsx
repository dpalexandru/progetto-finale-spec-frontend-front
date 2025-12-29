import React, { createContext, useState, useEffect } from 'react';

// Creiamo il Context
// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

// Componente Provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch locale
        const response = await fetch('http://localhost:3001/products'); 
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Errore recupero dati:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};