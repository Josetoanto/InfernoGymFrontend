import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate desde react-router-dom
import HeaderUsers from "../template/HeaderUsers";

const Ejercicios = () => {
    const navigate = useNavigate(); // Inicializa el hook useNavigate

    // Función para manejar la navegación
    const handleAddExercise = () => {
        navigate("/agregarEjercicio"); // Redirige a la página /agregarEjercicio
    };

    return (
        <>
            <HeaderUsers prompt={"Nombre de usuario"}></HeaderUsers>
            <div id="contentEjercicios">
                <div id="ejerciciosForm">
                    <div id="ejerciciosBox"><h1>Ejercicio 1</h1></div>
                    <div id="ejerciciosBox"><h1>Ejercicio 2</h1></div>
                    <div id="ejerciciosBox"><h1>Ejercicio 3</h1></div>
                    <div id="ejerciciosBox"><h1>Ejercicio 4</h1></div>
                    <div id="ejerciciosBox"><h1>Ejercicio 5</h1></div>
                    <div id="ejerciciosBtns">
                        <button id="AgregarEjercicioBtn" onClick={handleAddExercise}>Agregar</button>
                        <button id="MoverseEjercicioBtn">Anterior</button>
                        <button id="MoverseEjercicioBtn">Siguiente</button>
                    </div>
                </div>
                <div id="dietaBox"><h1>Dieta</h1></div>
            </div>
        </>
    );
}

export default Ejercicios;
