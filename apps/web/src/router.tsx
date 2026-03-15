import { createBrowserRouter, Navigate } from "react-router";

import { AdminGuard } from "@shared/presentation/routes/AdminGuard";
import { WalletView } from "./modules/wallet/presentation/view/Wallet";
import { SetUpView } from "./modules/auth/presentation/views/SetUp/SetUp";
import { SignUpView } from "./modules/auth/presentation/views/SignUp/SignUp";
import { SignInView } from "./modules/auth/presentation/views/SignIn/SignIn";
import { DashboardView } from "./modules/dashboard/presentation/view/Dashboard";

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
  {
    path: "*",
    element: <Navigate to="/auth/sign-in" replace />,
  },
]);
