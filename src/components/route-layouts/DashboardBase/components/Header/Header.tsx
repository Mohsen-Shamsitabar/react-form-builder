import { Button, Stack } from "@mui/material";

interface Props {
  className?: string;
}

const Header = (props: Props) => {
  const { className, ...otherProps } = props;

  return (
    <Stack
      {...otherProps}
      component="header"
      className={className}
      justifyContent="space-between"
    >
      <Stack>
        <span>🚀</span> ReactFormBuilder
      </Stack>

      <Button variant="outlined">logout</Button>
    </Stack>
  );
};

export default Header;
