import React, { useEffect, useRef, useState } from "react";
import Image from "../assets/LucasVisa.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";

// Iconos de tecnologías
import imege1 from "../assets/Icons/icons1.png";
import imege2 from "../assets/Icons/icons2.png";
import imege3 from "../assets/Icons/icons3.png";
import imege4 from "../assets/Icons/icons4.png";
import imege5 from "../assets/Icons/icons5.png";
import imege6 from "../assets/Icons/icons6.png";
import imege7 from "../assets/Icons/icons7.png";
import imege8 from "../assets/Icons/icons8.png";
import imege9 from "../assets/Icons/icons9.png";
import imege10 from "../assets/Icons/icons10.png";
import imege11 from "../assets/Icons/icons11.png";
import imege12 from "../assets/Icons/icons12.png";
import imege13 from "../assets/Icons/icons13.png";

const images = [imege1, imege2, imege3, imege4, imege5, imege6, imege7];
const images2 = [imege8, imege9, imege10, imege11, imege12, imege13];

// Variantes de animación mejoradas
const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
      opacity: 0,
      x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
      scale: direction === "center" ? 0.9 : 1,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

// Variante para la animación de tecnologías
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

// Variante para cada ícono de tecnología
const techIconVariant = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    } 
  }
};

// Colores de partículas mejorados
const particleColors = [
  'rgba(56, 189, 248, 0.6)', // Cyan
  'rgba(139, 92, 246, 0.6)', // Purple
  'rgba(236, 72, 153, 0.5)', // Pink
  'rgba(59, 130, 246, 0.5)', // Blue
];

const Banner = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const bannerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Para parallax en scroll
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Efecto para trackear posición del mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = bannerRef.current.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Efecto mejorado de partículas flotantes en el fondo
  useEffect(() => {
    setIsLoaded(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = Math.min(window.innerWidth / 15, 80); // Responsive count
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        speed: Math.random() * 0.6 + 0.2,
        direction: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * 0.02 + 0.01,
        pulseDirection: Math.random() > 0.5 ? 1 : -1
      });
    }

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Mover partículas
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;

        // Efecto de pulso en opacidad y tamaño
        particle.opacity += particle.pulse * particle.pulseDirection;
        if (particle.opacity > 0.8 || particle.opacity < 0.2) {
          particle.pulseDirection *= -1;
        }

        // Rebote en los bordes con cambio de dirección aleatorio
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.direction = Math.PI - particle.direction + (Math.random() * 0.2 - 0.1);
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.direction = -particle.direction + (Math.random() * 0.2 - 0.1);
        }

        // Interacción con el mouse
        const distX = mousePosition.x * canvas.width * 2 - particle.x;
        const distY = mousePosition.y * canvas.height * 2 - particle.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 150) {
          const angle = Math.atan2(distY, distX);
          particle.x -= Math.cos(angle) * 0.8;
          particle.y -= Math.sin(angle) * 0.8;
        }

        // Dibujar partículas con efecto de brillo
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        
        // Gradiente radial para efecto de brillo
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 2
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Núcleo brillante
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        
        ctx.restore();
      });
    };

    animate();

    // Adaptar tamaño al redimensionar ventana
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <section
      className="min-h-[100vh] flex items-center relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800"
      id="home"
      ref={bannerRef}
    >
      {/* Canvas para partículas de fondo con efectos interactivos */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
      
      {/* Overlay circular con gradiente mejorado */}
      <div className="absolute left-0 top-0 w-full h-full z-0 overflow-hidden">
        <motion.div 
          className="absolute -left-1/4 -top-1/4 w-3/4 h-3/4 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl"
          animate={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
          transition={{ type: 'spring', damping: 50, stiffness: 100 }}
        />
        <motion.div 
          className="absolute -right-1/4 -bottom-1/4 w-3/4 h-3/4 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl"
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          transition={{ type: 'spring', damping: 50, stiffness: 100 }}
        />
        <motion.div 
          className="absolute top-1/4 left-1/2 w-1/3 h-1/3 rounded-full bg-gradient-to-br from-pink-500/10 to-transparent blur-3xl"
          animate={{
            x: mousePosition.x * 15,
            y: mousePosition.y * 15,
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            x: { type: 'spring', damping: 60, stiffness: 90 },
            y: { type: 'spring', damping: 60, stiffness: 90 },
            scale: { duration: 4, repeat: Infinity }
          }}
        />
      </div>

      {/* Contenedor principal con parallax */}
      <motion.div 
        className="container mx-auto px-6 relative z-10"
        style={{ opacity, y }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-x-12">
          {/* Texto y contenido principal */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            animate={isLoaded ? "show" : "hidden"}
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Nombre con animación mejorada */}
            <motion.h1
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate={isLoaded ? "show" : "hidden"}
              className="text-[55px] font-bold leading-[0.8] lg:text-[110px] mb-6"
            >
              <motion.span 
                className="inline-block relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Lucas <span>Visa</span>
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </motion.span>
            </motion.h1>
            
            {/* Texto animado de rol mejorado */}
            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate={isLoaded ? "show" : "hidden"}
              className="mb-6 text-[36px] lg:text-[60px] font-secondary font-semibold uppercase leading-[1]"
            >
              <span className="text-white mr-4">Soy </span>
              <motion.span 
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <TypeAnimation
                  sequence={[
                    "Desarrollador Web", 
                    2000, 
                    "Full Stack", 
                    2000,
                    "Creativo",
                    2000,
                    "Innovador",
                    2000
                  ]}
                  speed={50}
                  className="text-gradient text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                  wrapper="span"
                  repeat={Infinity}
                />
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"
                  animate={{ 
                    scaleX: [1, 0.5, 1],
                    x: [0, 10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.span>
            </motion.div>

            {/* Iconos de tecnologías - Primera fila con animación escalonada */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isLoaded ? "show" : "hidden"}
              className="mb-8 flex flex-wrap justify-between max-w-lg mx-auto lg:mx-0 gap-4 bg-gray-800/30 p-4 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm"
            >
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  variants={techIconVariant}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -5,
                    rotate: [-5, 5, 0],
                    transition: { rotate: { duration: 0.3 } }
                  }}
                  className="tech-icon group relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-md -z-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                  <img 
                    src={image} 
                    alt={`Tecnología ${index + 1}`} 
                    className="w-12 h-12 transition-all filter group-hover:brightness-110 z-10 relative" 
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Iconos de tecnologías - Segunda fila con animación escalonada */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isLoaded ? "show" : "hidden"}
              className="mb-8 flex flex-wrap justify-between max-w-lg mx-auto lg:mx-0 gap-4 bg-gray-800/30 p-4 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm"
            >
              {images2.map((image, index) => (
                <motion.div
                  key={index}
                  variants={techIconVariant}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -5,
                    rotate: [5, -5, 0],
                    transition: { rotate: { duration: 0.3 } }
                  }}
                  className="tech-icon group relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-md -z-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                  <img 
                    src={image} 
                    alt={`Tecnología ${index + 8}`} 
                    className="w-12 h-12 transition-all filter group-hover:brightness-110 z-10 relative" 
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Botones de acción mejorados */}
            <motion.div
              className="flex max-w-max gap-x-6 items-center mb-12 mx-auto lg:mx-0"
              variants={fadeIn("up", 0.7)}
              initial="hidden"
              animate={isLoaded ? "show" : "hidden"}
            >
              <Link
                to="contact"
                smooth={true}
                spy={true}
                className="group"
              >
                <motion.button 
                  className="btn btn-lg px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-medium 
                    transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50
                    flex items-center space-x-2 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Efecto de brillo en hover */}
                  <motion.span 
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                    animate={{
                      x: ['-100%', '100%'],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                  />
                  <span>Contáctame</span>
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "loop", 
                      duration: 1.5,
                      repeatDelay: 2
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </motion.svg>
                </motion.button>
              </Link>

              <Link
                to="work"
                smooth={true}
                spy={true}
                className="text-gradient btn-link bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent group flex items-center"
              >
                <span>Mis Proyectos</span>
                <motion.svg 
                  className="w-5 h-5 ml-2 text-purple-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    duration: 1.5,
                    repeatDelay: 2
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </motion.svg>
              </Link>
            </motion.div>

            {/* Redes sociales con animaciones mejoradas */}
            <motion.div
              className="flex text-[20px] gap-x-6 max-w-max mx-auto lg:mx-0"
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate={isLoaded ? "show" : "hidden"}
            >
              <motion.a 
                href="https://github.com/lucas1visa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ rotate: { duration: 0.5 } }}
              >
                <motion.span 
                  className="absolute -inset-2 rounded-full bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 2 
                  }}
                />
                <FaGithub />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/lucas-visa-157397261/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative group"
                whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                transition={{ rotate: { duration: 0.5 } }}
              >
                <motion.span 
                  className="absolute -inset-2 rounded-full bg-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 2,
                    delay: 0.5
                  }}
                />
                <FaLinkedin />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Imagen con efectos 3D y animaciones avanzadas */}
          <motion.div
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            animate={isLoaded ? "show" : "hidden"}
            className="hidden lg:flex flex-1 max-w-[320px] lg:max-w-[482px] relative"
          >
            <motion.div 
              className="relative group"
              animate={{ rotateY: mousePosition.x * 10, rotateX: mousePosition.y * -10 }}
              transition={{ type: "spring", stiffness: 75, damping: 30 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            >
              {/* Efectos de neón y aura */}
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-full opacity-70 blur-xl -z-10"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.7, 0.5],
                  rotate: [0, 360],
                }}
                transition={{ 
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
              />
              
              {/* Marco decorativo mejorado */}
              <motion.div 
                className="absolute -inset-6 rounded-[220px] border-2 border-cyan-500/40 opacity-80"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ 
                  rotateZ: [0, 5, 0, -5, 0],
                  scale: [1, 1.03, 1]
                }}
                transition={{ 
                  rotateZ: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              
              <motion.div 
                className="absolute -inset-4 rounded-[220px] border-2 border-purple-500/40 opacity-70"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ 
                  rotateZ: [0, -5, 0, 5, 0],
                  scale: [1.03, 1, 1.03]
                }}
                transition={{ 
                  rotateZ: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
              />
              
              {/* Imagen principal con efectos 3D */}
              <motion.div 
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
              >
                <img
                  className="rounded-[220px] shadow-xl shadow-purple-500/20 border border-white/10 
                    transition-all duration-500 group-hover:shadow-cyan-500/30"
                  src={Image}
                  alt="Lucas Visa"
                />
                
                {/* Overlay con gradiente sutil */}
                <motion.div 
                  className="absolute inset-0 rounded-[220px] bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              {/* Efectos de iluminación dinámicos */}
              <motion.div 
                className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-400/40 to-transparent 
                  rounded-full blur-xl -z-10"
                animate={{ 
                  x: [0, 10, 0],
                  y: [0, -10, 0],
                  opacity: [0.6, 0.8, 0.6],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-purple-400/40 to-transparent 
                  rounded-full blur-xl -z-10"
                animate={{ 
                  x: [0, -10, 0],
                  y: [0, 10, 0],
                  opacity: [0.6, 0.8, 0.6],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
              
              {/* Partículas flotantes alrededor de la imagen */}
              <AnimatePresence>
                {isLoaded && Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className={`absolute w-2 h-2 rounded-full ${
                      i % 2 === 0 ? 'bg-cyan-400' : 'bg-purple-400'
                    }`}
                    initial={{ 
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300,
                      scale: 0,
                      opacity: 0
                    }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300,
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4 + i,
                      delay: i * 0.7,
                      ease: "easeInOut"
                    }}
                    style={{
                      left: `${50 + (Math.random() - 0.5) * 30}%`,
                      top: `${50 + (Math.random() - 0.5) * 30}%`,
                      filter: 'blur(1px)'
                    }}
                  />
                ))}
              </AnimatePresence>
              
              {/* Líneas decorativas animadas */}
              <motion.div 
                className="absolute -right-4 top-1/3 w-8 h-20 border-r-2 border-t-2 border-cyan-500/30 rounded-tr-xl"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  x: [0, 5, 0],
                  rotateZ: [0, 5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="absolute -left-4 bottom-1/3 w-8 h-20 border-l-2 border-b-2 border-purple-500/30 rounded-bl-xl"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  x: [0, -5, 0],
                  rotateZ: [0, -5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
            
            {/* Elementos decorativos flotantes alrededor de la imagen */}
            <motion.div
              className="absolute top-10 right-0 w-10 h-10 rounded-full border border-cyan-400/40 backdrop-blur-sm"
              animate={{
                y: [0, -10, 0],
                x: [0, 10, 0],
                rotate: [0, 90, 180, 270, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            <motion.div
              className="absolute bottom-10 left-0 w-14 h-14 rounded-full border border-purple-400/40 backdrop-blur-sm"
              animate={{
                y: [0, 15, 0],
                x: [0, -10, 0],
                rotate: [0, -90, -180, -270, -360],
                scale: [1, 1.15, 1]
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            <motion.div
              className="absolute top-1/2 -right-8 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 backdrop-blur-sm"
              animate={{
                y: [0, -20, 0],
                x: [0, 5, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            <motion.div
              className="absolute top-1/3 -left-10 w-8 h-8 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 backdrop-blur-sm"
              animate={{
                y: [0, 20, 0],
                x: [0, -5, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.div>
        </div>
        
        {/* Elemento decorativo inferior */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="w-8 h-14 border-2 border-white/20 rounded-full flex justify-center pt-2"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <motion.div 
              className="w-1.5 h-3 bg-white/50 rounded-full"
              animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
          <motion.p 
            className="text-white/50 text-sm ml-3"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            Desliza hacia abajo
          </motion.p>
        </motion.div>
      </motion.div>
      
      {/* Efecto de gradiente en el borde inferior */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-800 to-transparent z-1 pointer-events-none"></div>
    </section>
  );
};

export default Banner;