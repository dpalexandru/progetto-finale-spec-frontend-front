import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CompareProducts = () => {
  // Recuperiamo i parametri definiti nella rotta (id1 e id2)
  const { id1, id2 } = useParams();
  const navigate = useNavigate();


  //stati 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 


  // use effect con promise all per due chiamate in contemporanea 
useEffect(() => {
    const fetchBothProducts = async () => {
      setLoading(true);
      try {
        // Promise.all lancia le chiamate in parallelo
        const [res1, res2] = await Promise.all([
          fetch(`http://localhost:3001/products/${id1}`),
          fetch(`http://localhost:3001/products/${id2}`)
        ]);

        if (!res1.ok || !res2.ok) throw new Error("products not found");

        const data1 = await res1.json();
        const data2 = await res2.json();
        setProducts([data1.product, data2.product]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBothProducts();
  }, [id1, id2]);

// controllo dati in console
  useEffect(() => {
  if (products.length > 0) {
    console.log("Prodotti:", products);
  }
}, [products]); 


   //loading e error fetch
  if (loading) return <div className="p-20 text-center font-bold text-indigo-600">Loading comparison...</div>;
  if (error) return <div className="p-20 text-center text-red-500 font-bold">Error: {error}</div>;

return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      {/* Header coerente con ProductDetail */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-indigo-600 hover:underline font-medium flex items-center gap-2"
      >
        <span className="text-xl">←</span> Back to List
      </button>

      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
        Comparison Tool
      </h1>

      {/* Container Tabella con lo stesso stile del ProductDetail */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="bg-slate-50/50">
              {/* Colonna Etichette */}
              <th className="w-[25%] p-4 text-left text-[10px] uppercase tracking-widest text-slate-400 font-bold border-b border-slate-100">
                Features
              </th>
              {/* Colonne Prodotti  */}
              {products.map((p) => (
                <th key={p.id} className="w-[37.5%] p-4 border-b border-l border-slate-100">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 md:w-32 md:h-32 bg-white rounded-xl border border-slate-100 flex items-center justify-center p-2 mb-3 shadow-sm">
                      <img 
                        src={p.amazonImgUrls} 
                        alt="" 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <h2 className="text-[11px] md:text-sm font-bold text-slate-800 line-clamp-2 leading-tight text-center">
                      {p.title}
                    </h2>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-[12px] md:text-sm text-slate-600">
            {/* RIGA BRAND */}
            <tr className="border-b border-slate-50">
              <td className="p-4 font-bold text-slate-800 bg-slate-50/30">Brand</td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-center border-l border-slate-50 font-medium">
                  {p.brand}
                </td>
              ))}
            </tr>

            {/* RIGA CATEGORIA */}
            <tr className="border-b border-slate-50">
              <td className="p-4 font-bold text-slate-800 bg-slate-50/30">Category</td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-center border-l border-slate-50 font-bold text-indigo-500 uppercase text-[10px]">
                  {p.category}
                </td>
              ))}
            </tr>

            {/* RIGA MATERIALE */}
            <tr className="border-b border-slate-50">
              <td className="p-4 font-bold text-slate-800 bg-slate-50/30">Material</td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-center border-l border-slate-50 italic">
                  {p.material}
                </td>
              ))}
            </tr>

            {/* RIGA CARATTERISTICHE (Bool) */}
            <tr className="border-b border-slate-50">
              <td className="p-4 font-bold text-slate-800 bg-slate-50/30">Padded</td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-center border-l border-slate-50 text-lg">
                  {p.padded ? "Yes" : "No"}
                </td>
              ))}
            </tr>

            <tr className="border-b border-slate-50">
              <td className="p-4 font-bold text-slate-800 bg-slate-50/30">Adjustable</td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-center border-l border-slate-50 text-lg">
                  {p.adjustable ? "Yes" : "No"}
                </td>
              ))}
            </tr>

                <tr className="border-b border-slate-50">
              <td className="p-4 font-bold text-slate-800 bg-slate-50/30">No-Pull</td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-center border-l border-slate-50 text-lg">
                  {p.noPull ? "Yes" : "No"}
                </td>
              ))}
            </tr>

            {/* colori */}
            <tr className="border-b border-slate-50">
              <td className="p-4 font-bold text-slate-800 bg-slate-50/30">Colors</td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-center border-l border-slate-50">
                  <div className="flex flex-wrap justify-center gap-1">
                    {p.color?.map((c, i) => (
                      <span key={i} className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 uppercase font-semibold">
                        {c}
                      </span>
                    ))}
                    {p.color?.length > 3 && <span className="text-[9px] text-slate-400">+{p.color.length - 3}</span>}
                  </div>
                </td>
              ))}
            </tr>

            {/* taglie */}

               <tr className="border-b border-slate-50">
              <td className="p-4 font-bold text-slate-800 bg-slate-50/30">Sizes</td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-center border-l border-slate-50">
                  <div className="flex flex-wrap justify-center gap-1">
                    {p.dogSize?.map((c, i) => (
                      <span key={i} className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 uppercase font-semibold">
                        {c}
                      </span>
                    ))}
                    {p.color?.length > 3 && <span className="text-[9px] text-slate-400">+{p.color.length - 3}</span>}
                  </div>
                </td>
              ))}
            </tr>

            {/* rating */}
            <tr className="border-b border-slate-50">
              <td className="p-4 font-bold text-slate-800 bg-slate-50/30">Rating</td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-center border-l border-slate-50">
                  <span className="font-bold text-yellow-500">⭐ {p.rating}</span>
                  <p className="text-[10px] text-slate-400">({p.reviewCount} reviews)</p>
                </td>
              ))}
            </tr>

            {/* bottone compra*/}
            <tr>
              <td className="p-4 font-bold text-slate-800 bg-slate-50/30 italic">Store</td>
              {products.map(p => (
                <td key={p.id} className="p-4 text-center border-l border-slate-50">
                  <a 
                    href={p.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-[#FF9900] hover:bg-[#F38700] text-white font-bold py-2 px-4 rounded-full shadow-sm text-[10px] md:text-xs transition-transform active:scale-95"
                  >
                    BUY
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareProducts;
