import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const navigate = useNavigate();
  const { products, favorites } = useContext(ProductContext);

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      {/* titolo + tasto back*/}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 text-center flex items-center gap-2">
          Your Favorites 
        </h1>
        <button 
          onClick={() => navigate("/")}
          className="text-indigo-600 hover:underline font-medium"
        >
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
              isSelected={false} 
              onSelect={() => {}} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;