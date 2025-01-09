import React from 'react';
import '../App.css';
import { TiHome } from "react-icons/ti";

function HeroHeader() {
    return (
        <div class="hero-header">
            <h1 class="title">SHUB</h1>
            <TiHome class="home-icon" onClick={() => window.location.href = "/"} />
        </div>
    );
}

export default HeroHeader;