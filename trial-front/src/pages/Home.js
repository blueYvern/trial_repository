import React,{useState, useEffect} from "react";
import RootHub from '../templates/RootHub';
import * as approute from "../routes/routes";
import DonutChart from "react-donut-chart";
import "../App.css";

function MemoDashboard({
    inputData
}){
    return(
        <div className="memo-dashboard">
            {inputData.length > 0 && <DonutChart
                height={200}
                width={200}
                legend={false}
                colors={["#FF0000", "#00FF00"]}
                data={[
                    {   label: "Completed", 
                        value: inputData[0].completed_count 
                    },
                    {   label: "Open", 
                        value: inputData[0].open_count 
                    }
            ]}/>
            }
        </div>
    );
}

function HomePage(){
    
    const [data,setData] = useState([]);

    useEffect(() => {  
        backend_getMemoCount();
    },[]);
    
    const backend_getMemoCount = async () => {
        try{
            const response = await fetch(approute.get_memos,{method: 'GET'});
            if(!response.ok){
                throw new Error('HTTP Error! Status: ' + response.status);
            }
            const data = await response.json();
            setData(data);
        }
        catch(error){
            alert("Error fetching memo count", error);
        }
    };

    return(
        <div className="home-container">
            <RootHub/>
            <div className="dashboard-container">
                <MemoDashboard 
                    inputData={data}/>
            </div>
        </div>
    );
}

export default HomePage;