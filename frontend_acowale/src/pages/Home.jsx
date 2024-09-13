import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/news.css";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [country, setCountry] = useState("us");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Debounced search term
  const [languageTerm, setLanguageTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  const articlesPerPage = 10; // Number of articles per page

  // Cache object to store API responses for faster access
  const cache = {};

  const countryList = [
    { code: "us", name: "United States" },
    { code: "in", name: "India" },
    { code: "gb", name: "United Kingdom" },
    { code: "ca", name: "Canada" },
    { code: "au", name: "Australia" },
    { code: "cn", name: "China" },
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
    const cacheKey = `${country}_${debouncedSearchTerm}_${languageTerm}_${page}`;

    // Check if the data is already cached
    if (cache[cacheKey]) {
      setArticles(cache[cacheKey].articles);
      setTotalPages(cache[cacheKey].totalPages);
      setLoading(false);
      return;
    }

    // Try to fetch from API
    try {
      setLoading(true); // Show loader while fetching
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_API
        }/api/news?&country=${country}&q=${debouncedSearchTerm}&max=${articlesPerPage}&page=${page}&lang=${languageTerm}`
      );
      const totalResults = response.data.totalArticles;

      const fetchedArticles = response.data.articles;
      setArticles(fetchedArticles);
      setTotalPages(Math.ceil(totalResults / articlesPerPage));

      // Cache the result for future use
      cache[cacheKey] = {
        articles: fetchedArticles,
        totalPages: Math.ceil(totalResults / articlesPerPage),
      };

      // Save the result to localStorage for fallback
      localStorage.setItem(cacheKey, JSON.stringify(cache[cacheKey]));
    } catch (error) {
      toast.error("Failed to fetch news. Please try again later.");
      console.error(
        "Error fetching news, trying to retrieve from localStorage:",
        error
      );

      // On failure, attempt to load from localStorage
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setArticles(parsedData.articles);
        setTotalPages(parsedData.totalPages);
        toast.success("Showing cached data from localStorage.");
      } else {
        toast.error("No cached data available in localStorage.");
        console.error("No cached data available in localStorage.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Debounce search term with 1000ms delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000); // 1000ms debounce time

    return () => {
      clearTimeout(handler); // Clear previous timeout if searchTerm changes
    };
  }, [searchTerm]);

  // Fetch news when relevant state changes
  useEffect(() => {
    fetchNews();
  }, [country, debouncedSearchTerm, page, languageTerm]);

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
                onChange={(e) => setLanguageTerm(e.target.value)}
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
        </div>
      )}
      <Footer />
    </>
  );
};

export default News;
