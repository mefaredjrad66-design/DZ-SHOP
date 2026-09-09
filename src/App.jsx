// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext.jsx';
import Navbar from './components/Navbar.jsx';
import Accueil from './pages/Accueil.jsx';
import Produits from './pages/Produits.jsx';
import ProduitDetails from './pages/ProduitDetails.jsx';
import Panier from './pages/Panier.jsx';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/produits" element={<Produits />} />
            <Route path="/produit/:id" element={<ProduitDetails />} />
            <Route path="/panier" element={<Panier />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
