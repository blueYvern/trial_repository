import React,{Suspense,lazy} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import HeroHeader from './templates/HeroHeader';
import Loader from './templates/Loader';
import {HOME, MEMOS, ELECTRONICS, NOTFOUND} from "./routes/routes";

const HomePage = lazy(() => import('./pages/Home'));
const PageNotFound = lazy(() => import('./pages/404Page'));
const MemoHome = lazy(() => import('./pages/MemoHome'));
const ElectronicsHome = lazy(() => import('./pages/ElectronicsHome'));

function App() {
  return (
    <div>
      <Router>  
        <HeroHeader/>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={HOME} element={<HomePage />} />
            <Route path={MEMOS} element={<MemoHome tabTitle="Memos" />} />
            <Route path={ELECTRONICS} element={<ElectronicsHome tabTitle="Electronics" />} />
            <Route path={NOTFOUND} element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </div>  
  );
}

export default App;