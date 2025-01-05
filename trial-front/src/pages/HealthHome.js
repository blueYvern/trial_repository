import React from "react";
import TabHeader from "../templates/TabHeader";
import { BrowserRouter as _,Routes,Route } from "react-router-dom";

function HealthHome({tabTitle}) {
    return (
        <div>
            <TabHeader tabTitle={tabTitle}/>
            <Routes>
                <Route path="/" element={<button onClick={() => window.location.href = "/"}>Back</button>} />
            </Routes>            
        </div>
    );
}

export default HealthHome;