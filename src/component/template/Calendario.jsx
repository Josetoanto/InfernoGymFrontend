import React from "react";

const Calendario = () => {
    return (
        <>
        <div id = "FlexBox">
            <div id = "PrimerosDias">
                <div id="Largo"><h1 className="calendarioTitulo">Lunes</h1></div>
                <div id="Corto"><h1 className="calendarioTitulo">Martes</h1></div>
            </div>
            <div id = "PrimerosDias">
                <div id="Largo"><h1 className="calendarioTitulo">Miercoles</h1></div>
                <div id="Corto"><h1 className="calendarioTitulo">Jueves</h1></div>
            </div>
            <div id="UltimosDias">
                <div id="Corto"><h1 className="calendarioTitulo">Viernes</h1></div>
                <div id="Corto"><h1 className="calendarioTitulo">Sabado</h1></div>
            </div>
        </div>
        </>
    );
}
export default Calendario