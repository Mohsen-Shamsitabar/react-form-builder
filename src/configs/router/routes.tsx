import { WithDashboardHeader } from "components/route-layouts";
import WithDashboardSidebar from "components/route-layouts/WithDashboardSidebar/WithDashboardSidebar";
import { RouteObject } from "react-router-dom";
import {
  DashboardLoader,
  DashboardView,
  MyForms,
  NotFoundView,
  myFormsLoader,
} from "views";
import * as paths from "./paths";

const routes: RouteObject[] = [
  {
    element: <WithDashboardHeader />,
    children: [
      {
        element: <WithDashboardSidebar />,
        children: [
          {
            path: paths.DASHBOARD,
            element: <DashboardView />,
            loader: DashboardLoader,
          },
          {
            path: paths.MY_FORMS,
            element: <MyForms />,
            loader: myFormsLoader,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
];

export default routes;
