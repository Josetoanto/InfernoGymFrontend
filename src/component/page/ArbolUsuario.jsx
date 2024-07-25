import React, { useEffect, useState } from "react";
import HeaderUsers from "../template/HeaderUsers";
import avanze1 from '../../assets/avanze1.png';
import avanze2 from '../../assets/avanze2.png';
import avanze3 from '../../assets/avanze3.png';
import avanze4 from '../../assets/avanze4.png';
import avanze5 from '../../assets/avanze5.png';
import Footer from "../template/Footer";
import LocalStorage from "../../models/LocalStorage.mjs"; // Ajusta la ruta si es necesario

const ArbolUsuario = () => {
    const [user, setUser] = useState(null);
    const [progressImage, setProgressImage] = useState(avanze1);
    const [progress, setProgress] = useState(0);
    const userId = LocalStorage.getUserInfo()?.user_id;
    const token = LocalStorage.getItem("token");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://p83c9dw9-8000.use2.devtunnels.ms/api/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                    const userProgress = data.progress || 0;
                    setProgress(userProgress);
                    setProgressImage(getProgressImage(parseInt(userProgress)));
                } else {
                    console.error('Error al obtener los datos del usuario:', await response.json());
                }
            } catch (error) {
                console.error('Error al conectar con la API:', error);
            }
        };

        fetchUserData();
    }, [userId, token]);

    const getProgressImage = (progress) => {
        if (progress >= 0 && progress <= 20) {
            return avanze1;
        } else if (progress >= 21 && progress <= 40) {
            return avanze2;
        } else if (progress >= 41 && progress <= 60) {
            return avanze3;
        } else if (progress >= 61 && progress <= 80) {
            return avanze4;
        } else if (progress >= 81 && progress <= 100) {
            return avanze5;
        }
    };

    return (
        <>
            <HeaderUsers prompt={user ? user.name : "Cargando..."} />
            <div id="ContentArbol">
                <div id="ProgressArbol">
                    <div id="ProgressDiv">
                        <h1>Progreso: {progress}</h1>
                    </div>
                    <div id="ProgressDiv">
                        <h1>Mientras mejor sea tu progreso, mayor será el crecimiento de tu arbolito</h1>
                    </div>
                </div>
                <div id="Arbol">
                    <img id="ArbolImagen" src={progressImage} alt="Imagen de progreso" />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ArbolUsuario;
