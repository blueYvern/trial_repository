import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import HeroHeader from './templates/HeroHeader';
import * as approute from "./routes/routes";

import HomePage from './pages/Home';
import PageNotFound from './pages/404Page';

import MemoHome from './pages/MemoHome';
// import ElectronicsHome from './pages/ElectronicsHome';
// import CodingHome from './pages/CodingHome';
// import EntertainmentHome from './pages/EntertainmentHome';
// import HealthHome from './pages/HealthHome';
// import WealthHome from './pages/WealthHome';
// import DocumentHome from './pages/DocumentHome';


function App() {
  return (
    <div>
      <HeroHeader/>
      <Router>
        <Routes>
          <Route path={approute.HOME} element={<HomePage />} />
          <Route path={approute.MEMOS} element={<MemoHome tabTitle={"Memos"} />} />
          {/*<Route path={approute.ELECTRONICS} element={<ElectronicsHome tabTitle={"Electronics"} />} />
           <Route path={approute.CODINGS} element={<CodingHome tabTitle={"Coding"} />} />
          <Route path={approute.ENTERTAINMENT} element={<EntertainmentHome tabTitle={"Entertainment"} />} />
          <Route path={approute.DOCS} element={<DocumentHome tabTitle={"Documents"} />} />
          <Route path={approute.HEALTH} element={<HealthHome tabTitle={"Health"} />} />
          <Route path={approute.WEALTH} element={<WealthHome tabTitle={"Wealth"} />} /> */}
          <Route path={approute.NOTFOUND} element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;