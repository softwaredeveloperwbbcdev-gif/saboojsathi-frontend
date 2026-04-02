//packages
import { Router, Routes, Route, Outlet } from "react-router-dom";
//Middleware (custome hook)
import AuthGuard from "../Components/AuthGuard";

//Layouts
import Header from "../Components/Frontend/Header";
import Footer from "../Components/Frontend/Footer";
import ScrollToTop from "../Components/Frontend/ScrollToTop";

//Public Pages
import HomePage from "../Pages/Frontend/HomePage";
import AboutPage from "../Pages/Frontend/AboutPage";
import SynopticReport from "../Pages/Frontend/SynopticReport";
import DistrictWiseReport from "../Pages/Frontend/DistrictWiseReport";
import GenderWiseReport from "../Pages/Frontend/GenderWiseReport";
import SocialGroupReport from "../Pages/Frontend/SocialGroupReport";
import SearchBeneficiary from "../Pages/Frontend/SearchBeneficiary";
import ContactUs from "../Pages/Frontend/ContactUs";
import ENit from "../Pages/Frontend/ENit";
import PreBidMinutes from "../Pages/Frontend/PreBidMinutes";
import TechnicalEvaluation from "../Pages/Frontend/TechnicalEvaluation";
import FinancialEvaluation from "../Pages/Frontend/FinancialEvaluation";
import GrievancePage from "../Pages/Frontend/GrievancePage";
import StudentLogin from "../Pages/Frontend/StudentLogin";

//Login Pages
import LoginFormCms from "../Pages/Frontend/LoginFormCms.jsx";
import LoginForm from "../Pages/Frontend/LoginForm.jsx";

//Admin Pages
import Dashboard_ from "../Pages/Frontend/Test/Dashboard_.jsx";
import Dashboard from "../Pages/Admin/Dashboard.jsx";
import StudentAdd from "../Pages/Admin/Student/StudentAdd.jsx";
import ViewProfile from "../Pages/Admin/School/ViewProfile.jsx";
import StudentEdit from "../Pages/Admin/Student/StudentEdit.jsx";
import ViewPending from "../Pages/Admin/Circle/ViewPending.jsx";
import ViewStudent from "../Pages/Admin/Circle/ViewStudent.jsx";

//Block User Pages
import DashboardTagging from "../Pages/Admin/Block/DashboardTagging.jsx";
import DashboardChallan from "../Pages/Admin/Block/DashboardChallan.jsx";
import ChallanView from "../Pages/Admin/Block/ChallanView.jsx";
import DistributionUploadViewDistrict from "../Pages/Admin/District/DownloadDistributionViewDistrict.jsx";
import DistributionLocationProcess from "../Pages/Admin/Block/DistributionLocationProcess.jsx";
import DistributionTagSchool from "../Pages/Admin/Block/DistributionTagSchool.jsx";
import DistributionManageTaggedSchool from "../Pages/Admin/Block/DistributionManageTaggedSchool.jsx";
import ApproveChallanView from "../Pages/Admin/Block/ApproveChallanView.jsx";
import DownloadMemorandumView from "../Pages/Admin/Block/DownloadMemorandumView.jsx";
import DistrictViewPending from "../Pages/Admin/District/DistrictViewPending.jsx";
import AllocateChallanView from "../Pages/Admin/Block/AllocateChallanView.jsx";
import AllocateChallanToSchool from "../Pages/Admin/Block/AllocateChallanToSchool.jsx";
// MIS Report (State, District, Block)
// Eligible Student Report
import EligibleStudentReport from "../Pages/Admin/MisReport/EligibleStudentReport.jsx";
import EligibleStudentReportBlock from "../Pages/Admin/MisReport/EligibleStudentReportBlock.jsx";
import EligibleStudentReportSchool from "../Pages/Admin/MisReport/EligibleStudentReportSchool.jsx";
//
import ProfileEntryDistrictReport from "../Pages/Admin/MisReport/ProfileEntryDistrictReport.jsx";
import ProfileEntryBlockReport from "../Pages/Admin/MisReport/ProfileEntryBlockReport.jsx";
import ProfileEntrySchoolReport from "../Pages/Admin/MisReport/ProfileEntrySchoolReport.jsx";
import ProfileEntryStatusReportDist from "../Pages/Admin/MisReport/ProfileEntryStatusReportDist.jsx";
import ProfileEntryStatusReportBlock from "../Pages/Admin/MisReport/ProfileEntryStatusReportBlock.jsx";
import ProfileEntryStatusReportSchool from "../Pages/Admin/MisReport/ProfileEntryStatusReportSchool.jsx";
import DistributionReportDistrict from "../Pages/Admin/MisReport/DistributionReportDistrict.jsx";
import DistributionReportBlock from "../Pages/Admin/MisReport/DistributionReportBlock.jsx";
import DistributionReportSchool from "../Pages/Admin/MisReport/DistributionReportSchool.jsx";
import TaggingDetailsReport from "../Pages/Admin/MisReport/TaggingDetailsReport.jsx";
import TaggingDetailsReportBlock from "../Pages/Admin/MisReport/TaggingDetailsReportBlock.jsx";
import TaggingDetailsReportSchool from "../Pages/Admin/MisReport/TaggingDetailsReportSchool.jsx";
import TaggingDetailsReportOld from "../Pages/Admin/MisReport/TaggingDetailsReportOld.jsx";
import TaggingDetailsReportOldBlock from "../Pages/Admin/MisReport/TaggingDetailsReportOldBlock.jsx";
import TaggingDetailsReportOldSchool from "../Pages/Admin/MisReport/TaggingDetailsReportOldSchool.jsx";
import DistrictChallanReport from "../Pages/Admin/MisReport/DistrictChallanReport.jsx";
import BlockChallanReport from "../Pages/Admin/MisReport/BlockChallanReport.jsx";
import ChallanDetailsByBlock from "../Pages/Admin/MisReport/ChallanDetailsByBlock.jsx";
import ChallanGenerationReport from "../Pages/Admin/MisReport/ChallanGenerationReport.jsx";
import ChallanGenerationReportBlock from "../Pages/Admin/MisReport/ChallanGenerationReportBlock.jsx";
import ChallanGenerationReportSchool from "../Pages/Admin/MisReport/ChallanGenerationReportSchool.jsx";
import ChallanParticularsView from "../Pages/Admin/MisReport/ChallanParticularsView.jsx";
import ChallanAllocationStatusReport from "../Pages/Admin/MisReport/ChallanAllocationStatusReport.jsx";
import ChallanAllocationStatusBlockReport from "../Pages/Admin/MisReport/ChallanAllocationStatusBlockReport.jsx";
import InvoiceViewReport from "../Pages/Admin/MisReport/InvoiceViewReport.jsx";

import AdminSynopticReport from "../Pages/Admin/MisReport/SynopticReport.jsx";
import CategorywiseReport from "../Pages/Admin/MisReport/CategorywiseReport.jsx"; // rest
import AdminGenderwiseReport from "../Pages/Admin/MisReport/GenderwiseReport.jsx";
import AdminGenderwiseReportBlock from "../Pages/Admin/MisReport/GenderwiseReportBlock.jsx";
import AdminSocialGroupwiseReport from "../Pages/Admin/MisReport/SocialGroupwiseReport.jsx";
import AdminSocialGroupwiseReportBlock from "../Pages/Admin/MisReport/SocialGroupwiseReportBlock.jsx";
import ChallanPaymentReport from "../Pages/Admin/MisReport/ChallanPaymentReport.jsx";
// old phase report
import DistributionReportDistrictOldPhase from "../Pages/Admin/MisReport/DistributionReportDistrictOldPhase.jsx";
import ChallanMis from "../Pages/Admin/MisReport/ChallanMis.jsx";
import ChallanMisBlock from "../Pages/Admin/MisReport/ChallanMisBlock.jsx";
import ChallanIssuedMis from "../Pages/Admin/MisReport/ChallanIssuedMis.jsx";

///////////////////////////////////////////////////////////////////////////////////////////
import ChangePassword from "../Pages/ChangePassword.jsx";
import ResetFinalize from "../Pages/Admin/State/ResetFinalize.jsx";
import ResetPasswordState from "../Pages/Admin/State/ResetPasswordState.jsx";
///////////////////////////////////////////////////////////////////////////////////////////
import CmsDashboard from "../Pages/Admin/Cms/CmsDashboard.jsx";
///////////////////////////////////// 16-09-25
import ConsignmentAdd from "../Pages/Admin/Cms/ConsignmentAdd.jsx";
import ConsignmentView from "../Pages/Admin/Cms/ConsignmentView.jsx";
import ConsignmentEdit from "../Pages/Admin/Cms/ConsignmentEditCopy.jsx";
import ConsignmentUnloadView from "../Pages/Admin/Cms/ConsignmentUnloadView.jsx";
import AdminDistrictSchoolTaggedReport from "../Pages/Admin/Cms/AdminDistrictSchoolTaggedReport.jsx";
import AdminTaggingUnloadReport from "../Pages/Admin/Cms/AdminTaggingUnloadReport.jsx";
import ChallanAdd from "../Pages/Admin/Cms/ChallanAdd.jsx";
import ViewChallan from "../Pages/Admin/Cms/ViewChallan.jsx";
import ViewChallanReport from "../Pages/Admin/Cms/ViewChallanReport.jsx";
import ChallanCmsEntry from "../Pages/Admin/Cms/ChallanCmsEntry.jsx";
import ChallanViewFilter from "../Pages/Admin/Cms/ChallanViewFilterCopy.jsx";
import InvoiceAdd from "../Pages/Admin/Cms/InvoiceAddCopy.jsx";
import InvoiceLinkChallan from "../Pages/Admin/Cms/InvoiceLinkChallan.jsx";
import InvoiceView from "../Pages/Admin/Cms/InvoiceView.jsx";
import ChallanViewFilterDeo from "../Pages/Admin/Cms/ChallanViewFilterDeo.jsx";
import AppsTest from "../Pages/Test/AppsTest.jsx";
import AppsTestTwo from "../Pages/Test/AppsTestTwo.jsx";
import AccessDeniedPage from "../Components/AccessDeniedPage.jsx";

///////////////////////////////////// 16-09-25

//A Component which defines the layout of all the publi routes
const PublicLayout = () => (
  <div className="min-h-screen bg-white">
    <Header />
    <ScrollToTop />
    <main>
      <Outlet /> {/* Public pages will render here */}
    </main>
    <Footer />
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {/* ================= PUBLIC ROUTES (With Header/Footer) ================= */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* Welcome or landing page */}
        <Route path="/about" element={<AboutPage />} />
        {/* About Sabooj Sathi Scheme */}

        {/* Tender Documents routes */}

        <Route path="/tenders/enit" element={<ENit />} />
        {/* e-Notice inviting tender*/}
        <Route path="/tenders/pre-bid-minutes" element={<PreBidMinutes />} />
        {/* Minutes for Pre-bid Meetings */}
        <Route
          path="/tenders/technical-bid-evaluation"
          element={<TechnicalEvaluation />}
        />
        {/* Minutes for Technical Bid Evaluation */}
        <Route
          path="/tenders/financial-bid-evaluation"
          element={<FinancialEvaluation />}
        />
        {/* Minutes for Financial Bid Evaluation */}

        {/* Tender Documents routes */}

        {/* Public reporting for RTI (Since inception of Scheme) */}
        <Route path="/reports/synoptic" element={<SynopticReport />} />
        {/* Year wise Synpotic Report */}
        <Route path="/reports/district-wise" element={<DistrictWiseReport />} />
        {/* District wise report since inception of scheme */}

        <Route path="/reports/gender-wise" element={<GenderWiseReport />} />
        {/* Gender wise report since inception of scheme*/}
        <Route
          path="/reports/social-group-wise"
          element={<SocialGroupReport />}
        />
        {/* Social Group wise report since inception of scheme*/}
        <Route
          path="/reports/search-beneficiary"
          element={<SearchBeneficiary />}
        />
        {/* Beneficiary Search for individual beneficiary over the Years */}
        {/* Public reporting for RTI (Since inception of Scheme) */}

        {/* contact us  */}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/grievance" element={<GrievancePage />} />
        <Route path="/student-login" element={<StudentLogin />} />
      </Route>
      {/* ================= PUBLIC ROUTES (Without Header/Footer) ================= */}
      <Route path="/cms" element={<LoginFormCms />} />
      <Route path="/Login" element={<LoginForm />} />
      {/* Public Routes */}
      {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
      {/* Test Routes */}
      <Route path="/Test" element={<AppsTest />} />
      <Route path="/TestTwo" element={<AppsTestTwo />} />
      {/* Protected Routes */}
      <Route element={<AuthGuard />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Dashboard_" element={<Dashboard_ />} />
        <Route path="/DashboardTagging" element={<DashboardTagging />} />
        <Route path="/DashboardChallan" element={<DashboardChallan />} />
        <Route path="/Admin" element={<Dashboard />} />
        <Route path="/StudentAdd/:phaseId" element={<StudentAdd />} />
        <Route path="/StudentProfile/:phaseId" element={<ViewProfile />} />
        <Route path="/StudentEdit/:id/:phaseId" element={<StudentEdit />} />
        <Route
          path="/CircleVerifyListSchool/:phaseId"
          element={<ViewPending />}
        />
        <Route
          path="/CircleVerifyListApplicant/:phaseId/:schoolId/:status"
          element={<ViewStudent />}
        />
        <Route
          path="/DownloadDistributionDistrict"
          element={<DistributionUploadViewDistrict />}
        />
        <Route
          path="/DistrictVerifyListSchool"
          element={<DistrictViewPending />}
        />
        <Route
          path="/DistributionLocationProcess/:phaseId"
          element={<DistributionLocationProcess />}
        />
        <Route
          path="/DistributionTagSchool/:phaseId/:location"
          element={<DistributionTagSchool />}
        />
        <Route
          path="/DistributionManageTaggedSchool/:phaseId"
          element={<DistributionManageTaggedSchool />}
        />
        <Route
          path="/ApproveChallanView/:phaseId"
          element={<ApproveChallanView />}
        />
        <Route path="/ChallanView" element={<ChallanView />}></Route>
        <Route
          path="/DownloadMemorandumView"
          element={<DownloadMemorandumView />}
        />
        <Route
          path="/AllocateChallanView/:phaseId"
          element={<AllocateChallanView />}
        />
        <Route
          path="/AllocateChallanToSchool/:phaseId/:challanId"
          element={<AllocateChallanToSchool />}
        />
        {/* State MIS Reports */}

        {/* Eligible Student Report */}
        <Route
          path="/EligibleStudentReportDistrict" //District Wise
          element={<EligibleStudentReport />}
        />
        <Route
          path="/EligibleStudentReportBlock/:id" //Block Wise
          element={<EligibleStudentReportBlock />}
        />
        <Route
          path="/EligibleStudentReportSchool/:id" //School Wise
          element={<EligibleStudentReportSchool />}
        />

        {/* Profile Entry Report */}
        <Route
          path="/ProfileEntryDistrictReport" // District Wise
          element={<ProfileEntryDistrictReport />}
        />
        <Route
          path="/ProfileEntryBlockReport/:id"
          element={<ProfileEntryBlockReport />} // Block Wise
        />
        <Route
          path="/ProfileEntrySchoolReport/:id"
          element={<ProfileEntrySchoolReport />} // School Wise
        />

        {/* Profile Entry Status Report */}
        <Route
          path="/ProfileEntryStatusReportDist" //District Wise
          element={<ProfileEntryStatusReportDist />}
        />
        <Route
          path="/ProfileEntryStatusReportBlock/:id" // Block Wise
          element={<ProfileEntryStatusReportBlock />}
        />
        <Route
          path="/ProfileEntryStatusReportSchool/:id" // School Wise
          element={<ProfileEntryStatusReportSchool />}
        />

        {/* Distribution Detail Report  */}
        <Route
          path="/DistributionReportDistrict"
          element={<DistributionReportDistrict />} // District Wise
        />
        <Route
          path="/DistributionReportBlock/:id"
          element={<DistributionReportBlock />} // Block Wise
        />
        <Route
          path="/DistributionReportSchool/:id"
          element={<DistributionReportSchool />} // School Wise
        />

        {/* School Tagging Detail Report  */}
        <Route
          path="/TaggingDetailsReport" // District Wise
          element={<TaggingDetailsReport />}
        />
        <Route
          path="/TaggingDetailsReportBlock/:id" // Block Wise
          element={<TaggingDetailsReportBlock />}
        />
        <Route
          path="/TaggingDetailsReportSchool/:id" // School Wise
          element={<TaggingDetailsReportSchool />}
        />

        {/* School Tagging Detail Old Report  */}
        <Route
          path="/TaggingDetailsReportOld/:phaseId" // District Wise
          element={<TaggingDetailsReportOld />}
        />
        <Route
          path="/TaggingDetailsReportOldBlock/:phaseId/:id" // Block Wise
          element={<TaggingDetailsReportOldBlock />}
        />
        <Route
          path="/TaggingDetailsReportOldSchool/:phaseId/:id" // School Wise
          element={<TaggingDetailsReportOldSchool />}
        />

        {/* Challan MIS Report  */}
        <Route
          path="/DistrictChallanReport" // District Wise
          element={<DistrictChallanReport />}
        />
        <Route
          path="/BlockChallanReport/:id" // Block Wise
          element={<BlockChallanReport />}
        />
        <Route
          path="/ChallanDetailsByBlock/:id" // Challan Wise
          element={<ChallanDetailsByBlock />}
        />

        {/* Challan Generation Report  */}
        <Route
          path="/ChallanGenerationReport" // District Wise
          element={<ChallanGenerationReport />}
        />
        <Route
          path="/ChallanGenerationReportBlock/:id" // Block Wise
          element={<ChallanGenerationReportBlock />}
        />
        <Route
          path="/ChallanGenerationReportSchool/:id" // School Wise
          element={<ChallanGenerationReportSchool />}
        />

        {/* Challan Allocation Status Report */}
        <Route
          path="/ChallanAllocationStatusReport" // District Wise View
          element={<ChallanAllocationStatusReport />}
        />
        <Route
          path="/ChallanAllocationStatusBlockReport/:id/" //11.08.2025
          element={<ChallanAllocationStatusBlockReport />}
        />

        {/* Challan View */}
        <Route
          path="/ChallanParticularsView/:phaseId" //08.08.2025
          element={<ChallanParticularsView />}
        />

        {/* Invoice View */}
        <Route
          path="/InvoiceViewReport" //11.08.2025
          element={<InvoiceViewReport />}
        />

        <Route
          path="/ResetPasswordState" //11.08.2025
          element={<ResetPasswordState />}
        />
        <Route
          path="/change-password" // modified
          element={<ChangePassword />}
        />
        <Route
          path="/SynopticReport" // modified
          element={<AdminSynopticReport />}
        />

        <Route
          path="/GenderwiseReport" // modified
          element={<AdminGenderwiseReport />}
        />
        <Route
          path="/GenderwiseReportBlock/:id" // modified
          element={<AdminGenderwiseReportBlock />}
        />
        <Route
          path="/SocialGroupwiseReport"
          element={<AdminSocialGroupwiseReport />}
        />
        <Route
          path="/SocialGroupwiseReportBlock/:phaseId/:id"
          element={<AdminSocialGroupwiseReportBlock />}
        />
        <Route path="/cmsdashboard" element={<CmsDashboard />} />
        <Route
          path="/ChallanPaymentReport/:phaseId"
          element={<ChallanPaymentReport />}
        />
        <Route path="/ChallanMis/:phaseId" element={<ChallanMis />} />
        <Route
          path="/ChallanMisBlock/:phaseId/:id"
          element={<ChallanMisBlock />}
        />
        <Route
          path="/ChallanIssuedMis/:id/:phaseId"
          element={<ChallanIssuedMis />}
        />
        <Route path="/cmsdashboard" element={<CmsDashboard />} />
        <Route path="/consignment_add" element={<ConsignmentAdd />} />
        <Route path="/consignment_view" element={<ConsignmentView />} />
        <Route
          path="/consignment_view_edit/:consignmentId"
          element={<ConsignmentEdit />}
        />
        <Route
          path="/consignment_unload_view"
          element={<ConsignmentUnloadView />}
        />
        <Route
          path="/admin_p3_district_school_tagged_report"
          element={<AdminDistrictSchoolTaggedReport />}
        />
        <Route
          path="/admin_tagging_unload_report"
          element={<AdminTaggingUnloadReport />}
        />
        <Route path="/challan_add" element={<ChallanAdd />} />
        <Route path="/view_challan" element={<ViewChallan />} />
        <Route path="/view_challan_report" element={<ViewChallanReport />} />
        <Route path="/challanCmsEntry" element={<ChallanCmsEntry />} />
        <Route path="/challan_view_filter" element={<ChallanViewFilter />} />
        <Route path="/invoice_add" element={<InvoiceAdd />} />
        <Route path="/invoice_link_challan" element={<InvoiceLinkChallan />} />
        <Route path="/invoice_view" element={<InvoiceView />} />
        <Route
          path="/challan_view_filter_deo"
          element={<ChallanViewFilterDeo />}
        />
        <Route
          path="/change-password" // modified
          element={<ChangePassword />}
        />
        <Route path="/ResetFinalize" element={<ResetFinalize />} />
        <Route path="/AccessDeniedPage" element={<AccessDeniedPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
