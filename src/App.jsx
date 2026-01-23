import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AttractionDetailsPage from './pages/AttractionDetailsPage';
import MissionPage from './pages/MissionPage';
import './App.css'; 
import { spots } from './data/Spots';
import ExperienceDetailPage from './pages/ExperienceDetailPage';
import SeeMoreExperience from './pages/SeeMoreExperience';
import MustVisitPage from './pages/MustVisitPage';
import TravelJournalDetail from './pages/TravelJournalDetail';
import AreaMapPage from './pages/AreaMap';
import TripPlanner from './pages/TripPlanner';
import ScrollToTop from './pages/ScrollToTop';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/must-visit" element={<MustVisitPage />} />
          <Route path="/attraction/:id" element={<AttractionDetailsPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/experience/:id" element={<ExperienceDetailPage />}/>
          <Route path="/all-experiences" element={<SeeMoreExperience />} />
          <Route path="/travel-journal" element={<TravelJournalDetail/>}/>
          <Route path="/area" element={<AreaMapPage/>}/>
          <Route path="/trip-planner" element={<TripPlanner/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;