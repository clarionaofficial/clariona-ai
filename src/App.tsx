/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { VoiceAgent } from './components/voice-agent/VoiceAgent';
import ScrollToTop from './components/layout/ScrollToTop';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import { WebsitesPage, GMBPage, VoiceAgentsPage } from './pages/ServicePages';

import { VoiceProvider } from './lib/VoiceContext';

export default function App() {
  return (
    <Router>
      <VoiceProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/websites" element={<WebsitesPage />} />
              <Route path="/gmb-ranking" element={<GMBPage />} />
              <Route path="/voice-agents" element={<VoiceAgentsPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
          <Footer />
          <VoiceAgent />
        </div>
      </VoiceProvider>
    </Router>
  );
}
