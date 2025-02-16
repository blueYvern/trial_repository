import React, { useState, useEffect } from "react";
import Chart from 'react-apexcharts';

import { Loader, RootHub } from "../templates";
import * as approute from "../routes/routes";


const MemoChart = ({ open_count = 0, completed_count = 0 }) => {
    const series = [open_count, completed_count];
    const total = open_count + completed_count;

    const options = {
        chart: { type: 'donut' },
        legend: { show: false },
        dataLabels: { enabled: false },
        tooltip: { enabled: false },
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
                            color: '#000000',
                            formatter: () => total,
                        }
                    }
                }
            }
        }
    };

    return <Chart options={options} series={series} type="donut" />;
};

const MemoDashboard = ({ inputData, memoLoadingState }) => (
    <div className="dashboard">
        <div className="dashboard-title black-box">Memo</div>
        {memoLoadingState ? <Loader /> : <MemoChart {...inputData} />}
    </div>
);

const DashBoards = ({ memoData, memoLoadingState }) => (
    <div className="dashboard-container">
        <MemoDashboard inputData={memoData} memoLoadingState={memoLoadingState} />
        {/* Other dashboards can be added here */}
    </div>
);

const HomePage = () => {
    const [memoData, setMemoData] = useState({});
    const [memoLoadingState, setMemoLoadingState] = useState(false);

    useEffect(() => {
        fetchMemoData();
    }, []);

    const fetchMemoData = async () => {
        setMemoLoadingState(true);
        try {
            const response = await fetch(approute.get_memos, { method: 'GET' });
            if (!response.ok) throw new Error('HTTP Error! Status: ' + response.status);
            const memoData = await response.json();
            setMemoData(memoData[0] || {});
        } catch (error) {
            alert(`Error fetching memo count: ${error.message}`);
        } finally {
            setMemoLoadingState(false);
        }
    };

    return (
        <div className="home-container">
            <RootHub />
            <div className="dashboards-section">
                <DashBoards memoData={memoData} memoLoadingState={memoLoadingState} />
            </div>
        </div>
    );
};

export default HomePage;