import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/about";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Blog1 from "./pages/Blog1";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/privacy">Privacy</Link>
      <Link to="/terms">Terms</Link>
      <Link to="/blog1">Blog</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/blog1" element={<Blog1 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
