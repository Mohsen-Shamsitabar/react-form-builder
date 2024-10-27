/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button } from "@mui/material";
import type { SystemSX } from "types";

type Props = {
  text: string;
  sx?: SystemSX;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const SubmitButton = (props: Props) => {
  const { sx, text, onClick } = props;

  const handleClick: Props["onClick"] = event => {
    onClick?.(event);
  };

  return (
    <Button sx={sx} variant="contained" onClick={handleClick}>
      {text}
    </Button>
  );
};

export default SubmitButton;
