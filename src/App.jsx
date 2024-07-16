import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Converter from "./Pages/Converter";
import Contact from "./Pages/Contact";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Uploads from "./Pages/Uploads";
import Guides from "./Pages/Guides";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/uploads" element={<Uploads />} />
        <Route path="/guides" element={<Guides />} />
      </Routes>
    </Router>
  );
}

export default App;
