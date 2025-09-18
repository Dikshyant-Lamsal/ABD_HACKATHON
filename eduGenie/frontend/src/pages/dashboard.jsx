import React, { useEffect, useRef } from "react";
import PDFUpload from "./PDFUpload";
import NotesInput from "./NotesInput";
import AIBot from "./AIBot";

const Dashboard = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }

    resizeCanvas();

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

    init();
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col p-6 overflow-hidden text-white"
    >
      {/* Dynamic Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10"></canvas>

      {/* Header */}
      <h1 className="text-5xl font-extrabold text-blue-400 text-center mb-10 drop-shadow-lg relative z-10">
        EduGenie Dashboard
      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="bg-gray-900/50 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-gray-700 hover:scale-105 transition-transform duration-300">
          <PDFUpload />
        </div>

        <div className="bg-gray-900/50 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-gray-700 hover:scale-105 transition-transform duration-300">
          <NotesInput />
        </div>

        <div className="bg-gray-900/50 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-gray-700 hover:scale-105 transition-transform duration-300 md:col-span-2">
          <AIBot />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
