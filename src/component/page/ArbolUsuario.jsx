import React from "react";
import HeaderUsers from "../template/HeaderUsers";
import root from '../../assets/root.png'
import Footer from "../template/Footer";

const ArbolUsuario = () => {
    return (
        <>
        <HeaderUsers prompt={"Nombre Usuario"}></HeaderUsers>
        <div id="ContentArbol">
            <div id="ProgressArbol">
                <div id="ProgressDiv"><h1>Progreso:</h1></div>
                <div id="ProgressDiv"><h1>Mientras mejor sea tu progreso , mayor sera el crecimiento de tu arbolito</h1></div>
            </div>
            <div id="Arbol"><img id = "ArbolImagen" src={root} alt="" /></div>
        </div>
        <Footer></Footer>
        </>
    );
}
export default ArbolUsuario;