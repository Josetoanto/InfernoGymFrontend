import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderUsers from "../template/HeaderUsers";
import LocalStorage from "../../models/LocalStorage.mjs"; // Ajusta la ruta si es necesario

const Calendario = () => {
    const [groupedExercises, setGroupedExercises] = useState({
        lunes: [],
        martes: [],
        miércoles: [],
        jueves: [],
        viernes: [],
        sábado: [],
        domingo: [] // Incluyendo el domingo si es necesario
    });

    const navigate = useNavigate();
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

                if (data) {
                    // Mapeo de índice del día a nombres de días
                    const dayMap = {
                        1: 'lunes',
                        2: 'martes',
                        3: 'miércoles',
                        4: 'jueves',
                        5: 'viernes',
                        6: 'sábado',
                        7: 'domingo'
                    };

                    // Agrupación de ejercicios por día
                    const grouped = data.reduce((acc, exercise) => {
                        const dayName = dayMap[exercise.day_of_week] || 'lunes'; // Por defecto 'lunes' si no hay coincidencia
                        if (acc[dayName]) {
                            acc[dayName].push(exercise);
                        } else {
                            acc[dayName] = [exercise];
                        }
                        return acc;
                    }, {
                        lunes: [],
                        martes: [],
                        miércoles: [],
                        jueves: [],
                        viernes: [],
                        sábado: [],
                        domingo: [] // Asegúrate de incluir el domingo en el mapeo
                    });

                    setGroupedExercises(grouped);
                } else {
                    console.error('Error al obtener los ejercicios:', await response.json());
                }
            } catch (error) {
                console.error('Error al conectar con la API:', error);
            }
        };

        fetchExercises();
    }, [userId, token]);

    return (
        <div className="calendario" id="FlexBox">
            <div id="PrimerosDias">
                <div id="Largo">
                    <h1 className="calendarioTitulo">Lunes</h1>
                    {groupedExercises.lunes.length > 0 ? (
                        groupedExercises.lunes.map((exercise, index) => (
                            <div key={index}>
                                <p>{exercise.exercise_name}</p>
                                <p>Peso: {exercise.weightexercise}</p>
                                <p>Series: {exercise.series}</p>
                                <p>Repeticiones: {exercise.repetitions}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay ejercicios para este día</p>
                    )}
                </div>
                <div id="Corto">
                    <h1 className="calendarioTitulo">Martes</h1>
                    {groupedExercises.martes.length > 0 ? (
                        groupedExercises.martes.map((exercise, index) => (
                            <div key={index}>
                                <p>{exercise.exercise_name}</p>
                                <p>Peso: {exercise.weightexercise}</p>
                                <p>Series: {exercise.series}</p>
                                <p>Repeticiones: {exercise.repetitions}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay ejercicios para este día</p>
                    )}
                </div>
            </div>
            <div id="PrimerosDias">
                <div id="Largo">
                    <h1 className="calendarioTitulo">Miércoles</h1>
                    {groupedExercises.miércoles.length > 0 ? (
                        groupedExercises.miércoles.map((exercise, index) => (
                            <div key={index}>
                                <p>{exercise.exercise_name}</p>
                                <p>Peso: {exercise.weightexercise}</p>
                                <p>Series: {exercise.series}</p>
                                <p>Repeticiones: {exercise.repetitions}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay ejercicios para este día</p>
                    )}
                </div>
                <div id="Corto">
                    <h1 className="calendarioTitulo">Jueves</h1>
                    {groupedExercises.jueves.length > 0 ? (
                        groupedExercises.jueves.map((exercise, index) => (
                            <div key={index}>
                                <p>{exercise.exercise_name}</p>
                                <p>Peso: {exercise.weightexercise}</p>
                                <p>Series: {exercise.series}</p>
                                <p>Repeticiones: {exercise.repetitions}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay ejercicios para este día</p>
                    )}
                </div>
            </div>
            <div id="UltimosDias">
                <div id="Corto">
                    <h1 className="calendarioTitulo">Viernes</h1>
                    {groupedExercises.viernes.length > 0 ? (
                        groupedExercises.viernes.map((exercise, index) => (
                            <div key={index}>
                                <p>{exercise.exercise_name}</p>
                                <p>Peso: {exercise.weightexercise}</p>
                                <p>Series: {exercise.series}</p>
                                <p>Repeticiones: {exercise.repetitions}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay ejercicios para este día</p>
                    )}
                </div>
                <div id="Corto">
                    <h1 className="calendarioTitulo">Sábado</h1>
                    {groupedExercises.sábado.length > 0 ? (
                        groupedExercises.sábado.map((exercise, index) => (
                            <div key={index}>
                                <p>{exercise.exercise_name}</p>
                                <p>Peso: {exercise.weightexercise}</p>
                                <p>Series: {exercise.series}</p>
                                <p>Repeticiones: {exercise.repetitions}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay ejercicios para este día</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calendario;
