import { AssignmentOutlined } from "@mui/icons-material";
import { NavigateOptions, type To } from "react-router-dom";
import * as paths from "./router/paths";

interface NavItem {
  title: string;
  icon: JSX.Element;
  navigate: { to: To; options?: NavigateOptions };
}

const navItems: NavItem[] = [
  {
    title: "My Forms",
    icon: <AssignmentOutlined />,
    navigate: { to: paths.MY_FORMS },
  },
];

export default navItems;
