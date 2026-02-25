import { Navigate, Outlet } from "react-router";
import { useSession } from "@shared/presentation/store/session/useSession";

export const AdminGuard = () => {
  const { session } = useSession();

  // #TODO: Improve validations
  // - Check if session expired
  if (!session) {
    return <Outlet />;
    return <Navigate to="/auth/sign-in" />;
  }

  return <Outlet />;
};
