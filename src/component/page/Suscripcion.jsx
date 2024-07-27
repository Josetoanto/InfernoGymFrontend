import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderUsers from "../template/HeaderUsers";
import LocalStorage from "../../models/LocalStorage.mjs";

const Suscripciones = () => {
    const userId = LocalStorage.getUserInfo()?.user_id;
    const token = LocalStorage.getItem("token");
    const [selectedSubscription, setSelectedSubscription] = useState("3"); // Valor inicial Basico
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const handleSubscriptionChange = (event) => {
        setSelectedSubscription(event.target.value);
    };

    const handleSubscriptionUpdate = async () => {
        try {
            const response = await fetch(`https://infernogymapi.integrador.xyz/api/user/not/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subscription_id: parseInt(selectedSubscription)
                })
            });
            if (response.ok) {
                setShowSuccessMessage(true);
                setTimeout(() => {
                    LocalStorage.clear(); // Asegúrate de cerrar la sesión del usuario
                    navigate('/');
                }, 3000); // Redirige después de 3 segundos
            } else {
                console.error('Error al actualizar la suscripción');
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    const getPrice = (subscriptionType) => {
        switch (subscriptionType) {
            case '1': return '$400.00';
            case '2': return '$500.00';
            case '3': return '$250.00';
            default: return '$250.00'; 
        }
    };

    return (
        <>
            <HeaderUsers prompt={"Suscripciones"} />
            <div id="suscripcionesPage">
                <div id="suscripcionesBox">
                    <div id="pagoBox" className="column-container">
                        <div id="suscripcionInfo" className="column-item">
                            <h3>Suscripción</h3>
                            <p id="letterMin1">El cobro recurrente mensual dará inicio a partir del primero del siguiente mes por venir. Puede cancelar la suscripción en cualquier momento que desee.</p>
                        </div>
                        <div className="column-item">
                            <p>Se renueva cada</p>
                            <select name="months" id="selectMouth">
                                <option value="">1 mes</option>
                                <option value="">3 meses</option>
                                <option value="">6 meses</option>
                            </select>
                        </div>
                        <div className="column-item">
                            <p>Tipo de suscripcion</p>
                            <select name="subscription" id="selectSuscripcion" value={selectedSubscription} onChange={handleSubscriptionChange}>
                                <option value="3">Basico</option>
                                <option value="1">Pro</option>
                                <option value="2">Elite</option>
                            </select>
                        </div>
                        <div id="payButton">
                            <p>Precio</p>
                            <p>{getPrice(selectedSubscription)}</p>
                            <button onClick={handleSubscriptionUpdate}>Pagar</button>
                        </div>
                    </div>
                    <div id="letraPBox">
                        <p id="letterMin">El precio aumentará el 10 de Agosto, 2024. Te cobraremos $48.00 cada mes desde hoy 
                            y después {getPrice(selectedSubscription)} cada mes a partir del mes por venir (por cada suscripción, más impuestos).
                            Tu suscripción seguirá hasta que la canceles y puedes cancelarla en cualquier momento 
                            seleccionando "No renovar" en la página de suscripciones. 
                        </p>
                    </div>
                </div>
            </div>
            <div id="agradecimientoBox">
                <p>¡Hola! Queremos agradecerte por decidir unirte a Gym Inferno. Tu compromiso con tu salud y 
                    bienestar es inspirador, y estamos emocionados de acompañarte en este viaje hacia una versión más fuerte y saludable de ti mismo. ¡Nos vemos en la pista!
                </p>
            </div>

            {showSuccessMessage && (
                <div id="successMessage">
                    <p>Pago realizado correctamente</p>
                    <p>Se cerrará sesión para actualizar los datos</p>
                </div>
            )}
        </>
    );
}

export default Suscripciones;
