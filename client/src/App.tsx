import { Toaster } from "react-hot-toast";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import AddJob from "./pages/dashboard/AddJob";
import AllJobs from "./pages/dashboard/AllJobs";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Profile from "./pages/dashboard/Profile";
import Stats from "./pages/dashboard/Stats";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Outlet />
                </DashboardLayout>
              </ProtectedRoute>
            }>
            <Route index element={<Stats />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="landing" element={<Landing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
