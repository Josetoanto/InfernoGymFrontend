import React, { useState, useEffect, useRef } from "react";
import HeaderCoach from "../template/HeaderCoach";
import LocalStorage from "../../models/LocalStorage.mjs";

const NutricionistaHome = () => {
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [dieta, setDieta] = useState(null);
    const [showDietaForm, setShowDietaForm] = useState(false);
    const [dietaFormData, setDietaFormData] = useState({ foods: '', progress: '' });
    const [showResults, setShowResults] = useState(false); // Nuevo estado para manejar la visibilidad
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
            const response = await fetch('https://p83c9dw9-8000.use2.devtunnels.ms/api/user/clients', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const filteredClientes = data.filter(cliente => cliente.role_id_fk === 2);
                setClientes(filteredClientes);
            } else {
                console.error('Error al obtener los clientes:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    const fetchDieta = async (userId) => {
        try {
            const response = await fetch(`https://p83c9dw9-8000.use2.devtunnels.ms/api/diete/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setDieta(data);
            } else {
                setDieta(null); // Si no hay dieta, setear a null
                console.error('Error al obtener la dieta:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setShowResults(true); // Mostrar resultados al buscar
    };

    const handleClienteSelect = (cliente) => {
        setSelectedCliente(cliente);
        console.log(`Selected Cliente ID: ${cliente.user_id}`);
        fetchDieta(cliente.user_id);
        setSearchTerm(cliente.name); // Opcional: Para mostrar el nombre seleccionado en el input
        setShowResults(false); // Ocultar resultados al seleccionar un cliente
    };

    const handleModificarDietaClick = () => {
        setShowDietaForm(true);
        if (dieta) {
            setDietaFormData({ foods: dieta.foods, progress: dieta.progress });
        } else {
            setDietaFormData({ foods: '', progress: '' });
        }
    };

    const handleDietaFormChange = (event) => {
        const { name, value } = event.target;
        setDietaFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleDietaFormSubmit = async (event) => {
        event.preventDefault();

        const requestBody = {
            foods: dietaFormData.foods,
            progress: dietaFormData.progress,
            clientId: selectedCliente.user_id
        };

        const url = dieta
            ? `https://p83c9dw9-8000.use2.devtunnels.ms/api/diete/${dieta.diete_id}`
            : 'https://p83c9dw9-8000.use2.devtunnels.ms/api/diete';

        const method = dieta ? 'PUT' : 'POST';

        
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

                setShowDietaForm(false);
                fetchDieta(selectedCliente.user_id); // Refresh dieta
            
        
    };

    return (
        <>
            <HeaderCoach prompt={"Home"} />
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
                        <div id="informacionUsuarioBoxNutricionista">
                            <div id="InformacionUsuario">
                                <strong>Nombre:</strong> {selectedCliente.name}
                                <br />
                                <strong>Objetivo:</strong> {selectedCliente.objective}
                                <br />
                                <strong>Progreso:</strong> {dieta ? dieta.progress : 'No disponible'} {/* Mostrar progreso */}
                                <br />
                                <strong>Peso:</strong> {selectedCliente.weight}
                                <br />
                                <strong>Altura:</strong> {selectedCliente.height}
                                <br />
                            </div>
                            <h1 id="RutinaUsuarioTitulo">DIETA ACTUAL:</h1>
                            <div id="Dieta1">
                                {dieta ? (
                                    <p className="ejercicios">{dieta.foods}</p>
                                ) : (
                                    <p className="ejercicios">No disponible</p>
                                )}
                            </div>
                            <div className="BotonesInformacionUsuario">
                                <button id="ModificarDieta" onClick={handleModificarDietaClick}>Modificar</button>
                            </div>
                        </div>
                    </div>
                )}
                {showDietaForm && (
                    <div id="dietaFormContainer">
                        <form id="dietaForm" onSubmit={handleDietaFormSubmit}>
                            <h3>{dieta ? 'Modificar Dieta' : 'Agregar Dieta'}</h3>
                            <label>
                                <h3>Dieta:</h3>
                                <textarea
                                    type="text"
                                    name="foods"
                                    id="dietaInput"
                                    value={dietaFormData.foods}
                                    onChange={handleDietaFormChange}
                                    required
                                />
                            </label>
                            <label>
                                <h3>Progreso:</h3>
                                <input
                                    type="text"
                                    name="progress"
                                    value={dietaFormData.progress}
                                    onChange={handleDietaFormChange}
                                    required
                                />
                            </label>
                            <button type="submit">Completar</button>
                            <button type="button" className="closeBtn" onClick={() => setShowDietaForm(false)}>Cerrar</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default NutricionistaHome;
