import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Categoria come span sopra */}
      <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
        {product.category}
      </span>
      
      {/* Titolo */}
      <h3 className="mt-2 text-xl font-bold text-slate-900">
        {product.title}
      </h3>

      {/* Bottone non funzionante oer ora  */}
      <div className="mt-6 pt-6 border-t border-slate-50">
        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
          View Details →
        </button>
      </div>
    </div>
  );
};

export default ProductCard;