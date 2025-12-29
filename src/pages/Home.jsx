import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

function Home() {
  // recupero i dati
  const { products } = useContext(ProductContext);

  // Console log dati quando arrivano - test poi map
  useEffect(() => {
    if (products.length > 0) {
      console.log("Dati ricevuti con successo:", products);
    }
  }, [products]);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <header className="py-12">
          <h1 className="text-center text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900">
            Dog Harness <span className="text-indigo-600">Comparison Tool</span>
          </h1>
          <p className="text-center text-slate-600 max-w-2xl mx-auto text-lg">
            Compare the best dog harnesses and find the perfect fit.{" "}
          </p>
        </header>

        {/* Main*/}
        {/* Map prodotti in crd*/}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
