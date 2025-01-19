import React,{useState, useEffect} from "react";
import TabHeader from "../templates/TabHeader";
import "./styles/electronics-main.css";

import ElectronicsInventory from "./ElectronicsComponents";
import ElectronicsProjects from "./ElectronicsProjects";

// components and projects

const ElectronicsHub = ({
    handleClick,
    currentView
}) => {
    return (
        <div className="electronics-home-hub">
            <button className={currentView ? "components-button active-button" : "components-button inactive-button"} id="inventory" onClick={() => handleClick(true)}>inventory</button>
            <button className={!currentView ? "components-button active-button" : "components-button inactive-button"} id="projects" onClick={() => handleClick(false)}>projects</button>
        </div>
    );
}

const SectionView = ({isInventory}) => {
    return (
        <div className="section-container">
            {isInventory ? <ElectronicsInventory/> : <ElectronicsProjects/>}
        </div>
    );
}

const ElectronicsHome = ({tabTitle}) => {
    const [sectionView,setSectionView] = useState(false);

    const toggleView = (isInventory) => {
        setSectionView(isInventory);
    }

    return (
        <div>
            <TabHeader tabTitle={tabTitle}/>
            <ElectronicsHub 
                handleClick = {toggleView}
                currentView = {sectionView}/>  
            <SectionView isInventory={sectionView}/>        
        </div>
    );
}

export default ElectronicsHome;