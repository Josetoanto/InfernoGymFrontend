import React from "react";
import Mask from '../../assets/mask.png';

const NotFound = () => {
    return (
        <div>
            <div id="notFound">
                <img src={Mask} alt="404" id="errorImage" />
                <h1 id="errorMessage">Página no encontrada</h1>
            </div>  
        </div>
    );
}

export default NotFound;
