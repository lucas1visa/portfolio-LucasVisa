import React from "react";
//icon
import { BsArrowUpRight } from "react-icons/bs";
//motion
import { motion } from "framer-motion";
//variants
import { fadeIn } from "../variants";

const servicios = [
  {
    name: "Full Stack",
    description:
      `Ofrezco servicios como desarrollador Full Stack con experiencia 
      en el diseño de servidores y en la creación de atractivos diseños Frontend.`,
  },
  {
    name: "Frontend",
    description:
      `Como parte de mis servicios, me especializo en la creación de interfaces de usuario atractivas y funcionales utilizando tecnologías web modernas.`,
  },
  {
    name: "Backend",
    description:
      `En el diseño de servidores, tengo experiencia en desarrollar la lógica y 
      la funcionalidad detrás de las aplicaciones web, asegurando su funcionamiento sólido y eficiente.
     `,
  },
];

const Services = () => {
  return (
    <section className="section" id="services">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* text */}
          <div className="flex-1 lg:bg-services lg:bg-bottom bg-no-repeat mix-blend-lighten  mb-12 lg:mb-0">
            <h2 className="h2 text-accent mb-6">Lo que hago</h2>
            <h3 className="h3 max-w-[455px] mb-16">
            Me Enfocado en brindar soluciones web completas y atractivas.
            </h3>
            <button className="btn btn-sm">Mis trabajos</button>
          </div>
          {/* services */}
          <div>
            {/* service */}
            {servicios.map((service, index) => {
              // destructurar servicios
              const {name, description} =service
              return (
                <div className='border-b border-white/20 h-[146px] mb-[38px] flex'key={index}>
                  <div className="max-w-[476px]">
                    <h4 className="text-[20px] tracking-wider font-primary font-semibold mb-6">
                      {name}
                      <p className="font-secondary leading-tight">{description}</p>
                    </h4>
                  </div>
                  <div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
