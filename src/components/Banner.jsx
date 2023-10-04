import React from "react";
// imagenes
import Image from "../assets/LucasVisa.jpg";
//iconos
import { FaGithub, FaLinkedin } from "react-icons/fa";
// animaciones
import { TypeAnimation } from "react-type-animation";
// movimientos
import { motion } from "framer-motion";
// variantes
import { fadeIn } from "../variants";

const Banner = () => {
  return (
    <section
      className="min-h-[75vh] lg:min-h-[72vh] flex items-center"
      id="home"
    >
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12">
          {/* texto */}
          <div className="flex-1 text-center font-secondary lg:text-left">
            <motion.h1
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className="text-[55px] font-bold leading-[0.8] lg:text-[110] uppercase"
            >
              Lucas <span>Visa</span>
            </motion.h1>
            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className="mb-6 text-[36px] lg:text-[60] font-secondary font-semibold uppercase leading-[1]"
            >
              <span className="mr-4 text-white">Soy </span>
              <TypeAnimation
                sequence={["Desarrollador", 2000, "Full Stack", 2000]}
                speed={50}
                className="text-accent"
                wrapper="span"
                repeat={Infinity}
              />
            </motion.div>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className="mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              quod eos. Harum officia quos id itaque dolorem soluta, fuga at.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              quod eos. Harum officia quos id itaque dolorem soluta, fuga at.
            </motion.p>
            <motion.div
              className="flex max-w-max gap-x-6 items-center mb-12 mx-auto lg:mx-0"
              variants={fadeIn("up", 0.7)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
            >
              <button className="btn btn-lg ">Contactame</button>
              <a href="" className="text-gradient btn-link">
                Mi Portafolio
              </a>
            </motion.div>
            {/* Sociales */}
            <motion.div
              className="flex text-[20px] gap-x-6 max-w-max mx-auto lg:mx-0"
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
            >
              <a href="#">
                <FaGithub />
              </a>
              <a href="#">
                <FaLinkedin />
              </a>
            </motion.div>
          </div>

          {/* Imagen */}
          <motion.div
             variants={fadeIn("down", 0.5)}
             initial="hidden"
             whileInView={"show"}
              className="hidden lg:flex flex-1 max-w-[320px] lg:max-w-[482px]">
            <img className="rounded-[220px] transition-opacity" src={Image} alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
