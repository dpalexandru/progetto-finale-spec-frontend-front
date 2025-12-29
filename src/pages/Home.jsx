import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

function Home() {
  // stati
  const [search, setSearch] = useState("");

  // recupero i dati
  const { products } = useContext(ProductContext);

  // articoli filtrati
  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

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

        {/* main */}
        <main>
          {/* barra di ricerca */}
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder="Search by title..."
              className="p-2 border rounded-lg w-full max-w-md shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Map prodotti in crd*/}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
