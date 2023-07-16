import { Stack } from "@mui/material";
import { Body, Sidebar } from "./components";

const Dashboard = () => {
  return (
    <Stack direction="row" sx={{ height: "100vh", width: "100vw" }}>
      <Sidebar />
      <Body />
    </Stack>
  );
};

export default Dashboard;
