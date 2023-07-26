import { DashboardBaseRouteLayout } from "components/route-layouts";
import { RouteObject } from "react-router-dom";
import {
  DashboardLoader,
  DashboardView,
  NotFoundView,
  myFormsLoader,
} from "views";
import MyForms from "views/MyForms/MyForms";
import * as paths from "./paths";

const routes: RouteObject[] = [
  {
    element: <DashboardBaseRouteLayout />,
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
      {
        path: paths.CREATE_FORM,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
];

export default routes;
