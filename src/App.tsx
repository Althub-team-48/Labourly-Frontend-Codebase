import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Artisans from "./Pages/Artisans";
import ArtisanProfile from "./Pages/ArtisanProfile";
import Blog from "./Pages/Blog";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/auth/login";
import Signup from "./Pages/auth/signup";
import Navbar from "@/Components/common/Navbar";
import { useEffect, useMemo } from "react";
import AuthLayout from "./layouts/AuthLayout";
import WorkerLayout from "./layouts/WorkerLayout";
import ClientLayout from "./layouts/ClientLayout";
import WorkerDashboard from "./Pages/worker/Dashboard";
import ClientDashboard from "./Pages/client/Dashboard";
import { useAuth } from "./hooks/useAuth";
import useRedirectByRole from "./hooks/useRedirectByRole";
import WorkerRoute from "./routes/WorkerRoute";
import ClientRoute from "./routes/ClientRoute";
import Profile from "./Pages/worker/Profile";
import Messages from "./Pages/Messages";
import ClientJobs from "./Pages/client/ClientJobs";
import ClientProfile from "./Pages/client/ClientProfile";
import Services from "./Pages/worker/Services";
import WorkerJobs from "./Pages/worker/WorkerJobs";
import Reviews from "./Pages/worker/WorkerReviews";
import ClientReviews from "./Pages/client/ClientReviews";
import HandleGoogle from "./Pages/auth/handleGoogle";
import VerifyEmail from "./Pages/auth/verifyEmail";
const App = () => {
  const { pathname } = useLocation();

  const showNavbar = useMemo(() => {
    if (pathname.includes("auth")) return false;
    if (pathname.includes("worker")) return false;
    if (pathname.includes("client")) return false;
    return true;
  }, [pathname]);
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();
  useRedirectByRole();

  useEffect(() => {
    if (!isAuthenticated() && location.pathname === "/") {
      navigate("/");
    }
    if (
      !isAuthenticated() &&
      (location.pathname.includes("/worker") ||
        location.pathname.includes("client"))
    ) {
      navigate("/auth/sign-in");
    }

    if (isAuthenticated() && location.pathname === "/") {
      if (role() === "WORKER") {
        navigate("/worker/dashboard");
        return;
      }
      if (role() === "CLIENT") {
        navigate(`/client/dashboard`);
        return;
      }
      logout();
    }
  }, [isAuthenticated, navigate, location.pathname, role]);
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artisans" element={<Artisans />} />
        <Route path="/artisans/:artisanId" element={<ArtisanProfile />} />

        <Route path="/" element={<Home />} />
        <Route path="/artisans" element={<Artisans />} />
        <Route path="/artisans/:artisanId" element={<ArtisanProfile />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
        {/*  */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="google/handle" element={<HandleGoogle />} />
        </Route>

        {/*  */}
        <Route
          path="/worker"
          element={
            <WorkerRoute>
              <WorkerLayout />
            </WorkerRoute>
          }
        >
          <Route index element={<WorkerDashboard />} />
          <Route path="dashboard" element={<WorkerDashboard />} />
          <Route path="my-jobs" element={<WorkerJobs />} />
          <Route path="user-profile" element={<Profile />} />
          <Route path="messages" element={<Messages />} />
          <Route path="my-services" element={<Services />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>

        {/*  */}
        <Route
          path="/client"
          element={
            <ClientRoute>
              <ClientLayout />
            </ClientRoute>
          }
        >
          <Route index element={<ClientDashboard />} />
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="jobs" element={<ClientJobs />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<ClientProfile />} />
          <Route path="reviews" element={<ClientReviews />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
