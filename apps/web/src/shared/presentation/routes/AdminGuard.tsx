import { Navigate, Outlet } from "react-router";

import { LoadingPage } from "../views/LoadingPage";
import { useSession } from "@shared/presentation/store/session/useSession";
import { SessionCookieStore } from "@modules/auth/infrastructure/services/SessionCookieStore";

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
