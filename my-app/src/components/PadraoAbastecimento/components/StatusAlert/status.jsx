import React from "react";
import { IndexContext } from "../../context/index";



function Alert{
    const {status} = React.useContext(IndexContext);
    return (
        { status !== null ? (
            <div className="alterado">
              <div className="certo">⠀</div>
              <h3 className="marginText">Valor alterado!</h3>
            </div>
          ) : (
            <></>
          )}
    )
}

export default Alert