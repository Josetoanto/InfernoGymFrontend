import React, { useEffect, useState, useRef } from "react";
import HeaderAdmistrador from "../template/HeaderAdministrador";
import LocalStorage from "../../models/LocalStorage.mjs";

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const token = LocalStorage.getItem("token");
    const usuariosContainerRef = useRef(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('https://p83c9dw9-8000.use2.devtunnels.ms/api/user/clients', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsuarios(data);
                    setFilteredUsuarios(data); // Inicialmente, mostrar todos los usuarios
                } else {
                    console.error('Error al obtener los usuarios:', await response.json());
                }
            } catch (error) {
                console.error('Error al conectar con la API:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, [token]);

    useEffect(() => {
        // Filtrar usuarios según el término de búsqueda
        const filtered = usuarios.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsuarios(filtered);
    }, [searchTerm, usuarios]);

    const handleUserClick = async (userId, userName) => {
        setSelectedUserId(userId);
        console.log('ID del usuario seleccionado:', userId);

        try {
            const response = await fetch(`https://p83c9dw9-8000.use2.devtunnels.ms/api/user/name/${userName}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const user = await response.json();
                console.log('Datos del usuario:', user);
            } else {
                console.error('Error al obtener los datos del usuario:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleBanUser = async () => {
        if (selectedUserId === null) {
            console.warn('No se ha seleccionado ningún usuario');
            return;
        }

        try {
            const response = await fetch(`https://p83c9dw9-8000.use2.devtunnels.ms/api/user/${selectedUserId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setUsuarios(prevUsuarios => prevUsuarios.filter(user => user.user_id !== selectedUserId));
                setFilteredUsuarios(prevFiltered => prevFiltered.filter(user => user.user_id !== selectedUserId));
                setSelectedUserId(null);
                console.log('Usuario baneado con éxito');
            } else {
                console.error('Error al banear el usuario:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    // Función para mapear el ID de suscripción al nombre de la suscripción
    const getSubscriptionName = (subscriptionId) => {
        switch (subscriptionId) {
            case 1:
                return 'Básico';
            case 2:
                return 'Pro';
            case 3:
                return 'Elite';
            default:
                return 'No disponible';
        }
    };

    const scroll = (direction) => {
        if (usuariosContainerRef.current) {
            usuariosContainerRef.current.scrollBy({
                top: direction === 'down' ? 100 : -100,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <HeaderAdmistrador prompt={"Usuarios"} />
            <div id="usuariosBox">
                <div
                    id="usuarios"
                    ref={usuariosContainerRef}
                >
                    <div id="tituloUsuarioBox">
                        <div><h3>Nombre</h3></div>
                        <div><h3>Correo</h3></div>
                        <div><h3>Suscripción</h3></div>
                    </div>
                    <div id="informacionUsuarios">
                        <div id="nombreUsuarioColumn">
                            {loading ? <p>Cargando...</p> : filteredUsuarios.map(user => (
                                <div
                                    key={user.user_id}
                                    className={`usuarioItem ${selectedUserId === user.user_id ? 'selected' : ''}`}
                                    onClick={() => handleUserClick(user.user_id, user.name)}
                                >
                                    {user.name}
                                </div>
                            ))}
                        </div>
                        <div id="correoUsuariosColumn">
                            {loading ? null : filteredUsuarios.map(user => (
                                <div
                                    key={user.user_id}
                                    className={`usuarioItem ${selectedUserId === user.user_id ? 'selected' : ''}`}
                                >
                                    {user.email || 'No disponible'}
                                </div>
                            ))}
                        </div>
                        <div id="SuscripcionUsuarioColumn">
                            {loading ? null : filteredUsuarios.map(user => (
                                <div
                                    key={user.user_id}
                                    className={`usuarioItem ${selectedUserId === user.user_id ? 'selected' : ''}`}
                                >
                                    {getSubscriptionName(user.subscription_id)}
                                </div>
                            ))}
                        </div>
                    </div>
                    {filteredUsuarios.length > 9 && (
                        <>
                            <div
                                className="scrollButton up"
                                onClick={() => scroll('up')}
                            >
                                ↑
                            </div>
                            <div
                                className="scrollButton down"
                                onClick={() => scroll('down')}
                            >
                                ↓
                            </div>
                        </>
                    )}
                </div>
                <div id="btnsUsuarios">
                    <input
                        type="text"
                        id="buscarUsuarioInput"
                        placeholder="Buscar usuarios"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button id="banearUsuarioBtn" onClick={handleBanUser}>Banear</button>
                </div>
            </div>
        </>
    );
};

export default Usuarios;
