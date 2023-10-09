import {
  WithDashboardHeader,
  WithDashboardSidebar,
} from "components/route-layouts";
import { RouteObject } from "react-router-dom";
import {
  DashboardLoader,
  DashboardView,
  MyForms,
  NotFoundView,
  myFormsLoader,
  FormView,
  formViewLoader,
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
    path: paths.FORM,
    element: <FormView />,
    loader: formViewLoader,
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
];

export default routes;
