import { createBrowserRouter, Navigate } from "react-router";

import { AdminGuard } from "@shared/presentation/routes/AdminGuard";
import { ProfileGuard } from "@shared/presentation/routes/ProfileGuard";
import { WalletView } from "./modules/wallet/presentation/view/Wallet";
import { SetUpView } from "./modules/auth/presentation/views/SetUp/SetUp";
import { SignUpView } from "./modules/auth/presentation/views/SignUp/SignUp";
import { SignInView } from "./modules/auth/presentation/views/SignIn/SignIn";
import { DashboardView } from "./modules/dashboard/presentation/view/Dashboard";
import { SelectProfileView } from "./modules/profiles/presentation/views/SelectProfile/SelectProfile";

export const router = createBrowserRouter([
  {
    path: "auth",
    children: [
      {
        path: "sign-in",
        Component: SignInView,
      },
      {
        path: "sign-up",
        Component: SignUpView,
      },
      {
        path: "set-up",
        Component: SetUpView,
      },
    ],
  },
  {
    path: "admin",
    Component: AdminGuard,
    children: [
      {
        path: "select-profile",
        Component: SelectProfileView,
      },
      {
        Component: ProfileGuard,
        children: [
          {
            Component: DashboardView,
            children: [
              {
                path: "wallet",
                Component: WalletView,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/",
    Component: SignInView,
  },
  {
    path: "*",
    element: <Navigate to="/auth/sign-in" replace />,
  },
]);
