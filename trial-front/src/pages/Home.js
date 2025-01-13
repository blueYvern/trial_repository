import React,{useState, useEffect} from "react";
import RootHub from '../templates/RootHub';
import * as approute from "../routes/routes";
import ApexCharts from 'apexcharts'
import Loader from "../templates/Loader";
import "../App.css";

function MemoDashboard({
    inputData
}){
    return(
        <div className="memo-dashboard">
            <p className="memo-count">Open: {inputData.open_count}</p>
            <p className="memo-count">Completed: {inputData.completed_count}</p>
        </div>
    );
}

function HomePage(){
    
    const [data,setData] = useState([]);
    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {  
        backend_getMemoCount();
    },[]);
    
    const backend_getMemoCount = async () => {
        try{
            setLoadingState(true);
            const response = await fetch(approute.get_memos,{method: 'GET'});
            if(!response.ok){
                throw new Error('HTTP Error! Status: ' + response.status);
            }
            const data = await response.json();
            setData(data[0]);
            setLoadingState(false);
        }
        catch(error){
            alert("Error fetching memo count", error);
        }
    };

    return(
        <div className="home-container">
            <RootHub/>
            {loadingState ? <Loader/> : <div className="dashboard-container">
                <MemoDashboard 
                    inputData={data}/>
            </div>}
        </div>
    );
}

export default HomePage;