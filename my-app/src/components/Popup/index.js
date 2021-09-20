import React from 'react'
import { IndexContext } from '../../context/index'

function Popup(props){
    const { setStatus } = React.useContext(IndexContext);

    return (props.trigger) ? (
        
        <div className="teste popup">
            <div className="popu-iner">
            <div className="popup-header">
                
                <button className="botaoX" onClick={() =>{ props.setTriger(false);setStatus(null)}}>X</button>
                </div>
                {props.children}
            </div>
            
        </div>
       
    ) : "";
}




export default Popup