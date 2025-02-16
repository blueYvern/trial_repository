import React, { useState } from "react";
import { TabHeader,TabNavigator } from "../templates";
import "./_styles/electronics-main.css";

import ElectronicsInventory from "./ElectronicsComponents";
import ElectronicsProjects from "./ElectronicsProjects";



const ElectronicsHome = ({ tabTitle }) => {
    const views = {
        inventory: "Inventory",
        projects: "Projects"
    };

    const viewComponents = {
        inventory: ElectronicsInventory,
        projects: ElectronicsProjects
    };

    const SectionView = ({ currentView }) => {
        const SelectedComponent = viewComponents[currentView] || (() => <div>View not found</div>);
        return (
            <div className="section-container">
                <SelectedComponent />
            </div>
        );
    };

    const [currentView, setCurrentView] = useState(Object.keys(views)[0]);

    return (
        <div>
            <TabHeader tabTitle={tabTitle} />
            <TabNavigator views={views} currentView={currentView} onTabClick={setCurrentView} />
            <SectionView currentView={currentView} />
        </div>
    );
};

export default ElectronicsHome;
