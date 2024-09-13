import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import News from "./pages/News/News";

function App() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get("message");

    if (message) {
      toast.error(message);
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={5000} position="top-right" hideProgressBar />
    </>
  );
}

export default App;
