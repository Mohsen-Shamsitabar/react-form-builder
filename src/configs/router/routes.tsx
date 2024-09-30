import {
  WithDashboardHeader,
  WithDashboardSidebar,
} from "components/route-layouts";
import { type RouteObject } from "react-router-dom";
import {
  CreateForm,
  DashboardLoader,
  DashboardView,
  FormView,
  MyForms,
  NotFoundView,
  createFormLoader,
  formViewLoader,
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
      {
        element: <CreateForm />,
        path: paths.CREATE_FORM,
        loader: createFormLoader,
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
