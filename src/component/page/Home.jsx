import React from "react";
import Header from "../template/Header";
import InicioHome from "../template/InicioHome";
import Servicios from "../organisms/Servicios";
import Atractivo from "../organisms/Atractivo";
import Patrocinadores from "../organisms/Patrocinadores";
import Footer from "../template/Footer";

const Home  = () => {
    return(
        <>
        <Header></Header>
        <InicioHome></InicioHome>
        <Servicios></Servicios>
        <Atractivo></Atractivo>
        <Patrocinadores></Patrocinadores>
        <Footer></Footer>
        </>
    );
}

export default Home 