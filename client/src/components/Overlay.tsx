import React from 'react';
import '../styles/Overlay.css';

interface overlayProp{
    isOpen: boolean;
}

function Overlay(prop:overlayProp){
    return(
        <div className={`overlay ${prop.isOpen?'active':''}`}></div>
    )
}

export default Overlay;