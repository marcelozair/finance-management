import { Navigate, Outlet } from "react-router";
import { useSession } from "@shared/presentation/store/session/useSession";
import { SessionCookieStore } from "src/modules/auth/infrastructure/services/SessionCookieStore";
import { LoadingPage } from "../views/LoadingPage";

export const AdminGuard = () => {
  const sessionStoreService = new SessionCookieStore();
  const { session, loadingSession } = useSession({ sessionStoreService });

  if (loadingSession) {
    return <LoadingPage />;
  }

  if (!session) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <Outlet />;
};
