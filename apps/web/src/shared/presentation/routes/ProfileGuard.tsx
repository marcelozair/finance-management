import { Navigate, Outlet } from "react-router";
import { useProfile } from "../store/profile/useProfile";
import { LoadingPage } from "../views/LoadingPage";

export const ProfileGuard = () => {
  const { profile, loading } = useProfile();

  if (loading) {
    return <LoadingPage />;
  }

  if (!profile) {
    return <Navigate to="/admin/select-profile" />;
  }

  return <Outlet />;
};
