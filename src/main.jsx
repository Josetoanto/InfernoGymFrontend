import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Registro from './component/page/Registro.jsx'
import InicioSesion from './component/page/InicioSesion.jsx'
import NotFound from './component/page/NotFound.jsx'
import HomeUsuario from './component/page/HomeUsuario.jsx'
import ArbolUsuario from './component/page/ArbolUsuario.jsx'
import PerfilUsuario from './component/page/PerfilUsuario.jsx'
import ModificarPerfil from './component/page/ModificarPerfil.jsx'
import Ejercicios from './component/page/Ejercicios.jsx'
import BandejaUsuario from './component/page/BandejaUsuario.jsx'
import AgregarEjercicio from './component/page/AgregarEjercicios.jsx'
import ModificarEjercicio from './component/page/ModificarEjercicio.jsx'
import CoachHome from './component/page/CoachHome.jsx'
import BandejaCoach from './component/page/BandejaCoach.jsx'
import NutricionistaHome from './component/page/NutricionistaHome.jsx'
import HomePersonal from './component/page/HomePersonal.jsx'


const router = createBrowserRouter([
  {//Home
    path:"/",
    element:<App/>,
    errorElement:<NotFound/>
  },
  {
    path: "/registrarse",
    element: <Registro/>
  },
  {//IniciarSesion
    path: "/iniciarSesion",
    element: <InicioSesion/>
  },
  {//Home Usuario
    path: "/homeUsuario",
    element: <HomeUsuario/>
  },
  {//Arbol de Usuario
    path: "/arbolUsuario",
    element: <ArbolUsuario/>
  },
  {//Perfil de usuario
    path: "/perfilUsuario",
    element: <PerfilUsuario/>
  },
  {//Modificar perfil
    path: "/modificarPerfil",
    element: <ModificarPerfil/>
  },
  {//Ejercicios usuario
    path: "/ejercicios",
    element: <Ejercicios/>
  },
  {//Bandeja de usuario
    path: "/bandejaUsuario",
    element: <BandejaUsuario/>
  },
   {//AgregarEjercicio
    path: "/agregarEjercicio",
    element: <AgregarEjercicio/>
  },
  {//ModificarEjercicio
   path: "/modificarEjercicio",
   element: <ModificarEjercicio/>
 },
 {
  path: "/coachHome",
  element:<CoachHome/>
 },
 {
  path:"/bandeja",
  element: <BandejaCoach/>
 },
 {
  path: "/nutricionistaHome",
  element: <NutricionistaHome/>
 },
 {
  path: "/homePersonal",
  element: <HomePersonal/>
 }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)