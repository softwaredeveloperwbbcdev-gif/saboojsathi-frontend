import { Routes, Route } from "react-router-dom";
import AuthGuard from "../Components/AuthGuard.jsx";

//Public Pages
import Home from "../Pages/Frontend/Home.jsx";
import About from "../Pages/Frontend/AboutScheme.jsx";
import Contacts from "../Pages/Frontend/Contacts.jsx";
import Enit from "../Pages/Frontend/Enit.jsx";
import Prebid from "../Pages/Frontend/PreBidMinutes.jsx";
import TechBid from "../Pages/Frontend/TechnicalBidEvaluation.jsx";
import FinBid from "../Pages/Frontend/FinancialBidEvaluation.jsx";
import Synoptic from "../Pages/Frontend/SynopticReport.jsx";
import DistrictWise from "../Pages/Frontend/DistrictWiseReport.jsx";
import GenderWise from "../Pages/Frontend/GenderWiseReport.jsx";
import LoginForm from "../Pages/Frontend/LoginForm.jsx";
//import LoginList from "../Pages/Frontend/LoginList.jsx";
//import LoginListTwo from "../Pages/Frontend/LoginListTwo.jsx";
import LoginFormCms from "../Pages/Frontend/LoginFormCms.jsx";

//Admin Pages
import Dashboard from "../Pages/Frontend/Dashboard.jsx";
import StudentAdd from "../Pages/Admin/Student/StudentAdd.jsx";
import ViewProfile from "../Pages/Admin/School/ViewProfile.jsx";
//import DownloadDistributionView from "../Pages/Admin/School/DownloadDistributionView.jsx";
//import DistributionUploadView from "../Pages/Admin/School/DistributionUploadView.jsx";
import StudentEdit from "../Pages/Admin/Student/StudentEdit.jsx";
//import ApprovedListView from "../Pages/Admin/School/ApprovedListView.jsx";
import ViewPending from "../Pages/Admin/Circle/ViewPending.jsx";
import ViewStudent from "../Pages/Admin/Circle/ViewStudent.jsx";
//import StudentProfileDownloadExcelView from "../Pages/Admin/School/StudentProfileDownloadExcelView.jsx";
import DistributionUploadViewDistrict from "../Pages/Admin/District/DownloadDistributionViewDistrict.jsx";
import DistributionLocationProcess from "../Pages/Admin/Block/DistributionLocationProcess.jsx";
import DistributionTagSchool from "../Pages/Admin/Block/DistributionTagSchool.jsx";
import DistributionManageTaggedSchool from "../Pages/Admin/Block/DistributionManageTaggedSchool.jsx";
import ApproveChallanView from "../Pages/Admin/Block/ApproveChallanView.jsx";
import DownloadMemorandumView from "../Pages/Admin/Block/DownloadMemorandumView.jsx";
import DistrictViewPending from "../Pages/Admin/District/DistrictViewPending.jsx";
import AllocateChallanView from "../Pages/Admin/Block/AllocateChallanView.jsx";
import AllocateChallanToSchool from "../Pages/Admin/Block/AllocateChallanToSchool.jsx";
// sangita
import EligibleStudentReport from "../Pages/Admin/MisReport/EligibleStudentReport.jsx";
import EligibleStudentReportBlock from "../Pages/Admin/MisReport/EligibleStudentReportBlock.jsx";
import EligibleStudentReportSchool from "../Pages/Admin/MisReport/EligibleStudentReportSchool.jsx";
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

import SynopticReport from "../Pages/Admin/MisReport/SynopticReport.jsx";
import CategorywiseReport from "../Pages/Admin/MisReport/CategorywiseReport.jsx"; // rest
import GenderwiseReport from "../Pages/Admin/MisReport/GenderwiseReport.jsx";
import GenderwiseReportBlock from "../Pages/Admin/MisReport/GenderwiseReportBlock.jsx";
import SocialGroupwiseReport from "../Pages/Admin/MisReport/SocialGroupwiseReport.jsx";
import SocialGroupwiseReportBlock from "../Pages/Admin/MisReport/SocialGroupwiseReportBlock.jsx";
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
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contacts" element={<Contacts />} />
      <Route path="/Enit" element={<Enit />} />
      <Route path="/Prebid" element={<Prebid />} />
      <Route path="/TechBidEval" element={<TechBid />} />
      <Route path="/FinBidEval" element={<FinBid />} />
      <Route path="/Synoptic" element={<Synoptic />} />
      <Route path="/DistrictWise" element={<DistrictWise />} />
      <Route path="/GenderWise" element={<GenderWise />} />
      <Route path="/cms1" element={<LoginFormCms />} />
      <Route path="/Login" element={<LoginForm />} />
      {/* Test Routes */}
      <Route path="/Test" element={<AppsTest />} />
      <Route path="/TestTwo" element={<AppsTestTwo />} />
      {/* Protected Routes */}
      <Route
        path="/Dashboard"
        element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        }
      />
      <Route
        path="/Admin"
        element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        }
      />
      <Route
        path="/StudentAdd/:phaseId"
        element={
          <AuthGuard>
            <StudentAdd />
          </AuthGuard>
        }
      />
      <Route
        path="/StudentProfile/:phaseId"
        element={
          <AuthGuard>
            <ViewProfile />
          </AuthGuard>
        }
      />
      <Route
        path="/StudentEdit/:id/:phaseId"
        element={
          <AuthGuard>
            <StudentEdit />
          </AuthGuard>
        }
      />
      {/* <Route
        path="/StudentProfileDownload/:phaseId"
        element={
          <AuthGuard>
            <StudentProfileDownloadExcelView />
          </AuthGuard>
        }
      /> 
      <Route
        path="/DownloadDistribution/:phaseId"
        element={
          <AuthGuard>
            <DownloadDistributionView />
          </AuthGuard>
        }
      />
      <Route
        path="/ApprovedListView/:phaseId"
        element={
          <AuthGuard>
            <ApprovedListView />
          </AuthGuard>
        }
      />
      <Route
        path="/UploadDistribution/:phaseId"
        element={
          <AuthGuard>
            <DistributionUploadView />
          </AuthGuard>
        }
      />*/}
      <Route
        path="/CircleVerifyListSchool/:phaseId"
        element={
          <AuthGuard>
            <ViewPending />
          </AuthGuard>
        }
      />
      <Route
        path="/CircleVerifyListApplicant/:phaseId/:schoolId/:status"
        element={
          <AuthGuard>
            <ViewStudent />
          </AuthGuard>
        }
      />
      <Route
        path="/DownloadDistributionDistrict/:phaseId"
        element={
          <AuthGuard>
            <DistributionUploadViewDistrict />
          </AuthGuard>
        }
      />
      <Route
        path="/DistrictVerifyListSchool/:phaseId"
        element={
          <AuthGuard>
            <DistrictViewPending />
          </AuthGuard>
        }
      />
      <Route
        path="/DistributionLocationProcess/:phaseId"
        element={
          <AuthGuard>
            <DistributionLocationProcess />
          </AuthGuard>
        }
      />
      <Route
        path="/DistributionTagSchool/:phaseId/:location"
        element={
          <AuthGuard>
            <DistributionTagSchool />
          </AuthGuard>
        }
      />
      <Route
        path="/DistributionManageTaggedSchool/:phaseId"
        element={
          <AuthGuard>
            <DistributionManageTaggedSchool />
          </AuthGuard>
        }
      />
      <Route
        path="/ApproveChallanView/:phaseId"
        element={
          <AuthGuard>
            <ApproveChallanView />
          </AuthGuard>
        }
      />
      <Route
        path="/DownloadMemorandumView/:phaseId"
        element={
          <AuthGuard>
            <DownloadMemorandumView />
          </AuthGuard>
        }
      />
      <Route
        path="/AllocateChallanView/:phaseId"
        element={
          <AuthGuard>
            <AllocateChallanView />
          </AuthGuard>
        }
      />
      <Route
        path="/AllocateChallanToSchool/:phaseId/:challanId"
        element={
          <AuthGuard>
            <AllocateChallanToSchool />
          </AuthGuard>
        }
      />
      {/* /// Sangita */}
      <Route
        path="/EligibleStudentReportDistrict/:phaseId" //21.07.2025
        element={
          <AuthGuard>
            <EligibleStudentReport />
          </AuthGuard>
        }
      />
      <Route
        path="/EligibleStudentReportBlock/:phaseId/:id" //29.07.2025
        element={
          <AuthGuard>
            <EligibleStudentReportBlock />
          </AuthGuard>
        }
      />
      <Route
        path="/EligibleStudentReportSchool/:phaseId/:id" //29.07.2025
        element={
          <AuthGuard>
            <EligibleStudentReportSchool />
          </AuthGuard>
        }
      />
      {/* // downlod route for above code  */}
      <Route
        path="/ProfileEntryDistrictReport/:phaseId"
        element={
          <AuthGuard>
            <ProfileEntryDistrictReport />
          </AuthGuard>
        }
      />
      <Route
        path="/ProfileEntryBlockReport/:phaseId/:id"
        element={
          <AuthGuard>
            <ProfileEntryBlockReport />
          </AuthGuard>
        } // 31.07.2025
      />
      <Route
        path="/ProfileEntrySchoolReport/:phaseId/:id"
        element={
          <AuthGuard>
            <ProfileEntrySchoolReport />
          </AuthGuard>
        } // 31.07.2025
      />
      <Route
        path="/ProfileEntryStatusReportDist/:phaseId" //22.07.2025
        element={
          <AuthGuard>
            <ProfileEntryStatusReportDist />
          </AuthGuard>
        }
      />
      <Route
        path="/ProfileEntryStatusReportBlock/:phaseId/:id"
        element={
          <AuthGuard>
            <ProfileEntryStatusReportBlock />
          </AuthGuard>
        }
      />
      <Route
        path="/ProfileEntryStatusReportSchool/:phaseId/:id"
        element={
          <AuthGuard>
            <ProfileEntryStatusReportSchool />
          </AuthGuard>
        }
      />
      <Route
        path="/DistributionReportDistrict/:phaseId"
        element={
          <AuthGuard>
            <DistributionReportDistrict />
          </AuthGuard>
        } // 31.07.2025
      />
      <Route
        path="/DistributionReportDistrictOldPhase/:phaseId"
        element={
          <AuthGuard>
            <DistributionReportDistrictOldPhase />
          </AuthGuard>
        } // 31.07.2025
      />
      <Route
        path="/DistributionReportBlock/:id/:phaseId"
        element={
          <AuthGuard>
            <DistributionReportBlock />
          </AuthGuard>
        } // 04.08.2025
      />
      <Route
        path="/DistributionReportSchool/:id/:phaseId"
        element={
          <AuthGuard>
            <DistributionReportSchool />
          </AuthGuard>
        } // 04.08.2025
      />
      <Route
        path="/TaggingDetailsReport/:phaseId" //23.07.2025
        element={
          <AuthGuard>
            <TaggingDetailsReport />
          </AuthGuard>
        }
      />
      <Route
        path="/TaggingDetailsReportOld/:phaseId" //20.09.2025
        element={
          <AuthGuard>
            <TaggingDetailsReportOld />
          </AuthGuard>
        }
      />
      <Route
        path="/TaggingDetailsReportOldBlock/:phaseId/:id" //20.09.2025
        element={
          <AuthGuard>
            <TaggingDetailsReportOldBlock />
          </AuthGuard>
        }
      />
      <Route
        path="/TaggingDetailsReportOldSchool/:phaseId/:id" //20.09.2025
        element={
          <AuthGuard>
            <TaggingDetailsReportOldSchool />
          </AuthGuard>
        }
      />
      <Route
        path="/TaggingDetailsReportBlock/:id/:phaseId" //28.07.2025
        element={
          <AuthGuard>
            <TaggingDetailsReportBlock />
          </AuthGuard>
        }
      />
      <Route
        path="/TaggingDetailsReportSchool/:phaseId/:id" //28.07.2025
        element={
          <AuthGuard>
            <TaggingDetailsReportSchool />
          </AuthGuard>
        }
      />
      <Route
        path="/DistrictChallanReport/:phaseId" //05.08.2025
        element={
          <AuthGuard>
            <DistrictChallanReport />
          </AuthGuard>
        }
      />
      <Route
        path="/BlockChallanReport/:id/:phaseId" //05.08.2025
        element={
          <AuthGuard>
            <BlockChallanReport />
          </AuthGuard>
        }
      />
      <Route
        path="/ChallanDetailsByBlock/:id/:phaseId" //05.08.2025
        element={
          <AuthGuard>
            <ChallanDetailsByBlock />
          </AuthGuard>
        }
      />
      <Route
        path="/ChallanGenerationReport/:phaseId" //06.08.2025
        element={
          <AuthGuard>
            <ChallanGenerationReport />
          </AuthGuard>
        }
      />
      <Route
        path="/ChallanGenerationReportBlock/:phaseId/:id" //07.08.2025 check me
        element={
          <AuthGuard>
            <ChallanGenerationReportBlock />
          </AuthGuard>
        }
      />
      <Route
        path="/ChallanGenerationReportSchool/:phaseId/:id" //07.08.2025
        element={
          <AuthGuard>
            <ChallanGenerationReportSchool />
          </AuthGuard>
        }
      />
      <Route
        path="/ChallanParticularsView/:phaseId" //08.08.2025
        element={
          <AuthGuard>
            <ChallanParticularsView />
          </AuthGuard>
        }
      />
      <Route
        path="/ChallanAllocationStatusReport/:phaseId" //11.08.2025
        element={
          <AuthGuard>
            <ChallanAllocationStatusReport />
          </AuthGuard>
        }
      />
      <Route
        path="/ChallanAllocationStatusBlockReport/:id/:phaseId" //11.08.2025
        element={
          <AuthGuard>
            <ChallanAllocationStatusBlockReport />
          </AuthGuard>
        }
      />
      <Route
        path="/InvoiceViewReport/:phaseId" //11.08.2025
        element={
          <AuthGuard>
            <InvoiceViewReport />
          </AuthGuard>
        }
      />
      <Route
        path="/ResetPasswordState" //11.08.2025
        element={
          <AuthGuard>
            <ResetPasswordState />
          </AuthGuard>
        }
      />
      <Route
        path="/change-password" // modified
        element={
          <AuthGuard>
            <ChangePassword />
          </AuthGuard>
        }
      />
      <Route
        path="/SynopticReport" // modified
        element={
          <AuthGuard>
            <SynopticReport />
          </AuthGuard>
        }
      />{" "}
      {/* <Route
        path="/CategorywiseReport" // modified
        element={
          <AuthGuard>
            <CategorywiseReport />
          </AuthGuard>
        }
      />{" "} */}
      <Route
        path="/GenderwiseReport" // modified
        element={
          <AuthGuard>
            <GenderwiseReport />
          </AuthGuard>
        }
      />{" "}
      <Route
        path="/GenderwiseReportBlock/:id" // modified
        element={
          <AuthGuard>
            <GenderwiseReportBlock />
          </AuthGuard>
        }
      />
      <Route
        path="/SocialGroupwiseReport"
        element={
          <AuthGuard>
            <SocialGroupwiseReport />
          </AuthGuard>
        }
      />
      {/* <Route
        path="/SocialGroupwiseReportBlock/:encodedId/phaseId"
        element={
          <AuthGuard>
            <SocialGroupwiseReportBlock />
          </AuthGuard>
        }
      /> */}
      <Route
        path="/SocialGroupwiseReportBlock/:phaseId/:id"
        element={
          <AuthGuard>
            <SocialGroupwiseReportBlock />
          </AuthGuard>
        }
      />
      <Route
        path="/cmsdashboard"
        element={
          <AuthGuard>
            <CmsDashboard />
          </AuthGuard>
        }
      />
      <Route
        path="/ChallanPaymentReport/:phaseId"
        element={
          <AuthGuard>
            <ChallanPaymentReport />
          </AuthGuard>
        }
      />
      <Route
        path="/ChallanMis/:phaseId"
        element={
          <AuthGuard>
            <ChallanMis />
          </AuthGuard>
        }
      />
      <Route
        path="/ChallanMisBlock/:phaseId/:id"
        element={
          <AuthGuard>
            <ChallanMisBlock />
          </AuthGuard>
        }
      />
      <Route
        path="/ChallanIssuedMis/:id/:phaseId"
        element={
          <AuthGuard>
            <ChallanIssuedMis />
          </AuthGuard>
        }
      />
      <Route
        path="/cmsdashboard"
        element={
          <AuthGuard>
            <CmsDashboard />
          </AuthGuard>
        }
      />
      {/* //// Added on 16-09-25 ///// */}
      <Route
        path="/consignment_add"
        element={
          <AuthGuard>
            <ConsignmentAdd />
          </AuthGuard>
        }
      />
      <Route
        path="/consignment_view"
        element={
          <AuthGuard>
            <ConsignmentView />
          </AuthGuard>
        }
      />
      <Route
        path="/consignment_view_edit/:consignmentId"
        element={
          <AuthGuard>
            <ConsignmentEdit />
          </AuthGuard>
        }
      />
      <Route
        path="/consignment_unload_view"
        element={
          <AuthGuard>
            <ConsignmentUnloadView />
          </AuthGuard>
        }
      />
      <Route
        path="/admin_p3_district_school_tagged_report"
        element={
          <AuthGuard>
            <AdminDistrictSchoolTaggedReport />
          </AuthGuard>
        }
      />
      <Route
        path="/admin_tagging_unload_report"
        element={
          <AuthGuard>
            <AdminTaggingUnloadReport />
          </AuthGuard>
        }
      />
      <Route
        path="/challan_add"
        element={
          <AuthGuard>
            <ChallanAdd />
          </AuthGuard>
        }
      />
      <Route
        path="/view_challan"
        element={
          <AuthGuard>
            <ViewChallan />
          </AuthGuard>
        }
      />
      <Route
        path="/view_challan_report"
        element={
          <AuthGuard>
            <ViewChallanReport />
          </AuthGuard>
        }
      />
      <Route
        path="/challanCmsEntry"
        element={
          <AuthGuard>
            <ChallanCmsEntry />
          </AuthGuard>
        }
      />
      <Route
        path="/challan_view_filter"
        element={
          <AuthGuard>
            <ChallanViewFilter />
          </AuthGuard>
        }
      />
      <Route
        path="/invoice_add"
        element={
          <AuthGuard>
            <InvoiceAdd />
          </AuthGuard>
        }
      />
      <Route
        path="/invoice_link_challan"
        element={
          <AuthGuard>
            <InvoiceLinkChallan />
          </AuthGuard>
        }
      />
      <Route
        path="/invoice_view"
        element={
          <AuthGuard>
            <InvoiceView />
          </AuthGuard>
        }
      />
      <Route
        path="/challan_view_filter_deo"
        element={
          <AuthGuard>
            <ChallanViewFilterDeo />
          </AuthGuard>
        }
      />
      <Route
        path="/change-password" // modified
        element={
          <AuthGuard>
            <ChangePassword />
          </AuthGuard>
        }
      />
      <Route
        path="/ResetFinalize"
        element={
          <AuthGuard>
            <ResetFinalize />
          </AuthGuard>
        }
      />
      {/* // Sangita */}
      <Route
        path="/AccessDeniedPage"
        element={
          <AuthGuard>
            <AccessDeniedPage />
          </AuthGuard>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
