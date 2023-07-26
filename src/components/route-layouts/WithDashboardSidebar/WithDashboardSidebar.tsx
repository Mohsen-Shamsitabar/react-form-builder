import { Box, Stack } from "@mui/material";
import { useOutlet } from "react-router-dom";
import { Sidebar } from "./components";
import * as sx from "./styles";

const WithDashboardSidebar = () => {
  const outlet = useOutlet();

  return (
    <Stack direction="row" sx={sx.root}>
      <Sidebar sx={sx.sidebar} />
      <Box component="section" sx={sx.content}>
        {outlet}
      </Box>
    </Stack>
  );
};

export default WithDashboardSidebar;
