import { RouteObject } from "react-router-dom";
import { DashboardLoader, DashboardView, DashboardErrorPage } from "views";
import * as paths from "./paths";

const routes: RouteObject[] = [
  {
    path: paths.DASHBOARD,
    element: <DashboardView />,
    loader: DashboardLoader,
    errorElement: <DashboardErrorPage />,
  },
];

export default routes;
