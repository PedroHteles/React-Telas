import React from "react";
import { IndexContext } from "../../context/index";

function Alert(){
  const {status} = React.useContext(IndexContext)
  return (
    
    status == false ? (<div className="alterado">
    <div className="certo">⠀</div>
    <h3 className="marginText">Valor alterado!</h3>
    </div>  ) : (<></>) &&
    status == true ? (<div className="alterado">
    <div className="certo">⠀</div>
    <h3 className="marginText">Valor muda!</h3>
    </div>  ) : (<></>)

  
  )
}

export default Alert