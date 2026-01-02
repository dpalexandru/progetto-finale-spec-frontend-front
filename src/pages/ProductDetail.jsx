import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data.product);
        console.log(data.product)
      } catch (err) {
        setError(err.message);
      }
    };
    fetchSingleProduct();
  }, [id]);

  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!product) return <div className="text-center py-20">Loading product...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 text-indigo-600 hover:underline font-medium"
      >
        ← Back to List
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
        <div className="p-8">
          <span className="text-sm font-bold text-indigo-500 uppercase tracking-widest">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-4">
            {product.title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">Product Details</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li><strong>Brand:</strong> {product.brand}</li>
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Adjustable:</strong> {product.adjustable ? "Yes" : "No"}</li>
                <li><strong>No-Pull:</strong> {product.noPull ? "Yes" : "No"}</li>
                <li><strong>Padded:</strong> {product.padded ? "Yes" : "No"}</li>
                <li>
                <strong>Available Colors:</strong>
                  <div className="inline-flex flex-wrap gap-2 ml-2">
                      {product.color.map((c, index) => (
                        <span key={index} className="text-slate-600">
                          {c}{index < product.color.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>
                </li>
                 <li>
                <strong>Avaibile Sizes: :</strong>
                  <div className="inline-flex flex-wrap gap-2 ml-2">
                      {product.dogSize.map((c, index) => (
                        <span key={index} className="text-slate-600">
                          {c}{index < product.color.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>
                </li>
                <li><strong>Material:</strong> {product.material}</li>
                <li><strong>Rating:</strong> {product.rating} ({product.reviewCount})</li>



              </ul>
            </div>
            
            <div className="flex justify-center items-center">
              <div className="w-48 h-48 md:w-64 md:h-64 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center p-4">
                <img 
                  src={product.amazonImgUrls} 
                  alt={product.title} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
            <div className="mt-8">
                <a 
                  href={product.amazonUrl}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 bg-[#FF9900] hover:bg-[#F38700] text-white font-bold rounded-full shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  <span className="mr-2">🛒</span>
                  Buy on Amazon
                </a>
                
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;