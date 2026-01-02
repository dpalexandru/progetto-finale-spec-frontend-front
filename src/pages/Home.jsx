import React, { useContext, useState,useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

function Home() {
  // stati
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("")
  const [sortOrder, setSortOrder] = useState("asc") 

  // recupero i dati
  const { products, error } = useContext(ProductContext);

useEffect(() => {
console.log(products)
}, [products])


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
      <div className="min-h-screen bg-gray-50">
        <header className="py-5">
          <h1 className="text-center text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900">
            Dog Harness <span className="text-indigo-600">Comparison Tool</span>
          </h1>
          <p className="text-center text-slate-600 max-w-2xl mx-auto text-lg">
            Select and <span className="text-indigo-600">Compare</span> the best dog harnesses and find the perfect fit.{" "}
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
              onChange={(e) => setCategory(e.target.value)}
            >
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
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Title: A to Z</option>
              <option value="desc">Title: Z to A</option>
            </select>
          </div>

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
