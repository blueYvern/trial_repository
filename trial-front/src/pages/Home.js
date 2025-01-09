import React,{useState} from "react";
import RootHub from '../templates/RootHub';


function HomePage({updateTab}){

    const [tab,setTab] = useState("");

    const updateSelection = (tab) => {
        setTab(tab);
        updateTab(tab);
    };

    return(
        <div>
            <RootHub updateTab={(path) => {}} />
        </div>
    );

}

export default HomePage;