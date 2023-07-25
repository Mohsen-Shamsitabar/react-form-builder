import { Box, Stack } from "@mui/material";
import { useOutlet } from "react-router-dom";
import { Header, Sidebar } from "./components";
import * as sx from "./styles";

const DashboardBase = () => {
  const outlet = useOutlet();

  return (
    <Box sx={sx.root}>
      <Header sx={sx.header} />
      <Stack component="main" direction="row" sx={sx.main}>
        <Sidebar sx={sx.sidebar} />
        <Box component="section" sx={sx.content}>
          {outlet}
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardBase;
