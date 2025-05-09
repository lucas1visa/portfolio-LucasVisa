import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import Logo from "../assets/—Pngtree—letter l logo design png_6011236 (1).png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navegación para móviles
  const navLinks = [
    { name: "Inicio", target: "home" },
    { name: "Sobre Mí", target: "about" },
    { name: "Proyectos", target: "work" },
    { name: "Contacto", target: "contact" }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'py-4 bg-gray-900/90 backdrop-blur-sm shadow-md shadow-black/10' : 'py-6 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo con animación */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <a href="#home" className="group relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 
              blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <img 
                src={Logo} 
                alt="Lucas Visa Logo" 
                width={60} 
                className="transition-all duration-300 group-hover:scale-110" 
              />
            </div>
          </a>
        </motion.div>

        {/* Navegación en escritorio */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:flex items-center gap-8"
        >
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.target}
              smooth={true}
              spy={true}
              offset={-100}
              className="text-gray-300 hover:text-white relative group cursor-pointer transition-colors duration-300"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 
                transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </motion.nav>

        {/* Botón de CV */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://drive.google.com/file/d/1H1MzHUEjCHVqPzOOfYolavQqJZ8doXcb/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium 
              transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30
              flex items-center gap-2">
              <span>Descargar CV</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:translate-x-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </button>
          </a>
        </motion.div>

        {/* Menú móvil - botón de hamburguesa */}
        <div className="lg:hidden">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="flex flex-col space-y-1.5 focus:outline-none z-50 relative"
            aria-label="Toggle menu"
          >
            <motion.span 
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white block transition-transform duration-300"
            ></motion.span>
            <motion.span 
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white block transition-opacity duration-300"
            ></motion.span>
            <motion.span 
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white block transition-transform duration-300"
            ></motion.span>
          </button>
        </div>
      </div>

      {/* Menú móvil expandido */}
      <motion.div 
        className="lg:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-md z-40"
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: menuOpen ? 1 : 0,
          height: menuOpen ? "100vh" : 0
        }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        <div className="container mx-auto px-6 py-24 h-full flex flex-col justify-center">
          <nav className="flex flex-col items-center justify-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Link
                  to={link.target}
                  smooth={true}
                  spy={true}
                  offset={-100}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl text-white relative group cursor-pointer"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 
                    transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 20 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <a
              href="https://drive.google.com/file/d/1H1MzHUEjCHVqPzOOfYolavQqJZ8doXcb/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              onClick={() => setMenuOpen(false)}
            >
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium 
                transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30
                flex items-center gap-2">
                <span>Descargar CV</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:translate-x-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </button>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;