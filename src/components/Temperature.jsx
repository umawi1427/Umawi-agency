import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Temperature = () => {
  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState('Makkah'); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]); 
  const API_KEY = '5bc901ec34484fbea66202148241009'; 
  const fetchTemperature = async (city) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      setTemperature(response.data.current.temp_c);
      setError('');
    } catch (error) {
      setError('Error fetching temperature data');
    } finally {
      setLoading(false);
    }
  };
  const fetchCitySuggestions = async (query) => {
    try {
      if (query.length > 2) { 
        const response = await axios.get(
          `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
        );
        setSuggestions(response.data);
      } else {
        setSuggestions([]); 
      }
    } catch (error) {
      console.error('Error fetching city suggestions', error);
    }
  };
  useEffect(() => {
    fetchTemperature(city);
  }, [city]);
  const handleCityChange = (e) => {
    const input = e.target.value;
    setCity(input);
    fetchCitySuggestions(input); 
  };
  const handleCitySelect = (city) => {
    setCity(city);
    setSuggestions([]); 
    fetchTemperature(city); 
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTemperature(city);
  };
  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-6">
                <div className="card p-4 shadow">
                    <h2>Current Temperature</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 position-relative">
                        <label htmlFor="city" className="form-label">Enter City</label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={handleCityChange}
                            className="form-control"
                            autoComplete="off"
                        />       
                        {suggestions.length > 0 && (
                          <ul className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
                            {suggestions.map((suggestion) => (
                              <li
                                key={suggestion.id}
                                className="list-group-item list-group-item-action suggestion-item"
                                onClick={() => handleCitySelect(suggestion.name)}
                              >
                                {suggestion.name}, {suggestion.region}, {suggestion.country}
                              </li>
                            ))}
                          </ul>
                        )}
                        </div>
                        <button type="submit" className="btn btn-primary">Get Temperature</button>
                    </form>   
                    {loading ? (
                        <p>Loading temperature...</p>
                    ) : error ? (
                        <p className="text-danger">{error}</p>
                    ) : (
                        <div className="mt-3">
                            <h3>Current temperature in {city}: {temperature}°C</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <style jsx>{`
          .suggestion-item {
            cursor: pointer;
          }
        `}</style>
    </div>
  );
};

export default Temperature;