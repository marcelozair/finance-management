import { createBrowserRouter, redirect } from "react-router";

import { AdminGuard } from "./AdminGuard";
import { WalletView } from "../../modules/wallet/presentation/view/Wallet";
import { SignInView } from "../../modules/auth/presentation/views/SignIn/SignIn";
import { SignUpView } from "../../modules/auth/presentation/views/SignUp/SignUp";
import { DashboardView } from "../../modules/dashboard/presentation/view/Dashboard";

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
    loader: () => redirect("auth/sign-in"),
  },
]);
