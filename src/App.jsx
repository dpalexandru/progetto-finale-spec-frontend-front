import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { ProductProvider } from './context/ProductContext';
import CompareProducts from "./pages/CompareProducts";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ProductProvider>
      <Router>
        <Navbar />
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
