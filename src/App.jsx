import { useMemo, useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import Navbar from './components/Navbar.jsx';
import CategoryTabs from './components/CategoryTabs.jsx';
import About from './components/About.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import Reviews from './components/Reviews.jsx';
import Faq from './components/Faq.jsx';
import Footer from './components/Footer.jsx';
import AuthModal from './components/AuthModal.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import { PRODUCTS, CATEGORIES } from './data/products.js';

export default function App() {
  const [category, setCategory] = useState('todos');

  const visibleProducts = useMemo(
    () => (category === 'todos' ? PRODUCTS : PRODUCTS.filter((p) => p.categoria === category)),
    [category]
  );

  const activeLabel = CATEGORIES.find((c) => c.id === category)?.label ?? 'Colección Principal';

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CategoryTabs categories={CATEGORIES} active={category} onChange={setCategory} />
      <main>
        <About />
        <ProductGrid
          title={category === 'todos' ? 'Colección Principal' : activeLabel}
          products={visibleProducts}
        />
        <Reviews />
        <Faq />
      </main>
      <Footer />
      <AuthModal />
      <CartDrawer />
    </>
  );
}
