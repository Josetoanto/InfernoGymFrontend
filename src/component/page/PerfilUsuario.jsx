import React, { useState, useEffect } from "react";
import HeaderUsers from "../template/HeaderUsers";
import LocalStorage from "../../models/LocalStorage.mjs"; // Ajusta la ruta si es necesario

const PerfilUsuario = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
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
        // Redirigir a la página de modificación del perfil
        window.location.href = '/modificarPerfil';
    };


    //Pagina de carga
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
        </>
    );
};

export default PerfilUsuario;
