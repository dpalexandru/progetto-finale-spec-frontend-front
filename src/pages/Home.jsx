import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function Home() {
  // stati
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
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

  // recupero i dati
  const { products, error } = useContext(ProductContext);

  useEffect(() => {
    console.log(products);
  }, [products]);

  // articoli filtrati
  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category ? p.category === category : true))
    .sort((a, b) => {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });

  return (
    <>
      {/* Messaggio di avviso in caso si tenti di selezionare piu di due elementi */}
      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          warning
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}>
        <div className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl border border-slate-700 flex items-center gap-3">
          <span className="text-yellow-400">⚠️</span>
          <p className="text-sm font-medium">
            You can only compare 2 items at a time
          </p>
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
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-bold tracking-wide transform transition-transform hover:scale-105 active:scale-95 border-2 border-white/20 backdrop-blur-sm">
          Compare
        </Link>
      </div>

      <div className="min-h-screen bg-gray-50">
        <header className="py-5">
          <h1 className="text-center text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900">
            Dog Harness <span className="text-indigo-600">Comparison Tool</span>
          </h1>
          <p className="text-center text-slate-600 max-w-2xl mx-auto text-lg">
            Select and <span className="text-indigo-600">Compare</span> the best
            dog harnesses and find the perfect fit.{" "}
          </p>
        </header>

        {/* M A I N */}
        <main>
          {/* Mostra l'errore se esiste della chiamata api */}
          {error && (
            <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center max-w-md mx-auto">
              <strong>Error:</strong> {error}. Please check if the server is
              running.
            </div>
          )}

          {/* barra di ricerca + select categoria */}

          <div className="max-w-3xl mx-auto mb-10 flex flex-col md:flex-row gap-4 items-center justify-center">
            <select
              className="p-2 border rounded-lg bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setCategory(e.target.value)}>
              <option value="">All</option>
              <option value="harness">Harness</option>
              <option value="collar">Collar</option>
            </select>

            <div className=" flex justify-center">
              <input
                type="text"
                placeholder="Search by title..."
                className="p-2 border rounded-lg w-full max-w-md shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="w-full md:w-40">
              <select
                className="w-full p-2.5 border border-slate-200 rounded-lg bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer text-slate-700 transition-all"
                onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Title: A to Z</option>
                <option value="desc">Title: Z to A</option>
              </select>
            </div>
          </div>

          {/* Map prodotti in crd*/}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                isSelected={selectedIds.includes(item.id)}
                onSelect={() => handleSelect(item.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
