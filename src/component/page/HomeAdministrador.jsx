import React, { useEffect, useState, useRef } from 'react';
import ApexCharts from 'apexcharts';
import LocalStorage from '../../models/LocalStorage.mjs'; // Ajustar la ruta si es necesario
import HeaderAdmistrador from '../template/HeaderAdministrador';
import usuarios from '../../assets/mask.png';
import ganancias from  '../../assets/sin.png';
import Footer from '../template/Footer';

const GraficasClientes = () => {
  const [clients, setClients] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const token = LocalStorage.getItem('token');
  const subscriptionChartRef = useRef(null);
  const revenueChartRef = useRef(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('https://infernogymapi.integrador.xyz/api/user/clients', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setClients(data);
        } else {
          console.error('Error al obtener los clientes:', data);
        }
      } catch (error) {
        console.error('Error al conectar con la API:', error);
      }
    };

    fetchClients();
  }, [token]);

  useEffect(() => {
    if (clients.length > 0) {
      const calculateTotals = () => {
        // Datos para el gráfico de suscripciones
        const clientsBySubscription = clients.reduce((acc, client) => {
          acc[client.subscription_id] = (acc[client.subscription_id] || 0) + 1;
          return acc;
        }, {});

        // Calcular el total de usuarios
        const totalUsersCount = clients.length;
        setTotalUsers(totalUsersCount);

        // Datos para el gráfico de ingresos
        const subscriptionPrices = { 1: 400, 2: 500, 3: 250 };
        const revenueBySubscription = Object.keys(clientsBySubscription).reduce((acc, subscriptionId) => {
          const numberOfClients = clientsBySubscription[subscriptionId];
          const price = subscriptionPrices[subscriptionId];
          acc[subscriptionId] = numberOfClients * price;
          return acc;
        }, {});

        // Calcular el total de ganancias
        const totalRevenueAmount = Object.values(revenueBySubscription).reduce((acc, revenue) => acc + revenue, 0);
        setTotalRevenue(totalRevenueAmount);

        renderCharts(clients, clientsBySubscription, revenueBySubscription);
      };

      calculateTotals();
    }
  }, [clients]);

  const renderCharts = (clients, clientsBySubscription, revenueBySubscription) => {
    // Preparar datos para cada serie de la gráfica de suscripciones
    const subscriptionCategories = {
      1: 'Basico',
      2: 'Pro',
      3: 'Elite'
    };

    const subscriptionSeries = [
      {
        name: 'Suscripciones',
        data: [
          clientsBySubscription[3] || 0,
          clientsBySubscription[1] || 0,
          clientsBySubscription[2] || 0
        ]
      }
    ];

    const subscriptionChartOptions = {
      chart: {
        type: 'bar',
        id: 'subscriptionChart'
      },
      series: subscriptionSeries,
      xaxis: {
        categories: ['Basico', 'Pro', 'Elite']
      },
      yaxis: {
        title: {
          text: 'Usuarios (:3)'
        }
      }
    };

    if (subscriptionChartRef.current) {
      subscriptionChartRef.current.innerHTML = '';
      const subscriptionChart = new ApexCharts(subscriptionChartRef.current, subscriptionChartOptions);
      subscriptionChart.render();
    }

    // Preparar datos para cada serie de la gráfica de ingresos
    const revenueSeries = [
      {
        name: 'Ganancias',
        data: [
          revenueBySubscription[3] || 0,
          revenueBySubscription[1] || 0,
          revenueBySubscription[2] || 0
        ]
      }
    ];

    const revenueChartOptions = {
      chart: {
        type: 'bar',
        id: 'revenueChart'
      },
      series: revenueSeries,
      xaxis: {
        categories: ['Basico', 'Pro', 'Elite']
      },
      yaxis: {
        title: {
          text: 'Ganancias ($)'
        }
      }
    };

    if (revenueChartRef.current) {
      revenueChartRef.current.innerHTML = '';
      const revenueChart = new ApexCharts(revenueChartRef.current, revenueChartOptions);
      revenueChart.render();
    }
  };

  return (
    <>
      <HeaderAdmistrador prompt={"Administrador"} />
      <h1 id='administradorHomeHeader'>Seguimiento del gym</h1>
      <div id='InformacionNegocio'>
        <div id='informacionGeneral'>
          <div id='usuariosBox1'>
            <img src={usuarios} alt="" id='usariosIMG'/>
            <h1>Usuarios totales: {totalUsers}</h1>
          </div>
          <div id='gananciasBox'>
            <img src={ganancias} id="gananciasIMG" />
            <h1>Ganancias totales: ${totalRevenue}</h1>
          </div>
        </div>
        <div id="graficasBox">
          <div id="Fila1_GraficasBox">
            <div id="GraficaBox">
              <div id="subscriptionChart" ref={subscriptionChartRef}></div>
            </div>
          </div>
          <div id="Fila2_GraficasBox">
            <div id="GraficaBox">
              <div id="revenueChart" ref={revenueChartRef}></div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default GraficasClientes;
