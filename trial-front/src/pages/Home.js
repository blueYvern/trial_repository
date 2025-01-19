import React,{useState, useEffect} from "react";
import RootHub from '../templates/RootHub';
import * as approute from "../routes/routes";
import Chart from 'react-apexcharts';
import Loader from "../templates/Loader";
import "../App.css";

const MemoChart = ({inputData}) => {
    const series = [
        inputData?.open_count || 0,
        inputData?.completed_count || 0,
    ];

    const options = {
        chart: {type: 'donut'},
        legend:{show: false},
        dataLabels: {enabled:false},
        tooltip: {enabled: false},
        labels: ['Open', 'Completed'],
        plotOptions: {
            pie: {
                customScale: 0.72,
                expandOnClick: true,
                offsetY: -38,
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#ffffff',
                            formatter: function (w) {
                                return (inputData?.open_count || 0) + (inputData?.completed_count || 0);
                            }
                        }
                    }
                }
            }
        }
    }

    return(
        <Chart options={options} series={series} type="donut" />
    );
}

const MemoDashboard = ({
    inputData,
    memoLoadingState
}) => {
    return(
        <div className="dashboard">
            <div className="dashboard-title">Memo</div>
            {memoLoadingState ? <Loader/> : <MemoChart className="memo-chart" inputData={inputData}/>}
        </div>
    );
}

const DashBoards = ({
    memoData,
    memoLoadingState}) => {
    return(
        <div className="dashboard-container">
            <MemoDashboard inputData={memoData} memoLoadingState={memoLoadingState}/>
            {/* <ElectronicsDashboard/>
             <CodingDashboard/>
            <EntertainmentDashboard/>
            <DocsDashboard/>
            <HealthDashboard/>
            <WealthDashboard/> */} 
        </div>
    )
}

function HomePage(){
    
    const [memoData,setMemoData] = useState({});
    const [memoLoadingState, setMemoLoadingState] = useState(false);

    useEffect(() => {  
        backend_getMemoCount();
    },[]);
    
    const backend_getMemoCount = async () => {
        try{
            setMemoLoadingState(true);
            const response = await fetch(approute.get_memos,{method: 'GET'});
            if(!response.ok){
                throw new Error('HTTP Error! Status: ' + response.status);
            }
            const memoData = await response.json();
            setMemoData(memoData[0]);
            setMemoLoadingState(false);
        }
        catch (error) {
            alert(`Error fetching memo count: ${error.message}`);
        } finally {
            setMemoLoadingState(false);
        }
    };

    return(
        <div className="home-container">
            <RootHub/>
            <div className="dashboards-section">
                <DashBoards 
                    memoData={memoData}
                    memoLoadingState={memoLoadingState}/>
            </div>
        </div>
    );
}

export default HomePage;