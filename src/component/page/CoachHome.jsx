import React, { useState, useEffect, useRef } from "react";
import HeaderCoach from "../template/HeaderCoach";
import LocalStorage from "../../models/LocalStorage.mjs";

const CoachHome = () => {
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDay, setSelectedDay] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [currentExercise, setCurrentExercise] = useState(null);
    const exercisesPerPage = 3;
    const token = LocalStorage.getItem("token");

    const searchInputRef = useRef(null);
    const resultsRef = useRef(null);

    useEffect(() => {
        fetchClientes();
    }, [token]);

    useEffect(() => {
        const filtered = clientes.filter(cliente =>
            cliente.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredClientes(filtered);
        setShowResults(filtered.length > 0);
    }, [searchTerm, clientes]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target) &&
                resultsRef.current &&
                !resultsRef.current.contains(event.target)
            ) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchClientes = async () => {
        try {
            const response = await fetch('https://infernogymapi.integrador.xyz/api/user/clients', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                const filteredClientes = data.filter(cliente => cliente.subscription_id === 1 || cliente.subscription_id === 2);
                setClientes(filteredClientes);
            } else {
                console.error('Error al obtener los clientes:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setShowResults(true);
    };

    const handleClienteSelect = (cliente) => {
        setSelectedCliente(cliente);
        setSearchTerm(cliente.name);
        setShowResults(false);
        fetchExercises(cliente.user_id);
    };

    const fetchExercises = async (clientId) => {
        try {
            const response = await fetch(`https://p83c9dw9-8000.use2.devtunnels.ms/api/exercise/user-exercises/${clientId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setExercises(data);
                setFilteredExercises(data);
                setCurrentPage(1);
            } else {
                console.error('Error al obtener los ejercicios:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    const handleDayChange = (event) => {
        const selectedDay = parseInt(event.target.value);
        setSelectedDay(selectedDay);

        if (selectedDay === 0) {
            setFilteredExercises(exercises);
        } else {
            const filtered = exercises.filter(exercise => exercise.day_of_week === selectedDay);
            setFilteredExercises(filtered);
        }
        setCurrentPage(1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(filteredExercises.length / exercisesPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const currentExercises = filteredExercises.slice((currentPage - 1) * exercisesPerPage, currentPage * exercisesPerPage);

    const handleEditClick = (exercise) => {
        setCurrentExercise(exercise);
        setIsEditing(true);
    };

    const handleAddClick = () => {
        setCurrentExercise(null);
        setIsAdding(true);
    };

    const handleEditFormSubmit = async (event) => {
        event.preventDefault();
        const updatedExercise = {
            ...currentExercise,
            exercise_name: event.target.exercise_name.value,
            weightexercise: parseFloat(event.target.weightexercise.value),
            series: parseInt(event.target.series.value),
            repetitions: parseInt(event.target.repetitions.value),
            day_of_week: parseInt(event.target.day_of_week.value)
        };

        try {
            const response = await fetch(`https://p83c9dw9-8000.use2.devtunnels.ms/api/exercise/exercises/${currentExercise.exercise_id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedExercise)
            });

            if (response.ok) {
                await fetchExercises(selectedCliente.user_id);
                setIsEditing(false);
                setCurrentExercise(null);
            } else {
                console.error('Error al actualizar el ejercicio:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        const newExercise = {
            exercise_name: event.target.exercise_name.value,
            exercise_description: "",  // Si es necesario, puedes añadir una descripción
            weightexercise: parseFloat(event.target.weightexercise.value),
            series: parseInt(event.target.series.value),
            repetitions: parseInt(event.target.repetitions.value),
            day_of_week: parseInt(event.target.day_of_week.value),
        };
        try {
            const response = await fetch('https://p83c9dw9-8000.use2.devtunnels.ms/api/exercise/exercises', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newExercise)
            });
            if (response.ok) {
                console.log("Ejercicio creado con exito")
                getExerciseIdByName(newExercise.exercise_name)
                setIsAdding(false);
            } else {
                console.error('Error al agregar el ejercicio:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    const getExerciseIdByName = async (exerciseName) => {
        try {
            const response = await fetch(`https://p83c9dw9-8000.use2.devtunnels.ms/api/exercise/exercises-by-name?name=${exerciseName}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                // Imprimir el ID del ejercicio en la consola
                if (data.length > 0) {
                    console.log('ID del nuevo ejercicio:', data[0].exercise_id);
                    assignExerciseToClient(data[0].exercise_id,selectedCliente.user_id)
                } else {
                    console.log('No se encontró el ejercicio.');
                }
            } else {
                console.error('Error al obtener el ID del ejercicio:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };
    
    const assignExerciseToClient = async (exerciseId, clientId) => {
        try {
            const response = await fetch('https://p83c9dw9-8000.use2.devtunnels.ms/api/exercise/assign-exercise', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    exerciseId: exerciseId, 
                    clientId:clientId })
            });
    
            if (response.ok) {
                console.log('Ejercicio asignado exitosamente.');
                fetchExercises(clientId)
                // Aquí podrías actualizar la UI o realizar otras acciones si es necesario
            } else {
                console.error('Error al asignar el ejercicio:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };
    

    return (
        <>
            <HeaderCoach prompt={"Coach"}></HeaderCoach>
            <div id="UsuariosCoachBox">
                <div>
                    <div id="BuscadorTitulo">BUSCADOR DE USUARIOS</div>
                    <div
                        ref={searchInputRef}
                        onMouseEnter={() => setShowResults(true)}
                        onMouseLeave={() => setShowResults(false)}
                    >
                        <input
                            id="BuscadorUsuarios"
                            type="text"
                            placeholder="Buscar"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {showResults && filteredClientes.length > 0 && (
                            <div
                                id="BuscadorResultados"
                                ref={resultsRef}
                                onMouseEnter={() => setShowResults(true)}
                                onMouseLeave={() => setShowResults(false)}
                            >
                                {filteredClientes.map(cliente => (
                                    <div
                                        key={cliente.user_id}
                                        onClick={() => handleClienteSelect(cliente)}
                                        className="cliente-item"
                                    >
                                        {cliente.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {selectedCliente && (
                    <div>
                        <div id="informacionUsuarioTitulo">INFORMACION DEL USUARIO</div>
                        <div id="informacionUsuarioBox">
                            <select id="SelectDayBtn" onChange={handleDayChange}>
                                <option value="0">Todos</option>
                                <option value="1">Lunes</option>
                                <option value="2">Martes</option>
                                <option value="3">Miércoles</option>
                                <option value="4">Jueves</option>
                                <option value="5">Viernes</option>
                                <option value="6">Sábado</option>
                            </select>
                            <div id="InformacionUsuario">
                                <strong>Nombre:</strong> {selectedCliente.name}
                                <br />
                                <strong>Objetivo:</strong> {selectedCliente.goal || "No definido"}
                                <br />
                                <strong>Progreso:</strong> {selectedCliente.progress || "No definido"}
                                <br />
                                <strong>Peso:</strong> {selectedCliente.weight || "No definido"}
                                <br />
                                <strong>Altura:</strong> {selectedCliente.height || "No definido"}
                                <br />
                            </div>
                            <h1 id="RutinaUsuarioTitulo">RUTINA ACTUAL:</h1>
                            {currentExercises.map((exercise, index) => (
                                <div key={index} id={`Ejercicio${index + 1}`}>
                                    <div></div>
                                    <div>
                                        <p>Nombre: {exercise.exercise_name}</p>
                                        <p>Series: {exercise.series}</p>
                                    </div>
                                    <div>
                                        <p>Repeticiones: {exercise.repetitions}</p>
                                        <p>Peso: {exercise.weightexercise}</p>
                                    </div>
                                    <button id="ModificarBtn1" onClick={() => handleEditClick(exercise)}>Modificar</button>
                                </div>
                            ))}
                            <div className="BotonesInformacionUsuario">
                                <button id="agregarEjercicioCoachBtn" onClick={handleAddClick}>Agregar</button>
                                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
                                <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredExercises.length / exercisesPerPage)}>Siguiente</button>
                            </div>
                        </div>
                    </div>
                )} 
                {isEditing && currentExercise && (
                    <div id="EditExerciseForm">
                        <h3>Modificar Ejercicio</h3>
                        <form onSubmit={handleEditFormSubmit}>
                            <label>
                                Nombre:
                                <input type="text" name="exercise_name" defaultValue={currentExercise.exercise_name} />
                            </label>
                            <label>
                                Peso:
                                <input type="number" name="weightexercise" defaultValue={currentExercise.weightexercise} />
                            </label>
                            <label>
                                Series:
                                <input type="number" name="series" defaultValue={currentExercise.series} />
                            </label>
                            <label>
                                Repeticiones:
                                <input type="number" name="repetitions" defaultValue={currentExercise.repetitions} />
                            </label>
                            <label>
                                Día de la semana:
                                <select name="day_of_week" defaultValue={currentExercise.day_of_week}>
                                    <option value="1">Lunes</option>
                                    <option value="2">Martes</option>
                                    <option value="3">Miércoles</option>
                                    <option value="4">Jueves</option>
                                    <option value="5">Viernes</option>
                                    <option value="6">Sábado</option>
                                </select>
                            </label>
                            <button type="submit">Guardar</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
                        </form>
                    </div>
                )}
                {isAdding && (
                    <div id="AddExerciseForm">
                        <h3>Agregar Ejercicio</h3>
                        <form onSubmit={handleAddFormSubmit}>
                            <label>
                                Nombre:
                                <input type="text" name="exercise_name" />
                            </label>
                            <label>
                                Peso:
                                <input type="number" name="weightexercise" />
                            </label>
                            <label>
                                Series:
                                <input type="number" name="series" />
                            </label>
                            <label>
                                Repeticiones:
                                <input type="number" name="repetitions" />
                            </label>
                            <label>
                                Día de la semana:
                                <select name="day_of_week">
                                    <option value="1">Lunes</option>
                                    <option value="2">Martes</option>
                                    <option value="3">Miércoles</option>
                                    <option value="4">Jueves</option>
                                    <option value="5">Viernes</option>
                                    <option value="6">Sábado</option>
                                </select>
                            </label>
                            <button type="submit">Agregar</button>
                            <button type="button" onClick={() => setIsAdding(false)}>Cancelar</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default CoachHome;
