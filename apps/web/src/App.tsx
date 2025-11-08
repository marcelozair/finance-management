import { RouterProvider } from "react-router";

import { router } from "./Router";

export const App = () => {
  return <RouterProvider router={router} />;
};
