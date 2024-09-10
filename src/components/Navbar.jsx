import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <>
    <br/>
    <nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
      <Link className="navbar-brand mr-3" to="/"><div id="chevron-arrow-right"></div> Home</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link mx-2" to="/news">Daily News</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-2" to="/currencyconverter">Currency Converter</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-2" to="/bmi">BMI Calculator</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-2" to="/timezone-converter">Time Zones</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-2" to="/temperature">Temperature</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-2" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-2" to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
};

export default Navbar;