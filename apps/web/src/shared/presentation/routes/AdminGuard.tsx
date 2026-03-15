import { Navigate, Outlet } from "react-router";
import { useSession } from "@shared/presentation/store/session/useSession";
import { SessionCookieStore } from "src/modules/auth/infrastructure/services/SessionCookieStore";

export const AdminGuard = () => {
  const sessionStoreService = new SessionCookieStore();
  const { session } = useSession({ sessionStoreService });

  if (!session) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <Outlet />;
};
