import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

function ProductCard({ product, isSelected, onSelect }) {
  const { favorites, toggleFavorite } = useContext(ProductContext);

  // controllo quali prodotti sono nei favoriti
  const isFav = favorites.includes(product.id);

  return (
    <div
      className={`transition-colors duration-300 ${
        isSelected
          ? "bg-indigo-50 border-indigo-300"
          : "bg-white border-slate-200"
      } border rounded-xl p-4 shadow-sm`}>
      {/* Categoria come span sopra */}
      <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
        {product.category}
      </span>

      {/* Titolo */}
      <h3 className="mt-2 text-xl font-bold text-slate-900">{product.title}</h3>

      {/* Botton card */}
      <div className="mt-4 flex flex-col gap-3">
        {/* Botton Proferiti - Context da gestire */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => toggleFavorite(product.id)}
            className="p-2.5 rounded-full transition-all duration-300 group bg-white border border-slate-100 shadow-sm hover:shadow-md active:scale-125"
            title={isFav ? "Remove from favorites" : "Add to favorites"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-6 h-6 transition-all duration-300 ${
                isFav
                  ? "fill-red-500 stroke-red-500 scale-110"
                  : "fill-transparent stroke-slate-400 group-hover:stroke-red-400"
              }`}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>

          {/*Checkbox/Select per Comparazione */}
          <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all flex-1 justify-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onSelect}
              className="w-4 h-4 text-indigo-600 cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-700">Compare</span>
          </label>
        </div>

        {/* Bottone Pagina Dettaglio */}
        <Link to={`/product/${product.id}`} className="block">
          <button className="w-full bg-indigo-500 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold transition-colors shadow-md active:transform active:scale-95">
            View Full Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
