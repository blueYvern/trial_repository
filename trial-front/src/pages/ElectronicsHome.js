import React, { useState } from "react";
import TabHeader from "../templates/TabHeader";
import "./styles/electronics-main.css";

import ElectronicsInventory from "./ElectronicsComponents";
import ElectronicsProjects from "./ElectronicsProjects";

const ElectronicsHub = ({ handleClick, currentView }) => (
    <div className="electronics-home-hub">
        {["inventory", "projects"].map((view) => (
            <button
                key={view}
                className={`components-button ${currentView === (view === "inventory") ? "active-button" : "inactive-button"}`}
                id={view}
                onClick={() => handleClick(view === "inventory")}
            >
                {view}
            </button>
        ))}
    </div>
);

const SectionView = ({ isInventory }) => (
    <div className="section-container">
        {isInventory ? <ElectronicsInventory /> : <ElectronicsProjects />}
    </div>
);

const ElectronicsHome = ({ tabTitle }) => {
    const [isInventory, setIsInventory] = useState(true);

    return (
        <div>
            <TabHeader tabTitle={tabTitle} />
            <ElectronicsHub handleClick={setIsInventory} currentView={isInventory} />
            <SectionView isInventory={isInventory} />
        </div>
    );
};

export default ElectronicsHome;