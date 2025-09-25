import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // ensure logo.png is in assets folder

const Landing = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Add a check to prevent errors
    const ctx = canvas.getContext("2d");
    
    // Set initial canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    let particles = [];
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(96,165,250,0.8)";
        ctx.shadowColor = "rgba(96,165,250,0.8)";
        ctx.shadowBlur = 15;
        ctx.fill();
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#111827");
      gradient.addColorStop(1, "#000000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }
    
    // Initial setup
    setCanvasSize();
    animate();

    // Event listener for window resize
    window.addEventListener("resize", setCanvasSize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center px-6">
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10"></canvas>

      {/* Hero Section - The content has been styled for the dark background */}
      <div className="max-w-2xl mb-10 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img
  src={logo}
  alt="EduGenie Logo"
  className="w-28 h-28 object-contain mix-blend-screen drop-shadow-[0_0_25px_rgba(96,165,250,0.8)]"
/>
          <h1 className="text-6xl font-extrabold text-blue-400 drop-shadow-lg">
            EduGenie
          </h1>
        </div>
        <p className="text-lg text-gray-300 mb-8">
          Your AI-powered learning companion that transforms overwhelming study
          materials into{" "}
          <span className="font-semibold text-white">
            personalized summaries, personalized AI chatBot, a personalized notepad
          </span>.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 rounded-2xl text-lg bg-gray-700 text-gray-100 hover:bg-gray-600 transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 rounded-2xl text-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
