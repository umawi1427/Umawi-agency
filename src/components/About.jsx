import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">About Us</h2>
              <p className="card-text">
                Welcome to our website! We are dedicated to providing the best service possible.
              </p>
              <p className="card-text">
                Our team is composed of experienced professionals who are passionate about what they do.
              </p>
              <p className="card-text">
                We believe in quality, integrity, and customer satisfaction. Thank you for visiting our site!
              </p>
              <h3 className="card-subtitle mb-2 text-muted">Creator: Umawi</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;