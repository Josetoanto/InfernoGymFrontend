import React from "react";
import flecha from '../../assets/arrow.png'
import { useNavigate } from "react-router-dom";

const Flecha = () => {
    const navigate = useNavigate();

    const regresar = () => {
        navigate(-1)
    }
    return(
        <div>
            <button onClick={regresar} id = "flechaBtn"><img id = "flecha" src={flecha} alt="" /></button>
        </div>
    );
}

export default Flecha