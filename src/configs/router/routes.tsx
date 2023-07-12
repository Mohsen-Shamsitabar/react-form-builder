import { RouteObject } from "react-router-dom";
import { DashboardLoader, DashboardView } from "views";
import * as paths from "./paths";

const routes: RouteObject[] = [
  {
    path: paths.DASHBOARD,
    element: <DashboardView />,
    loader: DashboardLoader,
  },
];

export default routes;
