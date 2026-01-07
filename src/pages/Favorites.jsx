import React from "react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      {/* Header Pagina */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Your Favorites</h1>
        <button 
          onClick={() => navigate("/")}
          className="text-indigo-600 hover:underline font-medium"
        >
          Back to Shop
        </button>
      </div>

      {/* cpntenitore */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-20 text-center">
        <p className="text-slate-500 text-lg">
          Your favorite list is empty. 
          <br /> 
          Go back to the home to add some harnesses!
        </p>
      </div>
    </div>
  );
};

export default Favorites;