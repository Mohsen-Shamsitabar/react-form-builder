import { AssignmentOutlined } from "@mui/icons-material";
import { type NavigateOptions, type To } from "react-router-dom";
import * as paths from "../router/paths";

interface NavItem {
  title: string;
  icon: JSX.Element;
  navigate: { to: To; options?: NavigateOptions };
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: "My Forms",
    icon: <AssignmentOutlined />,
    navigate: { to: paths.MY_FORMS },
  },
];
