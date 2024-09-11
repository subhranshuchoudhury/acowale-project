import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/news.css";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [country, setCountry] = useState("us");
  const [searchTerm, setSearchTerm] = useState("");
  const [languageTerm, setlanguageTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  const articlesPerPage = 10; // Number of articles per page

  // List of countries for GNews
  const countryList = [
    { code: "us", name: "United States" },
    { code: "in", name: "India" },
    { code: "gb", name: "United Kingdom" },
    { code: "ca", name: "Canada" },
    { code: "au", name: "Australia" },
    { code: "cn", name: "China" },
    // Add more countries as needed
  ];

  const languageList = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "nl", name: "Dutch" },
    { code: "no", name: "Norwegian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "se", name: "Swedish" },
    { code: "zh", name: "Chinese" },
  ];

  // Fetch news from GNews API
  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_API
        }/api/news?&country=${country}&q=${searchTerm}&max=${articlesPerPage}&page=${page}&lang=${languageTerm}`
      );
      setArticles(response.data.articles);
      const totalResults = response.data.totalArticles;
      setTotalPages(Math.ceil(totalResults / articlesPerPage));
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [country, searchTerm, page, languageTerm]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="news-container">
          {/* Header with country selector and search bar */}
          <div className="header">
            <h1>Latest News</h1>
            <div className="options">
              {/* Country Selector */}
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countryList.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <select
                value={languageTerm}
                onChange={(e) => setlanguageTerm(e.target.value)}
              >
                {languageList.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              {/* Search Input */}
              <input
                type="search"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* News Grid */}
          {!loading && (
            <>
              <div className="news-grid">
                {articles.map((article, index) => (
                  <NewsCard key={index} article={article} />
                ))}
              </div>

              {/* Pagination */}
              <div className="pagination">
                <button
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default News;
