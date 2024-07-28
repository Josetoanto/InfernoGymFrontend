import React, { useState, useEffect } from "react";
import HeaderUsers from "../template/HeaderUsers";
import LocalStorage from "../../models/LocalStorage.mjs"; // Ajusta la ruta si es necesario
import flecha from '../../assets/arrow.png';

const PerfilUsuario = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const user = LocalStorage.getUserInfo();
    const userId = user?.user_id;
    const token = LocalStorage.getItem("token");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`https://infernogymapi.integrador.xyz/api/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Agregar el token al encabezado
                    }
                });
                const data = await response.json();
                if (data) {
                    setUserInfo(data);
                } else {
                    console.error('Error al obtener la información del usuario:', await response.json());
                }
            } catch (error) {
                console.error('Error al conectar con la API:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserInfo();
        } else {
            console.error('No se encontró el ID del usuario en LocalStorage');
            setLoading(false);
        }
    }, [userId]);

    const handleModifyProfile = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoadingUpdate(true);
        try {
            const dataToUpdate = {
                goal: userInfo.goal,
                weight: parseInt(userInfo.weight),
                height: parseFloat(userInfo.height),
                name: userInfo.name,
                progress: userInfo.progress // Incluir el progreso en la actualización
            };

            const response = await fetch(`https://infernogymapi.integrador.xyz/api/user/not/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToUpdate)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Perfil modificado exitosamente:', data);
                handleCloseModal(); // Cerrar el modal después de actualizar
                window.location.reload(); // Recargar la página para ver los cambios
            } else {
                console.error('Error al modificar el perfil:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        } finally {
            setLoadingUpdate(false);
        }
    };

    if (loading) {
        return <div><HeaderUsers prompt={"Cargando"}></HeaderUsers></div>;
    }

    if (!userInfo) {
        return <div>No se encontró la información del usuario</div>;
    }

    return (
        <>
            <HeaderUsers prompt={"Perfil"}></HeaderUsers>
            <div id="InformacionUsuarioBox">
                <div id="HeaderIS">INFORMACION</div>
                <div id="InformacionUser">
                    <h3>Nombre: {userInfo.name}</h3>
                    <h3>Objetivo: {userInfo.goal || 'No especificado'}</h3>
                    <h3>Suscripción: {userInfo.subscription_name || 'No especificado'}</h3>
                    <h3>Fitness (Progreso): {userInfo.progress || 'No especificado'}</h3>
                    <h3>Peso: {userInfo.weight || 'No especificado'}</h3>
                    <h3>Altura: {userInfo.height || 'No especificado'}</h3>
                </div>
                <button id="modificarPerfilBtn" onClick={handleModifyProfile}>Modificar</button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <form id="modificarPerfilForm" onSubmit={handleUpdateProfile}>
                            <h1 id="registrotitulo">Modificar información personal</h1>
                            <input
                                type="text"
                                id="name"
                                placeholder="Nombre"
                                value={userInfo.name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                id="goal"
                                placeholder="Objetivo"
                                value={userInfo.goal}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                id="weight"
                                placeholder="Peso"
                                value={userInfo.weight}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                id="height"
                                placeholder="Altura"
                                value={userInfo.height}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                id="progress"
                                placeholder="Progreso"
                                value={userInfo.progress}
                                onChange={handleInputChange}
                            />
                            <button
                                id="completarButon"
                                type="submit"
                                disabled={loadingUpdate}
                            >
                                {loadingUpdate ? 'Modificando...' : 'Modificar'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default PerfilUsuario;
