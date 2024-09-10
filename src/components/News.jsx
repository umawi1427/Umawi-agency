import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultImage from '../Designer.png';

const News = ({ updateArticles }) => {
  const [articles, setArticles] = useState(() => {
    const savedArticles = localStorage.getItem('articles');
    return savedArticles ? JSON.parse(savedArticles) : [];
  });
  const [displayedArticlesCount, setDisplayedArticlesCount] = useState(9);

  const mediastackApiKey = 'd68dc6ed4d6a30fbae1fdcac0e9f6522';
  const mediastackApiUrl = `http://api.mediastack.com/v1/news?access_key=${mediastackApiKey}&countries=us`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const mediastackApiResponse = await fetch(mediastackApiUrl);
        if (!mediastackApiResponse.ok) {
          throw new Error(`HTTP error! status: ${mediastackApiResponse.status}`);
        }
        const mediastackApiData = await mediastackApiResponse.json();

        const combinedArticles = [...articles, ...mediastackApiData.data];
        const uniqueArticles = combinedArticles.filter((article, index, self) =>
          index === self.findIndex((t) => t.url === article.url)
        );

        setArticles(uniqueArticles);
        updateArticles(uniqueArticles);

        localStorage.setItem('articles', JSON.stringify(uniqueArticles));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
    const intervalId = setInterval(fetchNews, 60000);

    return () => clearInterval(intervalId);
  }, [mediastackApiUrl, updateArticles, articles]);

  const handleLoadMore = () => {
    setDisplayedArticlesCount((prevCount) => prevCount + 9);
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="row align-items-center justify-content-center">
        {articles.length === 0 ? (
          <div className="text-center">
            <p>Loading...</p>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          articles.slice(0, displayedArticlesCount).map((article, index) => (
            article.title === '[Removed]' ? null : (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={article.image || article.urlToImage || article.image_url || defaultImage}
                    className="card-img-top"
                    alt={article.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.description}</p>
                    <Link to={`/article/${encodeURIComponent(article.url)}`} className="btn btn-primary">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            )
          ))
        )}
      </div>
      {articles.length > displayedArticlesCount && (
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default News;