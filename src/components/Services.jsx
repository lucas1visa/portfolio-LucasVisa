import React, { useEffect } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

// Variantes de animación compartidas con otros componentes
const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
      opacity: 0,
      x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.2,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

const servicios = [
  {
    name: "Full Stack",
    description:
      "Ofrezco servicios como desarrollador Full Stack con experiencia en el diseño de servidores y en la creación de atractivos diseños Frontend.",
  },
  {
    name: "Frontend",
    description:
      "Como parte de mis servicios, me especializo en la creación de interfaces de usuario atractivas y funcionales utilizando tecnologías web modernas.",
  },
  {
    name: "Backend",
    description:
      "En el diseño de servidores, tengo experiencia en desarrollar la lógica y la funcionalidad detrás de las aplicaciones web, asegurando su funcionamiento sólido y eficiente.",
  },
];

const Services = () => {
  // Efecto de partículas para el fondo (similar al de About y Banner)
  useEffect(() => {
    const canvas = document.getElementById('particles-canvas-services');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 150 + 100)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.3 + 0.1})`,
        speed: Math.random() * 0.5 + 0.2,
        direction: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Mover partículas
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;

        // Rebote en los bordes
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.direction = Math.PI - particle.direction;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.direction = -particle.direction;
        }

        // Dibujar partículas
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
    };

    animate();

    // Adaptar tamaño al redimensionar ventana
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800" id="services">
      {/* Canvas para partículas de fondo */}
      <canvas id="particles-canvas-services" className="absolute inset-0 z-0 opacity-30"></canvas>
      
      {/* Overlay circular con gradiente */}
      <div className="absolute left-0 top-0 w-full h-full z-0">
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl"></div>
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Texto e introducción */}
          <motion.div 
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1 lg:bg-services lg:bg-bottom bg-no-repeat mix-blend-lighten mb-12 lg:mb-0"
          >
            <h2 className="h2 text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Lo que hago
              </span>
            </h2>
            
            <h3 className="h3 text-2xl text-white/90 font-medium mb-16 max-w-[455px]">
              Me enfoco en brindar soluciones web completas y atractivas.
            </h3>
            
            <Link
              to="work"
              smooth={true}
              spy={true}
              className="group"
            >
              <button className="btn btn-sm px-7 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-medium 
                transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50
                flex items-center">
                <span>Mis trabajos</span>
                <svg className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </button>
            </Link>
          </motion.div>
          
          {/* Servicios */}
          <motion.div 
            variants={fadeIn("left", 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1"
          >
            {/* Lista de servicios */}
            {servicios.map((service, index) => {
              // Destructurar servicios
              const { name, description } = service;
              return (
                <motion.div
                  key={index}
                  variants={fadeIn("left", 0.2 + index * 0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.3 }}
                  className="border-b border-white/20 h-auto mb-10 py-4 group"
                >
                  <div className="max-w-[476px]">
                    <h4 className="text-[20px] tracking-wider font-primary font-semibold mb-4 flex items-center gap-2">
                      <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                        {name}
                      </span>
                      <BsArrowUpRight className="text-cyan-400 opacity-0 transform -translate-x-2 
                        transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    </h4>
                    
                    <p className="font-secondary leading-relaxed text-gray-300 group-hover:text-white transition-colors duration-300">
                      {description}
                    </p>
                    
                    {/* Tecnologías para cada servicio */}
                    <div className="flex flex-wrap gap-2 mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {index === 0 && (
                        <>
                          <span className="text-xs py-1 px-3 bg-gray-800/70 rounded-full text-cyan-300 border border-cyan-500/20">React</span>
                          <span className="text-xs py-1 px-3 bg-gray-800/70 rounded-full text-purple-300 border border-purple-500/20">Node.js</span>
                          <span className="text-xs py-1 px-3 bg-gray-800/70 rounded-full text-cyan-300 border border-cyan-500/20">MongoDB</span>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <span className="text-xs py-1 px-3 bg-gray-800/70 rounded-full text-cyan-300 border border-cyan-500/20">HTML/CSS</span>
                          <span className="text-xs py-1 px-3 bg-gray-800/70 rounded-full text-purple-300 border border-purple-500/20">JavaScript</span>
                          <span className="text-xs py-1 px-3 bg-gray-800/70 rounded-full text-cyan-300 border border-cyan-500/20">React</span>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <span className="text-xs py-1 px-3 bg-gray-800/70 rounded-full text-purple-300 border border-purple-500/20">Node.js</span>
                          <span className="text-xs py-1 px-3 bg-gray-800/70 rounded-full text-cyan-300 border border-cyan-500/20">Express</span>
                          <span className="text-xs py-1 px-3 bg-gray-800/70 rounded-full text-purple-300 border border-purple-500/20">PostgreSQL</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;