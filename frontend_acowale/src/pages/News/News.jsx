import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../../styles/home.css";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import axios from "axios";
import NewsCard from "../../components/NewsCard";
import Loader from "../../components/Loader";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/news?topic=general`
      );

      setNews(response.data.articles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

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
