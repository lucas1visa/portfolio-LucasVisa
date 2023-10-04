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
    descriptions:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, corrupti.",
  },
  {
    name: "Frontend",
    descriptions:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, corrupti.",
  },
  {
    name: "Backend",
    descriptions:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, corrupti.",
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
              {" "}
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repudiandae, facere.
            </h3>
            <button className="btn btn-sm">Mis trabajos</button>
          </div>
          {/* services */}
          <div>
            {/* service */}
            {servicios.map((service, index) => {
              // destructurar servicios
              const {name, descriptions} =service
              return (
                <div className='border-b border-white/20 h-[146px] mb-[38px] flex'key={index}>
                  <div className="max-w-[476px]">
                    <h4 className="text-[20px] tracking-wider font-primary font-semibold mb-6">
                      {name}
                      <p className="font-secondary leading-tight">{descriptions}</p>
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
