import React, { useEffect,useState } from 'react';
import axios from 'axios';
import HeroHeader from './templates/HeroHeader';
import RootHub from './templates/RootHub';
import MemoHome from './pages/MemoHome';
import CodingHome from './pages/CodingHome';
import ElectronicsHome from './pages/ElectronicsHome';
import EntertainmentHome from './pages/EntertainmentHome';
import HealthHome from './pages/HealthHome';
import WealthHome from './pages/WealthHome';
import DocumentHome from './pages/DocumentHome';

let backend_url = "http://192.168.1.12:5000/";


function App() {
  const [tab,setTab] = useState("");

  const [message,setMessage] = useState("");


  useEffect(() => {
    axios.get(backend_url + 'home/')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error(error));
  },[]);

  const sendData = () => {
    axios.post(backend_url, { data: '{data:test}' })
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };

  const send_back = () => {
    setTab("");
  };

  const updateTab = (tab) => {
    setTab(tab);
    send_selected_tab(tab);
  };

  const send_selected_tab = (tab) => {
    axios.get(backend_url + '/get_tab/' + tab + '/')
        .then(response => console.log(response))
        .catch(error => console.error(error));
  };

  return (
    <div>
      <HeroHeader/>
      <br></br>
      {tab === "" && <RootHub updateTab={updateTab} hidden={true}/>}
      {tab === "memos" && <MemoHome tabTitle={tab}/>}
      {tab === "electronics" && <ElectronicsHome tabTitle={tab}/>}
      {tab === "codings" && <CodingHome tabTitle={tab}/>}
      {tab === "entertainment" && <EntertainmentHome tabTitle={tab}/>}
      {tab === "docs" && <DocumentHome tabTitle={tab}/>}
      {tab === "health" && <HealthHome tabTitle={tab}/>}
      {tab === "wealth" && <WealthHome tabTitle={tab}/>}

      <button onClick={send_back}>Back</button>
  
    </div>
  )

}

export default App;