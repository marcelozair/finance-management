import { Navigate, Outlet } from "react-router";
import { useProfile } from "../store/profile/useProfile";

export const ProfileGuard = () => {
  const { profile } = useProfile();

  // If there is no profile natively loaded from jotai or localStorage
  if (!profile) {
    return <Navigate to="/admin/select-profile" />;
  }

  return <Outlet />;
};
