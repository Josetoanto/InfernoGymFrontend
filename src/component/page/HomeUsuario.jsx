import React from "react";
import HeaderUsers from "../template/HeaderUsers";
import Calendario from "../template/Calendario";
import Footer from "../template/Footer";
const HomeUsuario = () => {
    return(
        <>
        <HeaderUsers prompt={"Inferno Gym"}></HeaderUsers>
        <Calendario></Calendario>
        <Footer></Footer>
        </>
    );
}
export default HomeUsuario