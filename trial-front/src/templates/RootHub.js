import React,{ useState } from "react";
import "../App.css";
import { useNavigate } from 'react-router-dom';


function ItemButtons({onClick}) {
    return (
        <div className="item-buttons">
            <button className="item-button" onClick={onClick} id="memos">Memos</button>
            <button className="item-button" onClick={onClick} id="electronics">Electronics</button>
            <button className="item-button" onClick={onClick} id="codings">Codings</button>
            <button className="item-button" onClick={onClick} id="entertainment">Entertainment</button>
            <button className="item-button" onClick={onClick} id="docs">Docs</button>
            <button className="item-button" onClick={onClick} id="health">Health</button>
            <button className="item-button" onClick={onClick} id="wealth">Wealth</button>
        </div>
    );
}

function RootHub() {  
    const navigation = useNavigate();

    const handleNavigation = (path) => {
        navigation(path);
    };

    const handleTabClick = (e) => {
        let tab = e.currentTarget.id;
        console.log(tab);
        handleNavigation(tab);
    };


    return (
        <div className="root-hub-container">
            <ItemButtons onClick={(e) => handleTabClick(e)}/>
        </div>
    );
}

export default RootHub;
