import React from 'react';
import { fadeIn } from '../variants';
const Contact = () => {
  return <section className='py-16 lg:section' id='contact'>
    <div className='container mx-auto'>
      <div className='flex flex-col lg:flex-row'>
        {/* text */}
        <div className='flex 1 items-center px-10'>
          <div>
            <h4 className='text-xl uppercase text-accent font-medium mb-2 tracking-wide text-left'>Ponete en contacto</h4>
            <h2 className='text-[35px] lg:text-[90px] leading-none mb-12'>Vamos a trabajar <br />juntos</h2>
          </div>
        </div>
        {/* formulkario */}
        <form className='flex-1 border rounded-2xl flex flex-col gap-y-10 pb-24 p-6 items-start'>
          <input className=' bg-transparent border-b py-3 outline-none
           w-full placeholder:text-white focus:border-accent transition-all' type='text'
          placeholder='Nombre' />
          <input className=' bg-transparent border-b py-3 outline-none
           w-full placeholder:text-white focus:border-accent transition-all' type='text'
          placeholder='Email' />
         <textarea className=' bg-transparent border-b py-3 outline-none
           w-full placeholder:text-white focus:border-accent transition-all mb-12'
           placeholder='Mensaje'></textarea>
           <button className='btn btn-lg'>Enviar mensaje</button>
        </form>
      </div>
    </div>
  </section>;
};

export default Contact;
