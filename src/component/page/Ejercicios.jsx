import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderUsers from "../template/HeaderUsers";
import LocalStorage from "../../models/LocalStorage.mjs"; // Ajusta la ruta si es necesario
import corona from '../../assets/crown.png';

const dayMapping = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const Ejercicios = () => {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dieta, setDieta] = useState(null);
    const [subscriptionType, setSubscriptionType] = useState(null);
    const exercisesPerPage = 3; // Cambiado a 3
    const userId = LocalStorage.getUserInfo()?.user_id;
    const token = LocalStorage.getItem("token");

    useEffect(() => {
        const fetchUserInfo = async () => {
            // Fetch user info to get subscription type
            const userInfo = LocalStorage.getUserInfo();
            setSubscriptionType(userInfo.subscription_id);
        };

        const fetchExercises = async () => {
            try {
                const response = await fetch(`https://infernogymapi.integrador.xyz/api/exercise/user-exercises/${userId}`, {
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

        fetchUserInfo();
        fetchExercises();
    }, [userId, token]);

    useEffect(() => {
        const fetchDieta = async () => {
            if (subscriptionType === 2) {
                try {
                    const response = await fetch(`https://infernogymapi.integrador.xyz/api/diete/user/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setDieta(data);
                        console.log(data)
                    } else {
                        console.error('Error al obtener la dieta:', data);
                    }
                } catch (error) {
                    console.error('Error al conectar con la API:', error);
                }
            }
        };

        fetchDieta();
    }, [subscriptionType, userId, token]);

    const handleAddExercise = () => {
        navigate("/agregarEjercicio");
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(exercises.length / exercisesPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleDeleteExercise = async (exerciseId) => {
        try {
            const response = await fetch('https://infernogymapi.integrador.xyz/api/exercise/unassign-exercise', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    exerciseId: exerciseId,
                    clientId: userId
                })
            });
            
            const responseText = await response.text();
            if (response.ok) {
                // Refrescar la lista de ejercicios después de eliminar uno
                const fetchExercises = async () => {
                    try {
                        const response = await fetch(`https://infernogymapi.integrador.xyz/api/exercise/user-exercises/${userId}`, {
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
            } else {
                console.error('Error al desasignar el ejercicio:', responseText);
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    const currentExercises = exercises.slice((currentPage - 1) * exercisesPerPage, currentPage * exercisesPerPage);

    return (
        <>
            <HeaderUsers prompt={"Ejercicios"} />
            <div id="contentEjercicios">
                <div id="ejerciciosForm">
                    {currentExercises.length > 0 ? (
                        currentExercises.map((exercise, index) => (
                            <div key={index} id="ejerciciosBox">
                                <h1>{exercise.exercise_name}</h1>
                                <div><h3>Peso: {exercise.weightexercise} Kg</h3>
                                <h3>Series: {exercise.series}</h3></div>
                                <div><h3>Repeticiones: {exercise.repetitions}</h3>
                                <h3>Día: {dayMapping[exercise.day_of_week - 1]}</h3></div>
                                <button id="eliminarEjercicio" onClick={() => handleDeleteExercise(exercise.exercise_id)}>Borrar</button>
                            </div>
                        ))
                    ) : (
                        <div id="ejerciciosBox">
                            <h1>Ejercicios vacíos</h1>
                        </div>
                    )}
                    <div id="ejerciciosBtns">
                        <button id="AgregarEjercicioBtn" onClick={handleAddExercise}>Agregar</button>
                        <button id="MoverseEjercicioBtn" onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
                        <button id="MoverseEjercicioBtn" onClick={handleNextPage} disabled={currentPage * exercisesPerPage >= exercises.length}>Siguiente</button>
                    </div>
                </div>
                <div id="dietaBox" className={subscriptionType !== 2 ? "lockedDieta" : ""}>
                    <h1>Dieta</h1>
                    {subscriptionType === 2 ? (
                        <div>
                            <h1 id="dietaText">{dieta?.foods || 'No se ha asignado una dieta'}</h1>
                        </div>
                    ) : (
                        <div className="lockedContent">
                            <img src={corona} alt="Corona" id="coronaImageDiete" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Ejercicios;
