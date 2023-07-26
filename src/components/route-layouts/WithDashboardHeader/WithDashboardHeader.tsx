import { Box } from "@mui/material";
import { useOutlet } from "react-router-dom";
import { Header } from "./components";
import * as sx from "./styles";

const WithDashboardHeader = () => {
  const outlet = useOutlet();

  return (
    <Box sx={sx.root}>
      <Header sx={sx.header} />
      <Box component="main" sx={sx.main}>
        {outlet}
      </Box>
    </Box>
  );
};

export default WithDashboardHeader;
