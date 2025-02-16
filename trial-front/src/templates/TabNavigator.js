import React, { useRef, useState, useEffect } from "react";

import "./templates.css";

const TabNavigator = ({ views, currentView, onTabClick }) => {
    const containerRef = useRef(null);
    const buttonsRef = useRef([]);
    const [showArrows, setShowArrows] = useState(false);
    const [isCentered, setIsCentered] = useState(true);

    useEffect(() => {
        if (containerRef.current && buttonsRef.current.length > 0) {
            const totalButtonWidth = buttonsRef.current.reduce((sum, btn) => sum + (btn?.offsetWidth || 0), 0);
            const containerWidth = containerRef.current.clientWidth;

            if (totalButtonWidth > containerWidth) {
                setShowArrows(true);
                setIsCentered(false);
            } else {
                setShowArrows(false);
                setIsCentered(true);
            }
        }
    }, [views]);

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
        <div className="tab-navigator-container">
            {showArrows && <button className="scroll-button left" onClick={() => scroll("left")}>&#9664;</button>}
            <div className={`tab-navigator ${isCentered ? "center-align" : ""}`} ref={containerRef}>
                {Object.keys(views).map((view, index) => (
                    <button
                        key={view}
                        ref={(el) => (buttonsRef.current[index] = el)}
                        className={`components-button ${currentView === view ? "active-button" : "inactive-button"}`}
                        onClick={() => onTabClick(view)}
                    >
                        {views[view]}
                    </button>
                ))}
            </div>
            {showArrows && <button className="scroll-button right" onClick={() => scroll("right")}>&#9654;</button>}
        </div>
    );
};

export default TabNavigator;