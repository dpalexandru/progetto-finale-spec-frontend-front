import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CompareProducts = () => {
  // Recuperiamo i parametri definiti nella rotta (id1 e id2)
  const { id1, id2 } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID Prodotto 1:", id1);
    console.log("ID Prodotto 2:", id2);
  }, [id1, id2]);

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
