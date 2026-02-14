import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import CustomCursor from "./components/CustomCursor";
import { CursorProvider } from "./context/CursorContext";

function App() {
  return (
    <Router>
      <CursorProvider>
        <CustomCursor />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </CursorProvider>
    </Router>
  );
}

export default App;
