import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../../styles/home.css";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import axios from "axios";
import NewsCard from "../../components/NewsCard";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Debounced search term
  const [searchTerm, setSearchTerm] = useState(""); // Search term input

  // Cache object to store API responses
  const cache = {};

  // Debounce search term with 1000ms delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000); // 1000ms debounce time

    return () => {
      clearTimeout(handler); // Clear previous timeout if searchTerm changes
    };
  }, [searchTerm]);

  const fetchNews = async () => {
    const cacheKey = `general_${debouncedSearchTerm}`;

    // Check if the data is already cached
    if (cache[cacheKey]) {
      setNews(cache[cacheKey]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true); // Show loader while fetching
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_API
        }/api/news?topic=general&q=${debouncedSearchTerm}`
      );

      const fetchedArticles = response.data.articles;
      setNews(fetchedArticles);

      // Cache the result for future use
      cache[cacheKey] = fetchedArticles;

      // Save the result to localStorage for fallback
      localStorage.setItem(cacheKey, JSON.stringify(fetchedArticles));
    } catch (error) {
      toast.error("Failed to fetch news. Please try again later.");
      console.error(
        "Error fetching news, trying to retrieve from localStorage:",
        error
      );

      // On failure, attempt to load from localStorage
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        setNews(JSON.parse(cachedData));
        toast.success("Showing cached data from localStorage.");
      } else {
        toast.error("No cached data available in localStorage.");
        console.error("No cached data available in localStorage.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [debouncedSearchTerm]);

  const { ref: bannerRef, inView: bannerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animationVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {loading && (
        <>
          <Loader />
        </>
      )}

      <motion.section
        className="banner"
        ref={bannerRef}
        initial="hidden"
        animate={bannerInView ? "visible" : "hidden"}
        variants={animationVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="banner-content">
          <div className="home-container">
            {/* Search Input */}
            <input
              type="search"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Render News Cards */}
            {news.map((article, index) => (
              <NewsCard article={article} key={index} />
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
};

export default News;
