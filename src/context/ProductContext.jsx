import React, { createContext, useState, useEffect } from "react";

// Creiamo il Context
// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

// Componente Provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  //salvo favorites direttamente in local storage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("harness_favs");
    return saved ? JSON.parse(saved) : [];
  });

  // logica selezione favoriti globale
  const [selectedIds, setSelectedIds] = useState([]);
  const [warning, setWarning] = useState(false);

  const handleSelect = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 2) {
        setWarning(true);
        setTimeout(() => setWarning(false), 2000);
        return prev;
      }
      return [...prev, id];
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch locale
        const response = await fetch("http://localhost:3001/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProducts();
  }, []);

  // aggiungi togli preferito
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // modifica in local storage quando cambiano
  useEffect(() => {
    localStorage.setItem("harness_favs", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <ProductContext.Provider
      value={{
        products,
        error,
        favorites,
        toggleFavorite,
        selectedIds, 
        handleSelect, 
        warning,
      }}>
      {" "}
      {children}
    </ProductContext.Provider>
  );
};
