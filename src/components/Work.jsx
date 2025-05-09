import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Img1 from "../assets/Imagen1.jpg"; // Concesionario de autos (rojo)
import Img2 from "../assets/Imagen3.jpg"; // Tienda ecológica (verde)
import Img3 from "../assets/Imagen2.jpg"; // Countdown (gris)

// Definimos un array de proyectos para facilitar la adición de más proyectos
const projects = [
  {
    id: 1,
    title: "ecoWise 'ecommerce'",
    description: "Un ecommerce completo con funcionalidades modernas y experiencia de usuario optimizada.",
    category: "FullStack",
    image: Img3,
    categoryColor: "cyan",
    url: "https://ecowise-web-site.vercel.app/",
    techs: ["React.js", "Redux.js", "JavaScript", "CSS", "HTML", "Tailwind", "Express.js", "Node.js", "PostgreSQL", "Sequelize"]
  },
  {
    id: 2,
    title: "WheelWonders",
    description: "Plataforma de concesionario de vehículos con enfoque en experiencia de usuario y diseño atractivo.",
    category: "Frontend",
    image: Img1,
    categoryColor: "purple",
    url: "https://wheel-wonders.vercel.app/",
    techs: ["React.js", "Next.js", "JavaScript", "CSS", "HTML", "Tailwind"]
  },
  {
    id: 3,
    title: "Countdown",
    description: "Página de lanzamiento con cuenta regresiva y sistema de notificaciones para los usuarios.",
    category: "Frontend",
    image: Img2,
    categoryColor: "pink",
    url: "https://count-down-lime-six.vercel.app/",
    techs: ["HTML", "JavaScript", "CSS", "React JS"]
  },
  // Puedes agregar más proyectos aquí siguiendo el mismo formato
];

// Variantes de animación mejoradas
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

const Work = () => {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [expandedImage, setExpandedImage] = useState(null);

  // Filtrar proyectos según categoría
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === filter.toLowerCase());

  // Cargar más proyectos
  const loadMore = () => {
    setVisibleProjects(prev => prev + 3);
  };

  // Efectos de partículas para el fondo
  useEffect(() => {
    const canvas = document.getElementById('particles-canvas-work');
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

  // Efectos de paralaje para el scroll (modificado para ser más sutil)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const projects = document.querySelectorAll('.project-card');
      
      projects.forEach((project, index) => {
        const speed = 0.02 + (index * 0.005); // Muy sutil para evitar problemas
        project.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar imagen expandida al presionar ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setExpandedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Categorías de filtrado
  const categories = [
    { id: "all", name: "Todos" },
    { id: "fullstack", name: "FullStack" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" }
  ];

  return (
    <section className="py-16 min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800" id="work">
      {/* Canvas para partículas de fondo */}
      <canvas id="particles-canvas-work" className="absolute inset-0 z-0 opacity-30"></canvas>
      
      {/* Overlay circular con gradiente */}
      <div className="absolute left-0 top-0 w-full h-full z-0">
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl"></div>
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Encabezado de la sección */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Mis Proyectos
            </span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Una colección de trabajos que demuestran mis habilidades y experiencia en el desarrollo web.
            Desde aplicaciones frontend visualmente atractivas hasta soluciones fullstack completas.
          </p>
        </motion.div>

        {/* Filtro de categorías */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => {
                setFilter(category.id);
                setActiveTab(category.id);
                setVisibleProjects(3);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === category.id
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Proyectos principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeIn(
                index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right", 
                0.2 + (index * 0.1)
              )}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
              className={`project-card group relative overflow-hidden rounded-2xl shadow-xl shadow-${project.categoryColor}-500/10 border border-${project.categoryColor}-500/20 h-[380px]`}
            >
              <div className="block h-full relative">
                <div className={`absolute inset-0 bg-gradient-to-b from-${project.categoryColor}-900/0 to-gray-900/90 opacity-60 
                  group-hover:opacity-90 z-10 transition-all duration-500`}></div>
                
                {/* Imagen del proyecto con efecto zoom hover */}
                <div className="overflow-hidden h-full cursor-pointer">
                  <img
                    className="w-full h-full object-cover transform transition-all duration-700 
                    group-hover:scale-110 group-hover:blur-[2px]"
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    onClick={() => setExpandedImage(project)}
                  />
                  
                  {/* Botón de zoom para la imagen */}
                  <div 
                    className="absolute top-4 right-4 z-30 bg-gray-900/70 rounded-full p-2 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedImage(project);
                    }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                    </svg>
                  </div>
                </div>
                
                {/* Enlace al proyecto */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Información del proyecto */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform 
                    transition-all duration-500 translate-y-5 group-hover:translate-y-0">
                    <div className="space-y-2">
                      <span className={`inline-block px-3 py-1 bg-${project.categoryColor}-500/30 backdrop-blur-sm 
                        rounded-full text-${project.categoryColor}-300 text-sm font-medium`}>
                        {project.category}
                      </span>
                      <h3 className={`text-2xl font-bold text-white group-hover:text-${project.categoryColor}-300 
                        transition-colors duration-300`}>
                        {project.title}
                      </h3>
                      <div className={`w-12 h-1 bg-gradient-to-r from-${project.categoryColor}-500 to-purple-600 
                        group-hover:w-24 transition-all duration-500`}></div>
                      <p className="text-gray-300 text-sm max-w-lg opacity-0 group-hover:opacity-100 
                        transform transition-all duration-500 delay-150 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    {/* Tecnologías usadas */}
                    <div className="flex flex-wrap gap-2 mt-3 opacity-0 group-hover:opacity-100 
                      transform transition-all duration-500 delay-200">
                      {project.techs.slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-800/80 backdrop-blur-sm 
                          rounded-md text-gray-300 text-xs">
                          {tech}
                        </span>
                      ))}
                      {project.techs.length > 4 && (
                        <span className="px-2 py-1 bg-gray-800/80 backdrop-blur-sm 
                          rounded-md text-gray-300 text-xs">
                          +{project.techs.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Botón de ver proyecto */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className={`px-5 py-2 bg-gradient-to-r from-${project.categoryColor}-500/80 to-purple-600/80 backdrop-blur-sm
                      rounded-xl text-white shadow-lg flex items-center gap-2 border border-white/10`}>
                      <span>Ver proyecto</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </span>
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botón de cargar más */}
        {filteredProjects.length > visibleProjects && (
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-medium 
                transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50
                flex items-center gap-2 group"
            >
              <span>Cargar más proyectos</span>
              <svg className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-y-1" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </button>
          </motion.div>
        )}

        {/* Enlace a GitHub */}
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="flex justify-center mt-8"
        >
          <a
            href="https://github.com/lucas1visa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
          >
            <span>Ver todos mis proyectos en GitHub</span>
            <svg className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"></path>
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Modal para imagen expandida */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 bg-black/90"
            onClick={() => setExpandedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón de cerrar */}
              <button
                className="absolute top-4 right-4 z-50 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors duration-300"
                onClick={() => setExpandedImage(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              
              {/* Imagen expandida */}
              <div className="relative">
                <img
                  src={expandedImage.image}
                  alt={expandedImage.title}
                  className="w-full h-auto object-contain max-h-[80vh] rounded-xl"
                />
                
                {/* Información del proyecto */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white mb-2">{expandedImage.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{expandedImage.description}</p>
                  <a
                    href={expandedImage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 bg-${expandedImage.categoryColor}-500 rounded-lg text-white hover:bg-${expandedImage.categoryColor}-600 transition-colors duration-300`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Visitar proyecto</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Indicador de cerrar */}
            <div className="absolute bottom-8 left-0 right-0 text-center text-gray-400 text-sm">
              Presiona ESC o haz clic fuera de la imagen para cerrar
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;