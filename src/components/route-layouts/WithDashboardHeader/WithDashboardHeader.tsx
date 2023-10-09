import { Box } from "@mui/material";
import { useOutlet } from "react-router-dom";
import { Header } from "./components";
import * as sx from "./styles";

const WithDashboardHeader = () => {
  const outlet = useOutlet();

  return (
    <>
      <Header sx={sx.header} />
      <Box sx={sx.wrapper}>{outlet}</Box>
    </>
  );
};

export default WithDashboardHeader;
