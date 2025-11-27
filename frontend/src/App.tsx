import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<ProductList />} />
      {/* Add route for editing a product for completeness */}
      <Route path="/products/edit/:id" element={<ProductForm />} />
    </Routes>
  );
}

export default App;
