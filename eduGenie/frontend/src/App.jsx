import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Landing from "./components/landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
