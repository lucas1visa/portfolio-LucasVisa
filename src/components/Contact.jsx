import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

const Contact = () => {
  // Estado para manejar el formulario
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    submitted: false,
    loading: false
  });

  // Función para manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({ ...formState, loading: true });
    
    // Simulando envío (aquí puedes integrar tu lógica real de envío)
    setTimeout(() => {
      setFormState({
        ...formState,
        submitted: true,
        loading: false
      });
    }, 1500);
  };

  return (
    <section 
      className='py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900' 
      id='contact'
    >
      {/* Partículas decorativas (círculos) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/5 to-transparent blur-3xl"></div>
      </div>

      <div className='container mx-auto px-6 relative z-10'>
        <div className='flex flex-col lg:flex-row gap-16 items-center'>
          {/* Texto */}
          <motion.div 
            className='lg:flex-1 text-center lg:text-left'
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className='bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 shadow-lg shadow-purple-500/10'>
              <h4 className='text-xl uppercase bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent font-medium mb-4 tracking-wide'>
                Ponete en contacto
              </h4>
              <h2 className='text-4xl lg:text-6xl font-bold leading-tight mb-8 text-white'>
                Vamos a trabajar <br />
                <span className='bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent'>juntos</span>
              </h2>
              
              <div className="mb-6 space-y-4">
                <div className="flex items-center gap-4 text-gray-300 group">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/70 
                    border border-cyan-500/30 group-hover:border-cyan-500/60 transition-all duration-300">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <span className="group-hover:text-white transition-colors duration-300">info@tucorreo.com</span>
                </div>
                
                <div className="flex items-center gap-4 text-gray-300 group">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/70 
                    border border-purple-500/30 group-hover:border-purple-500/60 transition-all duration-300">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <span className="group-hover:text-white transition-colors duration-300">+54 123 456 7890</span>
                </div>
                
                <div className="flex items-center gap-4 text-gray-300 group">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/70 
                    border border-cyan-500/30 group-hover:border-cyan-500/60 transition-all duration-300">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <span className="group-hover:text-white transition-colors duration-300">Buenos Aires, Argentina</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Formulario */}
          <motion.div 
            className='lg:flex-1 w-full'
            variants={fadeIn("left", 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            {!formState.submitted ? (
              <form 
                onSubmit={handleSubmit}
                className='w-full border border-white/10 rounded-2xl bg-gray-800/20 backdrop-blur-sm 
                  flex flex-col gap-y-8 p-8 shadow-xl shadow-purple-500/5'
              >
                <div className="relative group">
                  <input 
                    className='bg-transparent border-b border-gray-500 py-4 outline-none w-full 
                      placeholder:text-gray-400 focus:border-cyan-500 transition-all peer'
                    type='text'
                    placeholder=' '
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                  <label 
                    className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all 
                      peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 
                      peer-focus:-top-3.5 peer-focus:text-cyan-400 peer-focus:text-sm"
                  >
                    Nombre
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 
                    transition-all duration-300 group-hover:w-1/4 peer-focus:w-full"></div>
                </div>
                
                <div className="relative group">
                  <input 
                    className='bg-transparent border-b border-gray-500 py-4 outline-none w-full 
                      placeholder:text-gray-400 focus:border-purple-500 transition-all peer'
                    type='email'
                    placeholder=' '
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                  <label 
                    className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all 
                      peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 
                      peer-focus:-top-3.5 peer-focus:text-purple-400 peer-focus:text-sm"
                  >
                    Email
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 
                    transition-all duration-300 group-hover:w-1/4 peer-focus:w-full"></div>
                </div>
                
                <div className="relative group">
                  <textarea 
                    className='bg-transparent border-b border-gray-500 py-4 outline-none w-full min-h-[120px]
                      placeholder:text-gray-400 focus:border-cyan-500 transition-all resize-none peer'
                    placeholder=' '
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <label 
                    className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all 
                      peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 
                      peer-focus:-top-3.5 peer-focus:text-cyan-400 peer-focus:text-sm"
                  >
                    Mensaje
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 
                    transition-all duration-300 group-hover:w-1/4 peer-focus:w-full"></div>
                </div>
                
                <button 
                  type="submit"
                  disabled={formState.loading}
                  className="mt-4 self-start btn btn-lg px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 
                    rounded-xl text-white font-medium transform transition-all duration-300 
                    hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 flex items-center 
                    disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formState.loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="w-full h-full min-h-[400px] border border-white/10 rounded-2xl bg-gray-800/20 backdrop-blur-sm 
                flex flex-col items-center justify-center gap-y-6 p-8 shadow-xl shadow-purple-500/5 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">¡Mensaje enviado con éxito!</h3>
                <p className="text-gray-300 max-w-md">
                  Gracias por ponerte en contacto. Responderé a tu mensaje lo antes posible.
                </p>
                <button 
                  onClick={() => setFormState({ name: '', email: '', message: '', submitted: false, loading: false })}
                  className="mt-4 px-6 py-3 bg-gray-800 border border-white/10 rounded-xl text-white 
                    transition-all duration-300 hover:border-cyan-500/50"
                >
                  Enviar otro mensaje
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;