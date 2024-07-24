import React from "react";
import HeaderCoach from "../template/HeaderCoach";

const CoachHome = () => {
    return(
        <>
        <HeaderCoach prompt={"Coach nombre coach"}></HeaderCoach>
        <div id="UsuariosCoachBox">
            <div id="">
                <div id="BuscadorTitulo">BUSCADOR DE USUARIOS</div>
                <input id="BuscadorUsuarios" type="text" placeholder="Buscar" />
            </div>
            <div>
            <div id="informacionUsuarioTitulo">INFORMACION DEL USUARIO</div>
                <div id="informacionUsuarioBox">
                    <select id="SelectDayBtn" >
                        <option value="lunes">Lunes</option>
                        <option value="martes">Martes</option>
                        <option value="miércoles">Miércoles</option>
                        <option value="jueves">Jueves</option>
                        <option value="viernes">Viernes</option>
                        <option value="sábado">Sábado</option>
                    </select>
                    <div id="InformacionUsuario">
                        Nombre: 
                        <br/>
                        Objetivo:
                        <br/>
                        Progreso:
                        <br/>
                        Peso:
                        <br/>
                        Altura
                        <br />
                    </div>
                    <h1 id="RutinaUsuarioTitulo">RUTINA ACTUAL:</h1>
                    <div id="Ejercicio1">
                    <p className="ejercicios">Ejercicio 1</p>
                    <button id="ModificarBtn1">Modificar</button>
                    </div>
                    <div id="Ejercicio2">
                    <p className="ejercicios">Ejercicio 2</p>
                    <button id="ModificarBtn2">Modificar</button>
                    </div>
                    <div id="Ejercicio3">
                    <p className="ejercicios">Ejercicio 3</p>
                    <button id="ModificarBtn3">Modificar</button>
                    </div>
                    <div className="BotonesInformacionUsuario">
                        <button>Anterior</button>
                        <button>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default CoachHome