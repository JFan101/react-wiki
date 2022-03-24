import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import MainNavigation from './components/layout/MainNavigation';
import HomePage from './pages/HomePage';
import WikiPage from './pages/Wiki';

function App() {
  return (
    <div>
      <MainNavigation />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:wiki_slug" element={<WikiPage />} />
        </Routes>
    </div>
  );
}

export default App;
