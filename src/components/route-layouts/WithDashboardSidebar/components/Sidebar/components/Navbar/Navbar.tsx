import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  type SxProps,
  type Theme,
} from "@mui/material";
import { NAV_ITEMS } from "configs";
import { useNavigate } from "react-router-dom";
import { mergeSx } from "utils";
import * as sx from "./styles";

interface Props {
  sx?: SxProps<Theme>;
}

const Navbar = (props: Props) => {
  const { sx: sxProp } = props;

  const routerNavigate = useNavigate();

  const makeHandleNavigate = (navigate: (typeof NAV_ITEMS)[0]["navigate"]) => {
    return () => {
      const { to, options } = navigate;

      routerNavigate(to, options);
    };
  };

  return (
    <Stack component="nav" sx={mergeSx(sx.root, sxProp)}>
      <List>
        {NAV_ITEMS.map(({ icon, navigate, title }) => (
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
