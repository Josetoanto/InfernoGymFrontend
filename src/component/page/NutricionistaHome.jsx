import React from "react";
import HeaderCoach from "../template/HeaderCoach";

const NutricionistaHome = () => {
    return (
        <>
        <HeaderCoach prompt={"Coach nombre coach"}></HeaderCoach>
        <div id="UsuariosCoachBox">
            <div id="">
                <div id="BuscadorTitulo">BUSCADOR DE USUARIOS</div>
                <input id="BuscadorUsuarios" type="text" placeholder="Buscar" />
            </div>
            <div>
            <div id="informacionUsuarioTitulo">INFORMACION DEL USUARIO</div>
                <div id="informacionUsuarioBoxNutricionista">
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
                    <h1 id="RutinaUsuarioTitulo">DIETA ACTUAL:</h1>
                    <div id="Dieta1">
                    <p className="ejercicios">Dieta</p>
                    </div>
                    <div className="BotonesInformacionUsuario">
                        <button id="ModificarDieta">Modificar</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default NutricionistaHome