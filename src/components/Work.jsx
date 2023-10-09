import React from "react";
import { fadeIn } from "../variants";
import Img1 from "../assets/Imagen1.jpg";
import Img2 from "../assets/Imagen3.jpg";
import Img3 from "../assets/Imagen2.jpg";

const Work = () => {
  return (
    <section className=" section" id="work">
      <div className="container mx-auto">
        <div className=" flex flex-col lg:flex-row gap-x-10">
          <div className="flex-1 flex flex-col gap-y-12 mb-10 lg:mb-0">
            {/* text */}
            <div>
              <h2 className="h2 leading-tight text-accent">
                Mi Ultimo <br />
                Trabajo
              </h2>
              <p className="max-w-sm mb-9">
                En mi trabajo más reciente, un proyecto para una concesionaria
                de automóviles, donde se enfatizó la creación de una interfaz de
                usuario atractiva y altamente funcional. Este proyecto abarcó
                tanto la venta como el alquiler de vehículos.
              </p>
              <a
                href="https://github.com/lucas1visa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-sm ">Todos los proyectos</button>
              </a>
            </div>
            <div className=" flex-1 ">
              {/* image */}
              <div className=" group relative overflow-hidden border-2 border-white/50 rounded-xl">
                {/* overlay */}
                <a
                  href="https://ecowise-web-site.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group-hover:bg-black/70 w-full  h-full absolute z-40 transition-all duration-300"></div>
                  {/* img */}
                  <img
                    className=" group-hover:scale-125 transition-all duration-500"
                    src={Img3}
                    alt=""
                  />
                  {/* pretitle */}
                  <div className=" absolute -bottom-full left-12 group-hover:bottom-[240px] transition-all duration-500 z-50">
                    <span className="text-gradient">FullStack</span>
                    <h3 className="text-gradient text-white">
                      ecoWise 'ecommerce'
                    </h3>
                  </div>
                  <div className=" absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50">
                    <span className=" text-3x1 text-white">
                      • React.js • Redux.js • JavaScript • CSS • HTML • Tailwind
                      • Express.js • Node.js •PostgreSQL • Sequelize
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className=" flex-1 ">
            {/* {image} */}
            <div className="flex-1 flex flex-col gap-y-[74px]">
              <div className=" group relative overflow-hidden border-2 border-white/50 rounded-xl">
                <a
                  href="https://wheel-wonders.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                {/* overlay */}
                <div className="group-hover:bg-black/70 w-full  h-full absolute z-40 transition-all duration-300"></div>
                {/* img */}
                <img
                  className=" group-hover:scale-125 transition-all duration-500"
                  src={Img1}
                  alt=""
                />
                {/* pretitle */}
                <div></div>
                  <div className=" absolute -bottom-full left-12 group-hover:bottom-[240px] transition-all duration-500 z-50">
                    <span className="text-gradient">Frontend</span>
                    <h3 className="text-gradient text-white">WheelWonders</h3>
                  </div>
                  <div className=" absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50">
                    <span className=" text-3x1 text-white">
                      • React.js • Next.js • JavaScript • CSS • HTML • Tailwind
                    </span>
                  </div>
                </a>
              </div>
              <div className=" group relative overflow-hidden border-2 border-white/50 rounded-xl">
                {/* overlay */}
                <a
                  href="https://count-down-lime-six.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group-hover:bg-black/70 w-full  h-full absolute z-40 transition-all duration-300"></div>
                  {/* img */}
                  <img
                    className=" group-hover:scale-125 transition-all duration-500"
                    src={Img2}
                    alt=""
                  />
                  {/* pretitle */}
                  <div className=" absolute -bottom-full left-12 group-hover:bottom-[240px] transition-all duration-500 z-50">
                    <span className="text-gradient">Frontend</span>
                    <h3 className="text-gradient text-white">Countdown</h3>
                  </div>
                  <div className=" absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50">
                    <span className=" text-3x1 text-white">
                      • HTML• JavaScript • Css • React JS
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
