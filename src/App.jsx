import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// Pages
import LandingPage from "@/pages/LandingPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import SitemapPage from "@/pages/SitemapPage";
import DisclaimerPage from "@/pages/DisclaimerPage";
import SafetyReportPage from "@/pages/SafetyReportPage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/safety-report" element={<SafetyReportPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
