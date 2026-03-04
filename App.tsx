
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AgriLearn from './components/AgriLearn';
import AIDetector from './components/AIDetector';
import AIAlert from './components/AIAlert';
import KrishiParivaar from './components/KrishiParivaar';
import CropPlanning from './components/CropPlanning';
import ApniDukaan from './components/ApniDukaan';

function App() {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agri-learn" element={<AgriLearn />} />
            <Route path="/ai-detector" element={<AIDetector />} />
            <Route path="/ai-alert" element={<AIAlert />} />
            <Route path="/krishi-parivaar" element={<KrishiParivaar />} />
            <Route path="/crop-planning" element={<CropPlanning />} />
            <Route path="/apni-dukaan" element={<ApniDukaan />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
