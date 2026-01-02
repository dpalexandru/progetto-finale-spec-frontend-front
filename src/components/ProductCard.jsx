import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Categoria come span sopra */}
      <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
        {product.category}
      </span>
      
      {/* Titolo */}
      <h3 className="mt-2 text-xl font-bold text-slate-900">
        {product.title}
      </h3>

      {/* Botton:  detteglio + compara */}
      <Link to={`/product/${product.id}`} className="block">
        <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg">
          View Full Details
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;