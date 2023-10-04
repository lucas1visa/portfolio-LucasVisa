import React from "react";
import { fadeIn } from "../variants";
import Img1 from "../assets/Screenshot_14.png";
import Img2 from "../assets/Screenshot_20.png";
import Img3 from "../assets/Screenshot_21.png";

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
              <p className="max-w-sm mb-16">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia recusandae provident odit architecto repellat incidunt
                itaque cupiditate aliquid, nulla dignissimos.
              </p>
              <button className="btn btn-sm ">Todos los proyectos</button>
            </div>
          <div className=" flex-1 ">

            {/* image */}
            <div className=" group relative overflow-hidden border-2 border-white/50 rounded-xl">
              {/* overlay */}
              <div className="group-hover:bg-black/70 w-full  h-full absolute z-40 transition-all duration-300"></div>
              {/* img */}
              <img
                className=" group-hover:scale-125 transition-all duration-500"
                src={Img3}
                alt=""
              />
              {/* pretitle */}
              <div className=" absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50">
                <span className="text-gradient">FullStack</span>
              </div>
              <div className=" absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50">
                <span className=" text-3x1 text-white">
                  ecoWise 'ecommerce'
                </span>
              </div>
              </div>
            </div>
          </div>
          <div className=" flex-1 ">
            {/* {image} */}
            <div className="flex-1 flex flex-col gap-y-[74px]">

            <div className=" group relative overflow-hidden border-2 border-white/50 rounded-xl">
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
              <div className=" absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50">
                <span className="text-gradient">FullStack</span>
              </div>
              <div className=" absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50">
                <span className=" text-3x1 text-white">
                 Cancha de turnos 'Padel'
                </span>
              </div>
            </div>
            <div className=" group relative overflow-hidden border-2 border-white/50 rounded-xl">
              {/* overlay */}
              <div className="group-hover:bg-black/70 w-full  h-full absolute z-40 transition-all duration-300"></div>
              {/* img */}
              <img
                className=" group-hover:scale-125 transition-all duration-500"
                src={Img2}
                alt=""
              />
              {/* pretitle */}
              <div className=" absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50">
                <span className="text-gradient">FullStack</span>
              </div>
              <div className=" absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50">
                <span className=" text-3x1 text-white">
                  VAGUJGELYI 'ecommerce'
                </span>
              </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </section>
  );
};

export default Work;
