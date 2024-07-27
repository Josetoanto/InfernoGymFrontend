import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocalStorage from "../../models/LocalStorage.mjs"; // Ajusta la ruta si es necesario
import flecha from '../../assets/arrow.png';

const ModificarPerfil = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        goal: '',
        weight: '',
        height: '',
        name: '',
        progress: '' 
    });
    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const userId = LocalStorage.getUserInfo()?.user_id;
    const token = LocalStorage.getItem("token");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`https://infernogymapi.integrador.xyz/api/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (data) {
                    setUserInfo({
                        goal: data.goal || '',
                        weight: data.weight || '',
                        height: data.height || '',
                        name: data.name || '',
                        progress: data.progress || '' // Obtener el progreso
                    });
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
    }, [userId, token]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleUpdateProfile = async () => {
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
                navigate("/perfilUsuario"); // Redirigir al perfil del usuario
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
        return <div></div>;
    }

    return (
        <>
            <div id="modificarColumnas">
                <div id="registroColumnas">
                    <div id="columnaRegistro1">
                        <h1 id="registrotitulo">Modificar información personal</h1>
                        <div> </div>
                        <input
                            type="text"
                            id="name"
                            placeholder="Nombre"
                            value={userInfo.name}
                            onChange={handleInputChange}
                        />
                        <div> </div>
                        <input
                            type="text"
                            id="goal"
                            placeholder="Objetivo"
                            value={userInfo.goal}
                            onChange={handleInputChange}
                        />
                        <div> </div>
                        <input
                            type="text"
                            id="weight"
                            placeholder="Peso"
                            value={userInfo.weight}
                            onChange={handleInputChange}
                        />
                        <div> </div>
                        <input
                            type="text"
                            id="height"
                            placeholder="Altura"
                            value={userInfo.height}
                            onChange={handleInputChange}
                        />
                        <div> </div>
                        <input
                            type="text"
                            id="progress"
                            placeholder="Progreso"
                            value={userInfo.progress}
                            onChange={handleInputChange}
                        />
                        <div></div>
                        <button
                            id="completarButon"
                            onClick={handleUpdateProfile}
                            disabled={loadingUpdate}
                        >
                            {loadingUpdate ? 'Modificando...' : 'Modificar'}
                        </button>
                    </div>
                </div>
                <div>
                    <button id="flechaBtn" onClick={() => navigate("/perfilUsuario")}>
                        <img id="flecha" src={flecha} alt="Volver" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default ModificarPerfil;
