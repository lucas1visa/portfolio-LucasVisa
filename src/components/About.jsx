import React from "react";
// contup
import CountUp from "react-countup";
// intersection observer hook
import { useInView } from "react-intersection-observer";
// motion
import { motion } from "framer-motion";
// variant
import { fadeIn } from "../variants";
const About = () => {
  const [ref, inView] = useInView({
    thereshold: 0.5,
  });
  return (
    <section id="about" className=" section" ref={ref}>
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-10 lg:flex-row items-center lg:gap-x-20 lg:gap-y-0 h-screen" > 
          {/* Image */}
          {/* <div className="flex-1 bg-about bg-contain bg-no-repeat h-[640px] mix-blend-lighten bg-top">
            {/* <img src="" alt="" />*/}
          {/* </div>  */}
          {/* text */}
          <motion.div className="flex-1"
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          whileInView={"show"}>
            <h2 className=" h2 text-accent"
             >Acerca de mi</h2>
            <h3 className="h3 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h3>
            <p className="mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Rerum voluptatum quam, corrupti quaerat ratione ab ex
                nesciunt doloribus aperiam necessitatibus.</p>
                {/* stast */}
                <div className="flex gap-x-6 lg:gap-x-10 mb-12">
                  <div>
                    <div className="text-[40px] font-tertiary text-gradient mb-2">
                      {
                        inView? <CountUp start={0} end={2} duration={13}/>:null}
                    </div>
                    <div className=" font-primary text-sm tracking-[2px]">
                      Años de <br />Experiencia
                    </div>
                  </div>
                  <div>
                    <div className="text-[40px] font-tertiary text-gradient mb-2">
                      {
                        inView? <CountUp start={0} end={5} duration={10}/>:null}
                    </div>
                    <div className=" font-primary text-sm tracking-[2px]">
                      Projectos<br />Completados
                    </div>
                  </div>
                  <div>
                    <div className="text-[40px] font-tertiary text-gradient mb-2">
                      {
                        inView? <CountUp start={0} end={2} duration={12}/>:null}
                    </div>
                    <div className=" font-primary text-sm tracking-[2px]">
                      Clientes <br />Sastifechos 
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-8 items-center">
                  <button className="btn btn-lg">Contactame</button>
                  <a href="#" className="text-gradient btn-link">Mi Portafolio</a>
                </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;