import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';


import HeroHeader from './templates/HeroHeader';

import HomePage from './pages/Home';
import MemoHome from './pages/MemoHome';
import CodingHome from './pages/CodingHome';
import ElectronicsHome from './pages/ElectronicsHome';
import EntertainmentHome from './pages/EntertainmentHome';
import HealthHome from './pages/HealthHome';
import WealthHome from './pages/WealthHome';
import DocumentHome from './pages/DocumentHome';

function App() {

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

  return (
    <div>
      <HeroHeader/>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/memos/*" element={<MemoHome tabTitle={"Memos"} />} />
          <Route path="/electronics/*" element={<ElectronicsHome tabTitle={"Electronics"} />} />
          <Route path="/codings/*" element={<CodingHome tabTitle={"Coding"} />} />
          <Route path="/entertainment/*" element={<EntertainmentHome tabTitle={"Entertainment"} />} />
          <Route path="/docs/*" element={<DocumentHome tabTitle={"Documents"} />} />
          <Route path="/health/*" element={<HealthHome tabTitle={"Health"} />} />
          <Route path="/wealth/*" element={<WealthHome tabTitle={"Wealth"} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;