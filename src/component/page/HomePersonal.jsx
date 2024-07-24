import React from "react";
import HeaderCoach from "../template/HeaderCoach";
import Cbum from '../../assets/cbum.jpg'

const HomePersonal = () => {
    return(
    <div id="bodyHome">    
    <HeaderCoach prompt={"Inicio"}></HeaderCoach>
    <div id="HomeBox">
        <div>
        <img id = "cbumImg" src={Cbum} alt="" />
        </div>
        <div id="EsloganHome">
            <h1>
            "En Inferno Gym, con tu guía y pasión, transformamos el sudor en pura motivación."
            </h1>
        </div>
    </div>
    </div>
    );
}

export default HomePersonal