import SigninPage from "./pages/SigninPage";
//import SignupPage from "./pages/SignupPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SigninPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
