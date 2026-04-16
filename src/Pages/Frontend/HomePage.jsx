import Hero from "../../Components/Frontend/Hero";
import AboutScheme from "../../Components/Frontend/AboutScheme";
import Dashboard from "../../Components/Frontend/TransparencyDashboard";
import QuickLinks from "../../Components/Frontend/QuickLinks";
import MediaInsights from "../../Components/Frontend/MediaInsights";
import NoticeModal from "../../Components/Frontend/NoticeModal";
import Coverage from "../../Components/Frontend/Coverage";

const HomePage = () => (
  <>
    <NoticeModal />
    <Hero />
    <AboutScheme />
    <MediaInsights />
    <Coverage />
    <Dashboard />
    <QuickLinks />
  </>
);

export default HomePage;
