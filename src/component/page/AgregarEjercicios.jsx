import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Flecha from "../atom/Flecha";
import pesa from '../../assets/weight.png';
import LocalStorage from "../../models/LocalStorage.mjs"; // Ajusta la ruta si es necesario

const AgregarEjercicio = () => {
    const [exerciseInfo, setExerciseInfo] = useState({
        nombreEjercicio: '',
        pesoEjercicio: '',
        seriesEjercicio: '',
        repeticionesEjercicios: '',
        diaEjercicio: 'lunes'
    });
    const [loading, setLoading] = useState(false);
    const token = LocalStorage.getItem("token");
    const navigete = useNavigate();
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setExerciseInfo((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleAddExercise = async () => {
        setLoading(true);
        try {
            const dayMapping = {
                lunes: 1,
                martes: 2,
                miércoles: 3,
                jueves: 4,
                viernes: 5,
                sábado: 6
            };
            const response = await fetch('https://p83c9dw9-8000.use2.devtunnels.ms/api/exercise/exercises', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    exercise_name: exerciseInfo.nombreEjercicio,
                    exercise_description: "",  // Si es necesario, puedes añadir una descripción
                    weightexercise: parseFloat(exerciseInfo.pesoEjercicio),
                    series: parseInt(exerciseInfo.seriesEjercicio, 10),
                    repetitions: parseInt(exerciseInfo.repeticionesEjercicios, 10),
                    day_of_week: dayMapping[exerciseInfo.diaEjercicio]  // Convertir el día a índice numérico
                })
            });
            const data = await response.status;
            if (data) {
                console.log('Ejercicio creado exitosamente:', data);
                navigete("/ejercicios")
            } else {
                console.error('Error al crear el ejercicio:', data);
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div id="AgregarEjercicioPage">
                <div id="AgregarEjercicioBox">
                    <div id="inputsEjerciciosBox">
                        <div id="agregarEjercicioTitulo">
                            <h1>Agregar ejercicio</h1>
                            <img id="pesaImg" src={pesa} alt="" />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                id="nombreEjercicio" 
                                placeholder="Nombre" 
                                value={exerciseInfo.nombreEjercicio} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                id="pesoEjercicio" 
                                placeholder="Peso" 
                                value={exerciseInfo.pesoEjercicio} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                id="seriesEjercicio" 
                                placeholder="Series" 
                                value={exerciseInfo.seriesEjercicio} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div id="repDaysEjercicio">
                            <input 
                                type="text" 
                                id="repeticionesEjercicios" 
                                placeholder="Repeticiones" 
                                value={exerciseInfo.repeticionesEjercicios} 
                                onChange={handleInputChange} 
                            />
                            <select 
                                id="diaEjercicio" 
                                value={exerciseInfo.diaEjercicio} 
                                onChange={handleInputChange}
                            > 
                                <option value="lunes">Lunes</option>
                                <option value="martes">Martes</option>
                                <option value="miércoles">Miércoles</option>
                                <option value="jueves">Jueves</option>
                                <option value="viernes">Viernes</option>
                                <option value="sábado">Sábado</option>
                            </select>
                        </div>
                        <div id="agregarEjercicioBtnBox">
                            <button 
                                id="agregarEjercicioBtn" 
                                onClick={handleAddExercise} 
                                disabled={loading}
                            >
                                {loading ? 'Agregando...' : 'Agregar'}
                            </button>
                        </div>
                    </div>
                </div>
                <Flecha />
            </div>
        </>
    );
}

export default AgregarEjercicio;
