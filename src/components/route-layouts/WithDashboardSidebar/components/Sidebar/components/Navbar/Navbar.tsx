import { AssignmentOutlined } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  type SxProps,
  type Theme,
} from "@mui/material";
import { mergeSx } from "utils";
import * as sx from "./styles";
import { useNavigate } from "react-router-dom";
import { NavItems } from "configs";

interface Props {
  sx?: SxProps<Theme>;
}

const Navbar = (props: Props) => {
  const { sx: sxProp } = props;

  const routerNavigate = useNavigate();

  const makeHandleNavigate = (navigate: (typeof NavItems)[0]["navigate"]) => {
    return () => {
      const { to, options } = navigate;

      routerNavigate(to, options);
    };
  };

  return (
    <Stack component="nav" sx={mergeSx(sx.root, sxProp)}>
      <List>
        {NavItems.map(({ icon, navigate, title }) => (
          <ListItemButton key={title} onClick={makeHandleNavigate(navigate)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItemButton>
        ))}
      </List>
    </Stack>
  );
};

export default Navbar;
