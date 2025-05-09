import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BiHomeAlt, BiUser } from "react-icons/bi";
import { BsClipboardData, BsBriefcase, BsChatSquareText } from "react-icons/bs";
import { Link } from "react-scroll";

const Nav = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Controlar visibilidad basada en dirección del scroll
  useEffect(() => {
    const handleScroll = () => {
      // Si estamos cerca del fondo de la página, siempre mostrar la navegación
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      
      if (isNearBottom) {
        setVisible(true);
      } else {
        // Ocultar navegación cuando se desplaza hacia abajo, mostrar cuando se desplaza hacia arriba
        if (window.scrollY > lastScrollY && window.scrollY > 200) { // Scrolling down
          setVisible(false);
        } else { // Scrolling up
          setVisible(true);
        }
      }
      
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Enlaces de navegación
  const navLinks = [
    { name: "Inicio", to: "home", icon: <BiHomeAlt className="text-xl" /> },
    { name: "Sobre Mí", to: "about", icon: <BiUser className="text-xl" /> },
    { name: "Servicios", to: "services", icon: <BsClipboardData className="text-xl" /> },
    { name: "Proyectos", to: "work", icon: <BsBriefcase className="text-xl" /> },
    { name: "Contacto", to: "contact", icon: <BsChatSquareText className="text-xl" /> },
  ];

  // Establecer sección activa cuando se cambia
  const handleSetActive = (to) => {
    setActiveSection(to);
  };

  // Variantes para animación de la barra de navegación
  const navVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.nav
      className="fixed bottom-4 lg:bottom-8 w-full overflow-hidden z-50 px-4"
      initial="hidden"
      animate={visible ? "visible" : "exit"}
      variants={navVariants}
    >
      <div className="container mx-auto">
        {/* Barra de navegación */}
        <div className="w-full bg-gray-900/70 backdrop-blur-md rounded-full max-w-[460px] mx-auto px-4 
          border border-white/10 shadow-lg shadow-black/20 flex justify-between items-center h-16">
          
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              offset={link.to === "home" ? -200 : 0}
              activeClass="active"
              onSetActive={() => handleSetActive(link.to)}
              smooth={true}
              spy={true}
              className="relative group cursor-pointer"
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-full 
                transition-all duration-300 relative z-10
                ${activeSection === link.to 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'}`}
              >
                {/* Indicador de sección activa */}
                {activeSection === link.to && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 -z-10"
                    layoutId="activeSection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Icono */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {link.icon}
                </motion.div>
                
                {/* Tooltip con nombre de sección */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white 
                  text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity 
                  duration-200 pointer-events-none whitespace-nowrap">
                  {link.name}
                </div>
              </div>
            </Link>
          ))}
          
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;