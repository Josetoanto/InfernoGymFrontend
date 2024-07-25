import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderUsers from "../template/HeaderUsers";
import LocalStorage from "../../models/LocalStorage.mjs"; // Ajusta la ruta si es necesario

const Ejercicios = () => {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const exercisesPerPage = 3;
    const userId = LocalStorage.getUserInfo()?.user_id;
    const token = LocalStorage.getItem("token");

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(`https://p83c9dw9-8000.use2.devtunnels.ms/api/exercise/user-exercises/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setExercises(data);
                } else {
                    console.error('Error al obtener los ejercicios:', data);
                }
            } catch (error) {
                console.error('Error al conectar con la API:', error);
            }
        };

        fetchExercises();
    }, [userId, token]);

    const handleAddExercise = () => {
        navigate("/agregarEjercicio");
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(exercises.length / exercisesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Obtener los ejercicios de la página actual
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

    return (
        <>
            <HeaderUsers prompt={"Nombre de usuario"} />
            <div id="contentEjercicios">
                <div id="ejerciciosForm">
                    {currentExercises.length > 0 ? (
                        currentExercises.map((exercise, index) => (
                            <div key={index} id="ejerciciosBox">
                                <h1>{exercise.exercise_name}</h1>
                                <h3>Peso: {exercise.weightexercise}</h3>
                                <h3>Series: {exercise.series}</h3>
                                <h3>Repeticiones: {exercise.repetitions}</h3>
                                <h3>Día: {exercise.day}</h3>
                            </div>
                        ))
                    ) : (
                        <div id="ejerciciosBox">
                            <h1>Ejercicios vacío</h1>
                        </div>
                    )}
                    <div id="ejerciciosBtns">
                        <button id="AgregarEjercicioBtn" onClick={handleAddExercise}>Agregar</button>
                        <button id="MoverseEjercicioBtn" onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
                        <button id="MoverseEjercicioBtn" onClick={handleNextPage} disabled={currentPage === Math.ceil(exercises.length / exercisesPerPage)}>Siguiente</button>
                    </div>
                </div>
                <div id="dietaBox"><h1>Dieta</h1></div>
            </div>
        </>
    );
}

export default Ejercicios;
