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
// import imege14 from "../assets/Icons/icons14.png";
import { Link } from "react-scroll";

const images = [imege1, imege2, imege3, imege4, imege5, imege6, imege7];
const images2 = [imege8, imege9, imege10, imege11, imege12, imege13];

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
                sequence={["Desarrollador Web", 2000, "Full Stack", 2000]}
                speed={50}
                className="text-accent"
                wrapper="span"
                repeat={Infinity}
              />
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className="mb-8 flex flex justify-between max-w-lg mx-auto lg:mx-0 "
            >
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Imagen ${index + 2}`} />
              ))}
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className="mb-8 flex flex justify-between max-w-lg mx-auto lg:mx-0 "
            >
              {images2.map((image, index) => (
                <img key={index} src={image} alt={`Imagen ${index + 2}`} />
              ))}
            </motion.div>
            <motion.div
              className="flex max-w-max gap-x-6 items-center mb-12 mx-auto lg:mx-0"
              variants={fadeIn("up", 0.7)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
            >
              <Link
                to="contact"
                className="text-gradient btn-link"
                smooth={true}
                spy={true}
              >
              <button className="btn btn-lg ">Contactame</button>
              </Link>

              <Link
                to="work"
                className="text-gradient btn-link"
                smooth={true}
                spy={true}
              >
                Mis Proyectos
              </Link>
            </motion.div>
            {/* Sociales */}
            <motion.div
              className="flex text-[20px] gap-x-6 max-w-max mx-auto lg:mx-0"
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
            >
              <a href="https://github.com/lucas1visa">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/lucas-visa-157397261/">
                <FaLinkedin />
              </a>
            </motion.div>
          </div>

          {/* Imagen */}
          <motion.div
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            whileInView={"show"}
            className="hidden lg:flex flex-1 max-w-[320px] lg:max-w-[482px]"
          >
            <img
              className="rounded-[220px] transition-opacity"
              src={Image}
              alt=""
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
