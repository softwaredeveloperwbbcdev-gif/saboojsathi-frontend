import React from "react";
import Hero from "../../Components/Frontend/Hero";
import AboutScheme from "../../Components/Frontend/AboutScheme";
import Dashboard from "../../Components/Frontend/TransparencyDashboard";
import QuickLinks from "../../Components/Frontend/QuickLinks";
import MediaInsights from "../../Components/Frontend/MediaInsights";
import NoticeModal from "../../Components/Frontend/NoticeModal";

const HomePage = () => (
  <>
    <NoticeModal />
    <Hero />
    <AboutScheme />
    <Dashboard />
    <QuickLinks />
    <MediaInsights />
  </>
);

export default HomePage;
