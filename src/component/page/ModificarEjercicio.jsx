import React from "react";
import Flecha from "../atom/Flecha";
import pesa from '../../assets/weight.png'

const ModificarEjercicio = () => {
    return(
        <>
        <div id="AgregarEjercicioPage">
            <div id = "AgregarEjercicioBox">
                <div id = "inputsEjerciciosBox">
                    <div id="agregarEjercicioTitulo"><h1>Modificar ejercicio</h1> <img id="pesaImg" src={pesa} alt="" /></div>
                    <div><input type="text" name="" id="nombreEjercicio" placeholder="Nombre" /></div>
                    <div><input type="text" id="pesoEjercicio" placeholder="Peso" /></div>
                    <div><input type="text" name="" id="seriesEjercicio" placeholder="Series" /></div>
                    <div id="repDaysEjercicio">
                        <input type="text" name="" id="repeticionesEjercicios" placeholder="Repeticiones" />
                        <select type="text" name="" id="diaEjercicio">
                            <option value="lunes">Lunes</option>
                            <option value="martes">Martes</option>
                            <option value="miércoles">Miércoles</option>
                            <option value="jueves">Jueves</option>
                            <option value="viernes">Viernes</option>
                            <option value="sábado">Sábado</option>
                        </select>
                    </div>
                    <div id="agregarEjercicioBtnBox"><button id="agregarEjercicioBtn">Modificar</button></div>
                </div>
            </div>
        <Flecha></Flecha>
        </div>
        </>
    );
}

export default ModificarEjercicio