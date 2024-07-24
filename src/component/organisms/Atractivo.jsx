import React from "react";
import gym from '../../assets/gym.jpeg'

const Atractivo = () => {
    return(
        <>
        <div id = "divMitad"> Lleva tu cuerpo al limite con Inferno Gym, la mejor pagina para llevar un  registro de tus  entrenamientos
        </div>
        <img id = "gymImage" src={gym} alt="" />
        </>
    );
}

export default Atractivo