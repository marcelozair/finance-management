import { createBrowserRouter } from "react-router";
import { SignInView } from "./modules/auth/presentation/views/SignIn/SignIn";
import { SignUpView } from "./modules/auth/presentation/views/SignUp/SignUp";
import { SetUpView } from "./modules/auth/presentation/views/SetUp/SetUp";
import { DashboardView } from "./modules/dashboard/presentation/view/Dashboard";
import { WalletView } from "./modules/wallet/presentation/view/Wallet";
import { AdminGuard } from "@shared/presentation/routes/AdminGuard";

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
]);
