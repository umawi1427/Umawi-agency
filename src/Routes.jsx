import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import News from './components/News';
import ArticleDetails from './components/ArticleDetails';
import CurrencyConverter from './components/CurrencyConverter';
import BMI from './components/BMI';
import TimeZoneConverter from './components/TimeZoneConverter';
import Temperature from './components/Temperature';

const AppRoutes = () => {
  const [articles, setArticles] = useState([]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News updateArticles={setArticles} />} />
        <Route path="/article/:id" element={<ArticleDetails articles={articles} />} />
        <Route path="/currencyconverter" element={<CurrencyConverter />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/timezone-converter" element={<TimeZoneConverter />} />
        <Route path="/temperature" element={<Temperature />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;