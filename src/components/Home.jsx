import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Welcome to Your Daily Essentials Hub!</h1>
        <p className="text-center mb-5">At [Your Website Name], we provide a comprehensive suite of tools and information to simplify your daily life. Explore our features designed to keep you informed, healthy, and connected:</p>

        <div className="row text-center mb-4">
          <div className="col-md-4 mb-4 d-flex align-items-stretch">
            <Link to="/news" className="text-decoration-none flex-fill">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🗞️ Daily News</h5>
                  <p className="card-text">Stay up-to-date with the latest headlines and breaking news from around the world. Our curated news feed ensures you never miss important updates on topics that matter most to you.</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-4 mb-4 d-flex align-items-stretch">
            <Link to="/bmi" className="text-decoration-none flex-fill">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">📏 BMI Calculator</h5>
                  <p className="card-text">Monitor your health effortlessly with our easy-to-use BMI calculator. Simply input your height and weight to get instant feedback on your body mass index and maintain a healthier lifestyle.</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-4 mb-4 d-flex align-items-stretch">
            <Link to="/currencyconverter" className="text-decoration-none flex-fill">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">💱 Currency Converter</h5>
                  <p className="card-text">Travel smarter and make informed financial decisions with our currency converter. Convert between different currencies in real-time and get accurate exchange rates to help you manage your finances wherever you are.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="row text-center mb-4">
          <div className="col-md-4 mb-4 d-flex align-items-stretch">
            <Link to="/timezone-converter" className="text-decoration-none flex-fill">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🌍 Time Zone Calculator</h5>
                  <p className="card-text">Plan your calls and meetings with ease using our time zone calculator. Whether you're coordinating across continents or simply figuring out the best time to connect, our tool makes time zone differences a breeze.</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-4 mb-4 d-flex align-items-stretch">
            <Link to="/temperature" className="text-decoration-none flex-fill">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🌡️ Temperature Converter</h5>
                  <p className="card-text">Switch between Celsius and Fahrenheit with our temperature converter. Perfect for travelers and anyone needing quick temperature conversions for everyday use.</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-4 mb-4 d-flex align-items-stretch">
            <Link to="/contact" className="text-decoration-none flex-fill">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">✉️ Contact Us</h5>
                  <p className="card-text">Have questions or feedback? Reach out to us via our contact page. We're here to assist you with any inquiries or support you may need.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <footer className="text-center py-3 mt-4" style={{ marginBottom: '20px' }}>
        <p>&copy; 2024 Umawi Agency. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;