import React, { useState, useEffect, useRef } from "react";
import enviarBtn from '../../assets/rightArrow.png';
import LocalStorage from "../../models/LocalStorage.mjs";
import HeaderNutricionista from "../template/HeaderNutricionista"

const BandejaNutricionista = () => {
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [messageToSend, setMessageToSend] = useState('');
    const token = LocalStorage.getItem("token");
    const currentUserId = LocalStorage.getUserInfo()?.user_id;

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

    useEffect(() => {
        let intervalId;
        if (selectedCliente) {
            fetchMessages(selectedCliente.user_id); // Initial fetch
            intervalId = setInterval(() => {
                fetchMessages(selectedCliente.user_id);
            }, 3000); // Update messages every 3 seconds
        }
        return () => clearInterval(intervalId); // Cleanup interval on component unmount or when selectedCliente changes
    }, [selectedCliente]);

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
                // Filtra clientes con rol 2 y actualiza el estado
                const filteredClientes = data.filter(cliente => cliente.subscription_id === 2);
                setClientes(filteredClientes);
                setFilteredClientes(filteredClientes); // También actualiza el estado de clientes filtrados
            } else {
                console.error('Error al obtener los clientes:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    const fetchMessages = async (recipientId) => {
        try {
            const response = await fetch('https://p83c9dw9-8000.use2.devtunnels.ms/api/mail', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const filtered = data.filter(mail =>
                    (mail.recipient_id === recipientId || mail.created_by === recipientId) &&
                    (mail.created_by === currentUserId || mail.recipient_id === currentUserId)
                );
                setMessages(filtered);
                setFilteredMessages(filtered);
            } else {
                console.error('Error al obtener los mensajes:', await response.json());
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
    };

    const sendMessage = async () => {
        if (messageToSend.trim() === "" || !selectedCliente) return;

        try {
            const response = await fetch('https://p83c9dw9-8000.use2.devtunnels.ms/api/mail', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: messageToSend,
                    recipient_id: selectedCliente.user_id
                })
            });

            if (response.ok) {
                const newMessage = await response.json();
                setMessages([...messages, newMessage]);
                setFilteredMessages([...filteredMessages, newMessage]);
                setMessageToSend('');
            } else {
                console.error('Error al enviar el mensaje:', await response.json());
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
        fetchMessages(cliente.user_id);
    };

    const handleSendMessageChange = (event) => {
        setMessageToSend(event.target.value);
    };

    const handleSendMessage = () => {
        sendMessage();
    };

    return (
        <>
            <HeaderNutricionista prompt={"Bandeja"} />
            <div id="bandejaBox">
                <div id="chatsBox">
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
                </div>
                <div id="Chatbox">
                    <div id="NombreUsuarioChat">{selectedCliente ? selectedCliente.name : "Selecciona un usuario"}</div>
                    <div id="Mensajes">
                        {filteredMessages.map((message, index) => (
                            <div
                                key={message.mail_id}
                                className={message.created_by === currentUserId ? 'message-right' : 'message-left'}
                            >
                                <p id="mensajeText">{message.messages}</p>
                            </div>
                        ))}
                    </div>
                    <div id="mensajeEnviar">
                        <input
                            id="mensajeEnviarText"
                            type="text"
                            placeholder="Mensaje enviar"
                            value={messageToSend}
                            onChange={handleSendMessageChange}
                        />
                        <button id="enviarMensajebtn" onClick={handleSendMessage}>
                            <img id="arrowBtn" src={enviarBtn} alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BandejaNutricionista;
