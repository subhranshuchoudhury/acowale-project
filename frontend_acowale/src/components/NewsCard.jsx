import React from "react";
import "../styles/card.css";

const NewsCard = ({ article }) => {
  // Function to generate random color
  const generateRandomColor = () => {
    const colors = [
      // "#FF6B6B",
      "#1E90FF",
      // "#32CD32",
      // "#FF8C00",
      // "#9400D3",
      // "#FFD700",
      "#00CED1",
      // "#FF1493",
      // "#DC143C",
      "#4682B4",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="card" style={{ backgroundColor: generateRandomColor() }}>
      <img src={article.image} alt={article.title} />
      <h2>{article.title}</h2>
      <p>{article?.description?.slice(0, 120)}...</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default NewsCard;
