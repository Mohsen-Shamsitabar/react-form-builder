import { Box, Stack } from "@mui/material";
import { useOutlet } from "react-router-dom";
import { Header } from "./components";
import { Navbar } from "./components/Sidebar/components";
import * as sx from "./styles";

const DashboardBase = () => {
  const outlet = useOutlet();

  return (
    <Box sx={sx.root}>
      <Header sx={sx.header} />
      <Stack component="main" direction="row" sx={sx.main}>
        <Navbar sx={sx.navbar} />
        <Box component="section" sx={sx.content}>
          {outlet}
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardBase;
