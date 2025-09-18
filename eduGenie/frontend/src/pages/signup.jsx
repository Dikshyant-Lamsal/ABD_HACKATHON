import React, { useState } from "react";
<<<<<<< HEAD:eduGenie/frontend/src/pages/signup.jsx
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (name && email && password) {
      // Save credentials temporarily in localStorage (hackathon MVP)
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);

      alert("Signup successful! Please login.");
      navigate("/login"); // redirect to login
    } else {
      alert("Please fill all fields");
=======
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/signup", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
>>>>>>> d6c7444f23c8bbfbe11220ddc63be36e008bb54a:eduGenie/frontend/src/components/signup.jsx
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-10 rounded-3xl shadow-lg w-96">
<<<<<<< HEAD:eduGenie/frontend/src/pages/signup.jsx
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-5">
=======
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Account - EduGenie
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
>>>>>>> d6c7444f23c8bbfbe11220ddc63be36e008bb54a:eduGenie/frontend/src/components/signup.jsx
          <input
            type="text"
            name="name"
            placeholder="Full Name"
<<<<<<< HEAD:eduGenie/frontend/src/pages/signup.jsx
            value={name}
            onChange={(e) => setName(e.target.value)}
=======
            value={form.name}
            onChange={handleChange}
>>>>>>> d6c7444f23c8bbfbe11220ddc63be36e008bb54a:eduGenie/frontend/src/components/signup.jsx
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
<<<<<<< HEAD:eduGenie/frontend/src/pages/signup.jsx
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
=======
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
>>>>>>> d6c7444f23c8bbfbe11220ddc63be36e008bb54a:eduGenie/frontend/src/components/signup.jsx
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
<<<<<<< HEAD:eduGenie/frontend/src/pages/signup.jsx
            value={password}
            onChange={(e) => setPassword(e.target.value)}
=======
            value={form.password}
            onChange={handleChange}
>>>>>>> d6c7444f23c8bbfbe11220ddc63be36e008bb54a:eduGenie/frontend/src/components/signup.jsx
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
<<<<<<< HEAD:eduGenie/frontend/src/pages/signup.jsx
=======
        {message && <p className="text-center text-sm text-red-500 mt-3">{message}</p>}
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-medium hover:underline">
            Login
          </Link>
        </p>
>>>>>>> d6c7444f23c8bbfbe11220ddc63be36e008bb54a:eduGenie/frontend/src/components/signup.jsx
      </div>
    </div>
  );
};

export default Signup;
