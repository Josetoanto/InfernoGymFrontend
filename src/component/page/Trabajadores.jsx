import React, { useEffect, useState } from "react";
import HeaderAdmistrador from "../template/HeaderAdministrador";
import LocalStorage from "../../models/LocalStorage.mjs";

const Trabajadores = () => {
    const [trabajadores, setTrabajadores] = useState([]);
    const [filteredTrabajadores, setFilteredTrabajadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWorkerId, setSelectedWorkerId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({ 
        name: '', 
        password: '', 
        weight: 0, 
        height: 0, 
        age: 0, 
        progress: "0%", 
        goal: "ninguno", 
        gmail: '', 
        subscription_id: 2, 
        role_id_fk: 1, 
        deleted: false 
    });
    const token = LocalStorage.getItem("token");

    useEffect(() => {
        fetchTrabajadores();
    }, [token]);

    useEffect(() => {
        // Filtrar trabajadores según el término de búsqueda
        const filtered = trabajadores.filter(worker =>
            worker.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTrabajadores(filtered);
    }, [searchTerm, trabajadores]);

    const fetchTrabajadores = async () => {
        try {
            const response = await fetch('https://p83c9dw9-8000.use2.devtunnels.ms/api/user/nutricionists-coaches', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTrabajadores(data);
                setFilteredTrabajadores(data); // Inicialmente, mostrar todos los trabajadores
            } else {
                console.error('Error al obtener los trabajadores:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleWorkerClick = (workerId) => {
        setSelectedWorkerId(workerId);
        const worker = trabajadores.find(w => w.user_id === workerId);
        setFormData({
            ...formData,
            name: worker.name || '',
            gmail: worker.gmail || '',
            role_id_fk: worker.role_id_fk || 1
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEditClick = () => {
        if (selectedWorkerId) {
            setShowEditForm(true);
        }
    };

    const handleAddClick = () => {
        setShowAddForm(true);
        setFormData({ 
            name: '', 
            password: '', 
            weight: 0, 
            height: 0, 
            age: 0, 
            progress: "0%", 
            goal: "ninguno", 
            gmail: '', 
            subscription_id: 2, 
            role_id_fk: 1, 
            deleted: false 
        });
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleEditFormSubmit = async (event) => {
        event.preventDefault();

        const updatedWorker = {
            name: formData.name || null,
            gmail: formData.gmail || null,
            role_id_fk: formData.role_id_fk || null
        };

        try {
            const response = await fetch(`https://p83c9dw9-8000.use2.devtunnels.ms/api/user/not/${selectedWorkerId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedWorker)
            });

            if (response.ok) {
                console.log('Trabajador modificado con éxito');
                setShowEditForm(false);
                await fetchTrabajadores(); // Llama a fetchTrabajadores para actualizar la lista
            } else {
                console.error('Error al modificar al trabajador:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    const handleAddFormSubmit = async (event) => {
        event.preventDefault();

        const newWorker = {
            name: formData.name,
            password: formData.password,
            weight: formData.weight,
            height: formData.height,
            age: formData.age,
            progress: formData.progress,
            goal: formData.goal,
            gmail: formData.gmail,
            subscription_id: formData.subscription_id,
            role_id_fk: formData.role_id_fk,
            deleted: formData.deleted
        };

        try {
            const response = await fetch('https://p83c9dw9-8000.use2.devtunnels.ms/api/user/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newWorker)
            });

            if (response.ok) {
                console.log('Trabajador agregado con éxito');
                setShowAddForm(false);
                await fetchTrabajadores(); // Llama a fetchTrabajadores para actualizar la lista
            } else {
                console.error('Error al agregar al trabajador:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    const handleBanearClick = async () => {
        if (selectedWorkerId) {
            try {
                const response = await fetch(`https://p83c9dw9-8000.use2.devtunnels.ms/api/user/${selectedWorkerId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (response.ok) {
                    console.log('Trabajador baneado con éxito');
                    await fetchTrabajadores(); // Llama a fetchTrabajadores para actualizar la lista
                } else {
                    console.error('Error al banear al trabajador:', await response.json());
                }
            } catch (error) {
                console.error('Error al conectar con la API:', error);
            }
        }
    };

    return (
        <>
            <HeaderAdmistrador prompt={"Trabajadores"} />
            <div id="usuariosBox">
                <div id="informacionUsuariosBox">
                    <div id="usuarios">
                        <div id="tituloUsuarioBox">
                            <div><h3>Nombre</h3></div>
                            <div><h3>Correo</h3></div>
                            <div><h3>Rol</h3></div>
                        </div>
                        <div id="informacionTrabajadores">
                            <div id="nombreTrabajadorColumn">
                                {loading ? <p>Cargando...</p> : filteredTrabajadores.map(worker => (
                                    <div
                                        key={worker.user_id}
                                        className={`trabajadorItem ${selectedWorkerId === worker.user_id ? 'selected' : ''}`}
                                        onClick={() => handleWorkerClick(worker.user_id)}
                                    >
                                        {worker.name}
                                    </div>
                                ))}
                            </div>
                            <div id="CorreoTrabajadorColumn">
                                {loading ? null : filteredTrabajadores.map(worker => (
                                    <div
                                        key={worker.user_id}
                                        className={`trabajadorItem ${selectedWorkerId === worker.user_id ? 'selected' : ''}`}
                                    >
                                        {worker.gmail || 'No disponible'}
                                    </div>
                                ))}
                            </div>
                            <div id="RolTrabajadorColumn">
                                {loading ? null : filteredTrabajadores.map(worker => (
                                    <div
                                        key={worker.user_id}
                                        className={`trabajadorItem ${selectedWorkerId === worker.user_id ? 'selected' : ''}`}
                                    >
                                        {(() => {
                                            switch (worker.role_id_fk) {
                                                case 1:
                                                    return 'Administrador';
                                                case 2:
                                                    return 'Cliente';
                                                case 3:
                                                    return 'Nutricionista';
                                                case 4:
                                                    return 'Coach';
                                                default:
                                                    return 'No disponible';
                                            }
                                        })()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="btnsUsuarios">
                    <input
                        type="text"
                        id="buscarTrabajadorInput"
                        placeholder="Buscar trabajador"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <div>
                        <button id="banearTrabajadorBtn" onClick={handleBanearClick}>Banear</button>
                        <button id="modificarTrabajadorBtn" onClick={handleEditClick}>Modificar</button>
                        <button id="agregarTrabajadorBtn" onClick={handleAddClick}>Agregar</button>
                    </div>
                    
                </div>
            </div>

            {/* Formulario de edición */}
            {showEditForm && (
                <div id="editFormContainer">
                    <form id="editForm" onSubmit={handleEditFormSubmit}>
                        <h3>Modificar Trabajador</h3>
                        <label>
                            Nombre:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                required
                            />
                        </label>
                        <label>
                            Gmail:
                            <input
                                type="email"
                                name="gmail"
                                value={formData.gmail}
                                onChange={handleFormChange}
                                required
                            />
                        </label>
                        <label>
                            Rol:
                            <select
                                name="role_id_fk"
                                value={formData.role_id_fk}
                                onChange={handleFormChange}
                                required
                            >
                                <option value="">Seleccione un rol</option>
                                <option value="3">Nutricionista</option>
                                <option value="4">Coach</option>
                            </select>
                        </label>
                        <button type="submit">Confirmar</button>
                        <button type="button" className="closeBtn" onClick={() => setShowEditForm(false)}>Cerrar</button>
                    </form>
                </div>
            )}

            {/* Formulario de agregar */}
            {showAddForm && (
                <div id="addFormContainer">
                    <form id="addForm" onSubmit={handleAddFormSubmit}>
                        <h3>Agregar Trabajador</h3>
                        <label>
                            Nombre:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                required
                            />
                        </label>
                        <label>
                            Gmail:
                            <input
                                type="email"
                                name="gmail"
                                value={formData.gmail}
                                onChange={handleFormChange}
                                required
                            />
                        </label>
                        <label>
                            Rol:
                            <select
                                name="role_id_fk"
                                value={formData.role_id_fk}
                                onChange={handleFormChange}
                                required
                            >
                                <option value="">Seleccione un rol</option>
                                <option value="3">Nutricionista</option>
                                <option value="4">Coach</option>
                            </select>
                        </label>
                        <label>
                            Contraseña:
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleFormChange}
                                required
                            />
                        </label>
                        <button type="submit">Confirmar</button>
                        <button type="button" className="closeBtn" onClick={() => setShowAddForm(false)}>Cerrar</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Trabajadores;
