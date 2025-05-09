import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";

// Variantes de animación mejoradas para consistencia con el Banner
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

// Variante para la animación de estadísticas
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

// Variante para cada tarjeta de estadística
const statCardVariant = {
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

// Colores de partículas mejorados (para consistencia con el Banner)
const particleColors = [
  'rgba(56, 189, 248, 0.6)', // Cyan
  'rgba(139, 92, 246, 0.6)', // Purple
  'rgba(236, 72, 153, 0.5)', // Pink
  'rgba(59, 130, 246, 0.5)', // Blue
];

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const aboutRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Para parallax en scroll
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);

  // Efecto para trackear posición del mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!aboutRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = aboutRef.current.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Efecto de partículas flotantes en el fondo mejorado
  useEffect(() => {
    setIsLoaded(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = Math.min(window.innerWidth / 20, 60); // Responsive count
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        speed: Math.random() * 0.5 + 0.2,
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

        // Interacción sutil con el mouse
        const distX = mousePosition.x * canvas.width * 2 - particle.x;
        const distY = mousePosition.y * canvas.height * 2 - particle.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 150) {
          const angle = Math.atan2(distY, distX);
          particle.x -= Math.cos(angle) * 0.6;
          particle.y -= Math.sin(angle) * 0.6;
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
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
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
      id="about" 
      className="py-20 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800"
      ref={aboutRef}
    >
      {/* Canvas para partículas de fondo con efectos interactivos */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
      
      {/* Overlay circular con gradiente mejorado */}
      <div className="absolute left-0 top-0 w-full h-full z-0 overflow-hidden">
        <motion.div 
          className="absolute -left-1/4 -top-1/4 w-3/4 h-3/4 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl"
          animate={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
          }}
          transition={{ type: 'spring', damping: 50, stiffness: 80 }}
        />
        <motion.div 
          className="absolute -right-1/4 -bottom-1/4 w-3/4 h-3/4 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl"
          animate={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
          }}
          transition={{ type: 'spring', damping: 50, stiffness: 80 }}
        />
        <motion.div 
          className="absolute top-1/4 left-1/2 w-1/3 h-1/3 rounded-full bg-gradient-to-br from-pink-500/10 to-transparent blur-3xl"
          animate={{
            x: mousePosition.x * 25,
            y: mousePosition.y * 25,
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            x: { type: 'spring', damping: 60, stiffness: 70 },
            y: { type: 'spring', damping: 60, stiffness: 70 },
            scale: { duration: 5, repeat: Infinity }
          }}
        />
      </div>

      {/* Contenedor principal con animación de parallax */}
      <motion.div 
        className="container mx-auto px-6 relative z-10"
        style={{ y, opacity, scale }}
        ref={ref}
      >
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Imagen con efectos 3D y animaciones avanzadas */}
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex-1 relative group"
          >
            <motion.div 
              className="relative w-full max-w-md mx-auto aspect-square"
              animate={{ rotateY: mousePosition.x * 8, rotateX: mousePosition.y * -8 }}
              transition={{ type: "spring", stiffness: 75, damping: 25 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            >
              {/* Efectos de neón y aura */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-70 blur-xl -z-10"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.7, 0.5],
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{ 
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              
              {/* Formas decorativas mejoradas */}
              <motion.div 
                className="absolute -left-8 -top-8 w-64 h-64 border-2 border-cyan-500/40 rounded-2xl transform"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ 
                  rotateZ: [0, 5, 0, -5, 0],
                  scale: [1, 1.02, 1],
                  x: [0, 5, 0, -5, 0],
                  y: [0, -5, 0, 5, 0]
                }}
                transition={{ 
                  rotateZ: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              
              <motion.div 
                className="absolute -right-8 -bottom-8 w-64 h-64 border-2 border-purple-500/40 rounded-2xl transform"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ 
                  rotateZ: [0, -5, 0, 5, 0],
                  scale: [1, 1.02, 1],
                  x: [0, -5, 0, 5, 0],
                  y: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  rotateZ: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              
              {/* Imagen principal con bg-about mejorada */}
              <motion.div 
                className="w-full h-full bg-about bg-contain bg-no-repeat bg-center relative 
                  rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 backdrop-blur-sm
                  border border-white/20"
                whileHover={{ 
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
              >
                {/* Overlay con gradiente animado */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30"
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                    background: [
                      "linear-gradient(to bottom right, rgba(56, 189, 248, 0.2), rgba(139, 92, 246, 0.2))",
                      "linear-gradient(to bottom right, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))",
                      "linear-gradient(to bottom right, rgba(56, 189, 248, 0.2), rgba(139, 92, 246, 0.2))"
                    ]
                  }}
                  transition={{ 
                    opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    background: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                
                {/* Efecto de luz interna */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
                  animate={{ 
                    x: mousePosition.x * 10,
                    y: mousePosition.y * 10,
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    x: { type: "spring", stiffness: 75, damping: 25 },
                    y: { type: "spring", stiffness: 75, damping: 25 },
                    opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </motion.div>
              
              {/* Círculos decorativos animados mejorados */}
              <motion.div 
                className="absolute top-1/2 -left-4 w-8 h-8 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-full transform -translate-y-1/2 blur-sm"
                animate={{ 
                  x: [-10, 10, -10],
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              <motion.div 
                className="absolute bottom-0 right-1/3 w-6 h-6 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full transform translate-y-1/2 blur-sm"
                animate={{ 
                  y: [0, 10, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              
              <motion.div 
                className="absolute top-1/4 -right-2 w-5 h-5 bg-gradient-to-r from-pink-500/40 to-purple-500/40 rounded-full blur-sm"
                animate={{ 
                  x: [0, -8, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ 
                  duration: 7, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2
                }}
              />
              
              {/* Partículas flotantes alrededor de la imagen */}
              <AnimatePresence>
                {isLoaded && Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`about-particle-${i}`}
                    className={`absolute w-1.5 h-1.5 rounded-full ${
                      i % 2 === 0 ? 'bg-cyan-400' : 'bg-purple-400'
                    }`}
                    initial={{ 
                      x: (Math.random() - 0.5) * 200,
                      y: (Math.random() - 0.5) * 200,
                      scale: 0,
                      opacity: 0
                    }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 200,
                      y: (Math.random() - 0.5) * 200,
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3 + i,
                      delay: i * 0.5,
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
              
              {/* Líneas decorativas */}
              <motion.div 
                className="absolute -right-6 top-1/3 w-6 h-16 border-r-2 border-t-2 border-cyan-500/30 rounded-tr-xl"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  x: [0, 3, 0],
                  rotateZ: [0, 5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="absolute -left-6 bottom-1/3 w-6 h-16 border-l-2 border-b-2 border-purple-500/30 rounded-bl-xl"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  x: [0, -3, 0],
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
          </motion.div>

          {/* Contenido de texto con animaciones mejoradas */}
          <motion.div
            variants={fadeIn("left", 0.5)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex-1"
          >
            <motion.div 
              className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl shadow-purple-500/5 relative overflow-hidden"
              whileHover={{ boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(56, 189, 248, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Brillo de fondo animado */}
              <motion.div 
                className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-0 transform rotate-45"
                animate={{
                  x: ["200%", "-200%"],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              
              {/* Efectos decorativos en las esquinas */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <motion.div 
                  className="absolute -top-10 -right-10 w-20 h-20 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-xl"
                  animate={{
                    rotate: [0, 10, 0],
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden">
                <motion.div 
                  className="absolute -bottom-10 -left-10 w-20 h-20 border-b-2 border-l-2 border-purple-500/30 rounded-bl-xl"
                  animate={{
                    rotate: [0, -10, 0],
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
              
              {/* Título con animación mejorada */}
              <motion.h2 
                className="text-4xl font-bold mb-3 relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Acerca de mí
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </motion.h2>
              
              {/* Subtítulo con efecto de máquina de escribir */}
              <motion.h3 
                className="text-2xl text-white/90 font-medium mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.span
                  animate={inView ? {
                    color: [
                      "rgba(255, 255, 255, 0.9)",
                      "rgba(56, 189, 248, 0.9)",
                      "rgba(139, 92, 246, 0.9)",
                      "rgba(255, 255, 255, 0.9)"
                    ]
                  } : {}}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Mi objetivo es seguir mejorando constantemente en este campo.
                </motion.span>
              </motion.h3>
              
              {/* Párrafo con animación de entrada */}
              <motion.p 
                className="text-gray-300 mb-8 text-lg leading-relaxed relative"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Hola, mi nombre es <span className="text-cyan-400 font-medium">Lucas Visa</span>, tengo 23 años y
                comencé mi viaje en el mundo de la programación hace ya <span className="text-purple-400 font-medium">4 años</span>.
                Actualmente, estoy decidido a hacer de la programación mi carrera
                y vivir de ello.
                
                {/* Elementos decorativos flotantes en el texto */}
                <motion.span 
                  className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/40 blur-sm"
                  animate={{
                    x: [0, 10, 0],
                    y: [0, -5, 0],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ left: "30%", top: "30%" }}
                />
                
                <motion.span 
                  className="absolute w-1.5 h-1.5 rounded-full bg-purple-400/40 blur-sm"
                  animate={{
                    x: [0, -10, 0],
                    y: [0, 5, 0],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  style={{ right: "20%", bottom: "20%" }}
                />
              </motion.p>
              
              {/* Stats con animación escalonada mejorada */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
              >
                {[
                  { value: 3, label: "Años de Experiencia", delay: 0.2, icon: "⏱️", color: "from-cyan-400 via-blue-400 to-cyan-500" },
                  { value: 21, label: "Proyectos Completados", delay: 0.4, icon: "🚀", color: "from-blue-400 via-purple-500 to-blue-400" },
                  { value: 21, label: "Clientes Satisfechos", delay: 0.6, icon: "🏆", color: "from-purple-400 via-pink-400 to-purple-500" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={statCardVariant}
                    whileHover={{ 
                      y: -8, 
                      boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.2), 0 10px 10px -5px rgba(56, 189, 248, 0.2)",
                      scale: 1.05
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="stat-card relative bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl border border-white/10
                      shadow-lg transition-all duration-300 flex flex-col items-center justify-center group
                      overflow-hidden"
                  >
                    {/* Fondo brillante animado */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10`}
                      animate={{ 
                        background: [
                          `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))`,
                          `linear-gradient(to top left, var(--tw-gradient-from), var(--tw-gradient-to))`,
                          `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))`
                        ]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Icono decorativo */}
                    <motion.div
                      className="absolute -top-6 -right-6 opacity-10 text-4xl group-hover:opacity-20"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {stat.icon}
                    </motion.div>
                    
                    {/* Contador animado */}
                    <motion.div 
                      className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                      animate={inView ? { 
                        scale: [1, 1.2, 1],
                        transition: { delay: stat.delay, duration: 0.6 }
                      } : {}}
                    >
                      {inView ? (
                        <CountUp 
                          start={0} 
                          end={stat.value} 
                          duration={2.5} 
                          delay={0.5} 
                        />
                      ) : (
                        0
                      )}
                    </motion.div>
                    
                    {/* Línea separadora animada */}
                    <motion.div 
                      className={`h-1 w-12 bg-gradient-to-r ${stat.color} rounded-full mb-2`}
                      animate={{ width: inView ? [0, 48] : [0, 0] }}
                      transition={{ 
                        delay: stat.delay + 0.5, 
                        duration: 0.8, 
                        ease: "easeOut" 
                      }}
                      whileHover={{ width: 56 }}
                    />
                    
                    {/* Texto con efecto hover */}
                    <motion.div 
                      className="text-gray-300 text-center font-medium"
                      animate={inView ? { 
                        opacity: [0, 1],
                        y: [10, 0],
                        transition: { delay: stat.delay + 0.7, duration: 0.5 }
                      } : {}}
                    >
                      {stat.label.split(" ").map((word, i) => (
                        <motion.div 
                          key={i}
                          whileHover={{ 
                            color: i % 2 === 0 ? "#22d3ee" : "#a855f7",
                            x: 2
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {word}
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    {/* Partícula brillante que se mueve */}
                    <motion.div 
                      className="absolute w-6 h-6 rounded-full bg-white opacity-0 filter blur-md"
                      animate={{
                        x: ["-100%", "100%"],
                        opacity: [0, 0.2, 0],
                        top: ["0%", "100%", "50%", "0%"]
                      }}
                      transition={{
                        duration: 5 + index,
                        repeat: Infinity,
                        delay: index * 2,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Botón de contacto con animación mejorada */}
              <motion.div
                variants={fadeIn("up", 0.7)}
                className="flex justify-center md:justify-start"
              >
                <Link 
                  to="contact" 
                  smooth={true} 
                  spy={true}
                  className="group"
                >
                  <motion.button 
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full text-white font-medium 
                      transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50
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
              </motion.div>
              
              {/* Elementos decorativos adicionales */}
              <motion.div 
                className="absolute -bottom-3 -right-3 w-16 h-16"
                animate={{
                  rotate: [0, 360],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path 
                    fill="none" 
                    stroke="url(#gradientAbout)" 
                    strokeWidth="2"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    style={{ strokeDasharray: 470, strokeDashoffset: 0 }}
                  />
                  <defs>
                    <linearGradient id="gradientAbout" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: "#22d3ee", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#a855f7", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
              
              <motion.div 
                className="absolute -top-3 -left-3 w-12 h-12"
                animate={{
                  rotate: [0, -360],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path 
                    fill="none" 
                    stroke="url(#gradientAbout2)" 
                    strokeWidth="2"
                    d="M 80, 80 L 120, 80 L 120, 120 L 80, 120 Z"
                    transform="rotate(45, 100, 100)"
                    style={{ strokeDasharray: 170, strokeDashoffset: 0 }}
                  />
                  <defs>
                    <linearGradient id="gradientAbout2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: "#a855f7", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#22d3ee", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Elementos flotantes adicionales en el fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Líneas decorativas flotantes */}
        <motion.div 
          className="absolute top-1/4 left-10 w-16 h-16 border-l-2 border-t-2 border-cyan-500/20 rounded-tl-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-10 w-16 h-16 border-r-2 border-b-2 border-purple-500/20 rounded-br-xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            rotate: [0, -10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
        
        {/* Pequeños puntos decorativos */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div 
            key={`bg-dot-${i}`}
            className={`absolute w-1 h-1 rounded-full ${
              i % 2 === 0 ? 'bg-cyan-400/30' : 'bg-purple-400/30'
            }`}
            animate={{
              y: [0, (Math.random() - 0.5) * 30, 0],
              x: [0, (Math.random() - 0.5) * 30, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
            style={{
              left: `${10 + i * 20}%`,
              top: `${80 - i * 15}%`
            }}
          />
        ))}
      </div>
      
      {/* Efecto de gradiente en el borde inferior */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-800 to-transparent z-1 pointer-events-none"></div>
    </section>
  );
};

export default About;