import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isSelected, setIsSelected] = useState(false);

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
            className="p-2 rounded-full border border-slate-200 hover:bg-yellow-50 hover:border-yellow-400 transition-colors group"
            title="Add to favorites">
            <span className="text-xl group-hover:scale-110 inline-block transition-transform">
              ⭐
            </span>
          </button>

          {/*Checkbox/Select per Comparazione */}
          <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all flex-1 justify-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              checked={isSelected}
              onChange={() => setIsSelected(!isSelected)}
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
};

export default ProductCard;
