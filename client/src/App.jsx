import { Route, Routes, Navigate } from "react-router-dom";
import { UserContextProvider, UserContext } from "./UserContext";
import ProtectRoute from "./ProtectedRoutes"; // Import the ProtectRoute component
import axios from "axios";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import PackageForm from "./components/admin-components/PackageForm";
import CreateStaffAccount from "./components/admin-components/CreateStaffAccount";
import TrailsPage from "./pages/TrailsPage";
import { UserLocationProvider } from "./context/UserLocationContext";
import { Toaster } from "react-hot-toast";
import TravelAgencySignUp from "./pages/TravelAgencySignUp";
import BusinessDetails from "./pages/BusinessDetails";
import TrailDetail from "./components/trails/TrailDetails";
import AddPackageTrails from "./pages/admin-page/AddPackageTrails";
import AdminTrailDetails from "./components/trails/AdminTrailDetails";
import AdminPage from "./pages/admin-page/AdminPage";
import EventsPage from "./pages/admin-page/EventsPage";
import StaffPage from "./pages/admin-page/StaffPage";
import AdminBookingList from "./pages/admin-page/AdminBookingList";
import EventArchivesPage from "./pages/admin-page/EventArchivesPage";
import AgencyCredentialsProcess from "./components/forms/AgencyCredentialsProcess";
import CustomerPackageDetails from "./pages/user-page/CustomerPackageDetails";
import CustomerBookPage from "./pages/user-page/CustomerBookPage";
import AboutPage from "./pages/AboutPage";
import { baseUrl } from "./Url";
import Dashboard_StaffPage from "./pages/staff-page/Dashboard_StaffPage";
import ProfilePage from "./pages/user-page/ProfilePage";
import AdminTransactionList from "./pages/admin-page/AdminTransactionList";
import UploadProofSubscription from "./components/layout/about/UploadProofSubscription";
import CheckBasicPlan from "./components/layout/about/CheckBasicPlan";
import Forum from "./pages/forum-page/forum";
import HikingFAQs from "./components/layout/index/HikingFAQs";
import AdminDetails from "./pages/admin-page/SettingsPage";
import Dashboard_Reports from "./pages/admin-page/Dashboard_Reports";
import NotificationsPage from "./pages/forum-page/NotificationsPage";
import TrackPageVisit from "./TrackPageVisit";
import VerifyEmail from "./pages/VerifyEmail";
import StaffDetails from "./pages/staff-page/StaffSettings";
import StaffEventsPage from "./pages/staff-page/StaffEventsPage";

// Set default axios settings
axios.defaults.baseURL = `${baseUrl}`;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <UserLocationProvider>
        <Toaster />
        
        <TrackPageVisit />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/notification" element={<NotificationsPage />} />
            <Route path="/about" element={<AboutPage />}/>
            <Route path="/hikingFAQs" element={<HikingFAQs />}/>
            <Route path="/trails" element={<TrailsPage />} />
            <Route path="/trails/:id" element={<TrailDetail />} />
            <Route path="/trails/adminPackage/:id" element={<AdminTrailDetails />} />
            <Route path="/travelAgencySignUp" element={<TravelAgencySignUp />} />
            <Route path="/travelAgencySignUp/credentialsProcess" element={<AgencyCredentialsProcess />} />
            <Route path="/travelAgencySignUp/businessDetails" element={<BusinessDetails />} />
            <Route path="/bookings/packages/:packageId" element={<CustomerPackageDetails />}/>
            <Route path="/account/events/adminTrails" element={<AddPackageTrails />} />
            <Route path="/uploadProofSubscription" element={<UploadProofSubscription />} />
            <Route path="/basicPlanSubscription" element={<CheckBasicPlan />} />

            <Route path="/verify-email" element={<VerifyEmail />} />
            {/*  Customer with Account Routes */}
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="/book" element={<CustomerBookPage />}/>
            
            {/* Protect Admin Routes and Staff Routes*/}
            <Route 
              path="/staff-db" 
              element={
                <ProtectRoute>
                  <Dashboard_StaffPage />
                </ProtectRoute>
              }
            />
            <Route 
              path="/staff/Events" 
              element={
                <ProtectRoute>
                  <StaffEventsPage />
                </ProtectRoute>
              }
            />
            
            <Route 
              path="/staff/settings" 
              element={
                <ProtectRoute>
                  <StaffDetails />
                </ProtectRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectRoute>
                  <AdminPage />
                </ProtectRoute>
              }
            />
            <Route
              path="/admin/dashboard/reports"
              element={
                <ProtectRoute>
                  <Dashboard_Reports />
                </ProtectRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProtectRoute>
                  <EventsPage />
                </ProtectRoute>
              }
            />
            <Route
              path="/admin/add-package"
              element={
                <ProtectRoute>
                  <PackageForm />
                </ProtectRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <ProtectRoute>
                  <AdminBookingList />
                </ProtectRoute>
              }
            />
            <Route
              path="/admin/transactions"
              element={
                <ProtectRoute>
                  <AdminTransactionList />
                </ProtectRoute>
              }
            />
            <Route
              path="/admin/transactions/:referenceCode"
              element={
                <ProtectRoute>
                  <AdminTransactionList />
                </ProtectRoute>
              }
            />
            <Route
              path="/admin/archives"
              element={
                <ProtectRoute>
                  <EventArchivesPage />
                </ProtectRoute>
              }
            />
            <Route
              path="/admin/staff-list"
              element={
                <ProtectRoute>
                  <StaffPage />
                </ProtectRoute>
              }
            />
            <Route
              path="/admin/add-staff"
              element={
                <ProtectRoute>
                  <CreateStaffAccount />
                </ProtectRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectRoute>
                  <AdminDetails />
                </ProtectRoute>
              }
            />
          </Route>
          
        </Routes>
      </UserLocationProvider>
    </UserContextProvider>
  );
}

export default App;
