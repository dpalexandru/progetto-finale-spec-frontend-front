import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { ProductProvider } from './context/ProductContext';
import CompareProducts from "./pages/CompareProducts";

function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/compare/:id1/:id2" element={<CompareProducts />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;
