import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Modal from "react-modal";

import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
