import AddIcon from "@mui/icons-material/Add";
import { Button, Stack, Typography } from "@mui/material";
import * as paths from "configs/router/paths";
import { Link } from "react-router-dom";
import * as sx from "./styles";

const EmptyStatement = () => {
  return (
    <Stack sx={sx.root} alignItems="center" spacing={2}>
      <Typography variant="h4">Oops!</Typography>
      <Typography>It looks like you dont have any forms</Typography>

      <Link to={paths.CREATE_FORM}>
        <Button variant="outlined" startIcon={<AddIcon />}>
          Create Form
        </Button>
      </Link>
    </Stack>
  );
};

export default EmptyStatement;
