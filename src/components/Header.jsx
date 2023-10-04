import React from "react";
//imagenes
import Logo from "../assets/—Pngtree—letter l logo design png_6011236 (1).png";
const Header = () => {
  return (
    <header className=" flex justify-between py-8">
      <div className=" flex justify-between container mx-auto items-center ">
        <div className="flex justify-between items-center">
          {/* logo */}
          <a href="#"></a>
          <img src={Logo} alt="" width={60}/>
          {/* boton */}
        </div>
          <button className=" btn btn-sm">Descargar CV</button>
      </div>
    </header>
  );
};

export default Header;
