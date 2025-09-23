import { RouterProvider } from "react-router";

import { router } from "./core/router/router";

export const App = () => {
  return <RouterProvider router={router} />;
};
