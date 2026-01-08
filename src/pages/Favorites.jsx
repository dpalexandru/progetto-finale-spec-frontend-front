import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const navigate = useNavigate();
  const { products, favorites } = useContext(ProductContext);
  const [selectedIds, setSelectedIds] = useState([]);
  const [warning, setWarning] = useState(false);

  // Funzione per gestire la selezione (se clicco la stessa, si deseleziona)
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

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <>
      {/* Messaggio di avviso in caso si tenti di selezionare piu di due elementi */}
      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          warning
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}>
        <div className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
          <span>⚠️</span>
          <p className="text-sm font-medium">You can only compare 2 items</p>
        </div>
      </div>

      {/* tasto compare  */}

      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
          selectedIds.length === 2
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}>
        <Link
          to={`/compare/${selectedIds[0]}/${selectedIds[1]}`}
          className="bg-indigo-600 text-white px-8 py-4 rounded-full shadow-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
          Compare
        </Link>
      </div>

      <div className="max-w-6xl mx-auto p-6 min-h-screen">
        {/* titolo + tasto back*/}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 text-center flex items-center gap-2">
            Your Favorites
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-indigo-600 hover:underline font-medium">
            ← Back to Shop
          </button>
        </div>

        {/* senza favoriti mostra messaggio */}
        {favoriteProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-20 text-center">
            <p className="text-slate-500 text-lg">
              Your favorite list is empty.
              <br />
              Go back to the home to add some harnesses!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedIds.includes(product.id)}
                onSelect={() => handleSelect(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
