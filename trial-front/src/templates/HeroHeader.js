import React from 'react';
import { TiHome } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

function HeroHeader() {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate("/");
    };

    return (
        <header className="hero-header">
            <h1 className="title">SHUB</h1>
            <TiHome className="home-icon" onClick={navigateHome} />
        </header>
    );
}

export default HeroHeader;
