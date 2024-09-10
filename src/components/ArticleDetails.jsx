import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem('articles')) || [];
    const foundArticle = storedArticles.find(article => article.url === id);
    setArticle(foundArticle);
  }, [id]);

  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <div className="container mt-4 mb-4">
      <div className="card">
        <img 
          src={article.urlToImage || article.image || '/path/to/defaultImage.png'} 
          className="card-img-top" 
          alt={article.title} 
        />
        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.content ? article.content.split('[+')[0] : article.description}</p>
          <p className="card-text">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read the full article
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;