import { RouteObject } from "react-router-dom";
import { DashboardLoader, DashboardView, NotFoundView } from "views";
import * as paths from "./paths";
import { DashboardBaseRouteLayout } from "components/route-layouts";

const routes: RouteObject[] = [
  {
    element: <DashboardBaseRouteLayout />,
    children: [
      {
        path: paths.DASHBOARD,
        element: <DashboardView />,
        loader: DashboardLoader,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
];

export default routes;
