import React, { use, useEffect,useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import HeroHeader from './templates/HeroHeader';
import RootHub from './templates/RootHub';
import MemoHome from './pages/MemoHome';
import CodingHome from './pages/CodingHome';
import ElectronicsHome from './pages/ElectronicsHome';
import EntertainmentHome from './pages/EntertainmentHome';
import HealthHome from './pages/HealthHome';
import WealthHome from './pages/WealthHome';
import DocumentHome from './pages/DocumentHome';

const backend_url = "http://192.168.1.12:5000/";

function App() {
  const [tab,setTab] = useState("");

  
  // useEffect(() => {
  //   axios.get(backend_url + 'home/')
  //     .then(response => setMessage(response.data.message))
  //     .catch(error => console.error(error));
  // },[]);

  // const sendData = () => {
  //   axios.post(backend_url, { data: '{data:test}' })
  //     .then(response => console.log(response))
  //     .catch(error => console.error(error));
  // };

  const send_back = () => {
    setTab("");
  };

  const updateTab = (tab) => {
    setTab(tab);
  };

  return (
    <div>
      <HeroHeader/>
      <Router>
        <Routes>
          <Route path="/" element={<RootHub updateTab={updateTab} hidden={false} />} />
          <Route path="/memos" element={<MemoHome tabTitle={tab} />} />
          <Route path="/electronics" element={<ElectronicsHome tabTitle={tab} />} />
          <Route path="/codings" element={<CodingHome tabTitle={tab} />} />
          <Route path="/entertainment" element={<EntertainmentHome tabTitle={tab} />} />
          <Route path="/docs" element={<DocumentHome tabTitle={tab} />} />
          <Route path="/health" element={<HealthHome tabTitle={tab} />} />
          <Route path="/wealth" element={<WealthHome tabTitle={tab} />} />
          <Route path="/" element={<div><br/><button onClick={send_back}>Back</button></div>} />
        </Routes>
      </Router>


  
    </div>
  )

}

export default App;