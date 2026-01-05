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
    <>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-indigo-600 hover:underline font-medium m-5">
        ← Back to List
      </button>
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Comparison Page</h1>
      </div>
    </>
  );
};

export default CompareProducts;
