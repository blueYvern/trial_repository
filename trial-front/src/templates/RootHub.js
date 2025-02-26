import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import "./templates.css";

const RootNavigator = ({ items, onItemClick }) => {
    const containerRef = useRef(null);
    const buttonsRef = useRef([]);
    const [showArrows, setShowArrows] = useState(false);
    const [isCentered, setIsCentered] = useState(true);

    useEffect(() => {
        if (containerRef.current && buttonsRef.current.length > 0) {
            console.log("buttons", buttonsRef.current.length);
            console.log("client", containerRef.current.clientWidth);
            const totalButtonWidth = buttonsRef.current.reduce((sum, btn) => sum + (btn?.offsetWidth || 0), 0);
            const containerWidth = containerRef.current.clientWidth;
            console.log("total", totalButtonWidth);

            if (totalButtonWidth > containerWidth) {
                setShowArrows(true);
                setIsCentered(false);
            } else {
                setShowArrows(false);
                setIsCentered(true);
            }
        }
    }, [items]);

    const scroll = (direction) => {
        if (containerRef.current) {
            const scrollAmount = containerRef.current.clientWidth / 2;
            containerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="root-navigator-container">
            {showArrows && <button className="scroll-button left" onClick={() => scroll("left")}>&#9664;</button>}
            <div className={`root-navigator ${isCentered ? "center-align" : ""}`} ref={containerRef}>
                {items.map((item, index) => (
                    <button
                        key={item}
                        ref={(el) => (buttonsRef.current[index] = el)}
                        className="item-button inactive-button"
                        id={item}
                        onClick={() => onItemClick(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>
            {showArrows && <button className="scroll-button right" onClick={() => scroll("right")}>&#9654;</button>}
        </div>
    );
};

function RootHub() {
    const navigate = useNavigate();
    const categories = ["Memos", "Electronics", "Codings", "Entertainment", "Docs", "Health", "Wealth"];

    return (
        <div className="root-hub-container">
            <RootNavigator items={categories} onItemClick={(path) => navigate(path.toLowerCase())} />
        </div>
    );
}

export default RootHub;
