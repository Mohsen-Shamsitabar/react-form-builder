import { Typography } from "@mui/material";
import type { TextUIWidgetProps } from "services/schema/types";

const TextUIWidget = (props: TextUIWidgetProps) => {
  const { varient, text } = props;

  switch (varient) {
    case "paragraph":
      return <Typography variant="body1">{text}</Typography>;
    case "title":
      return (
        <Typography component="strong" variant="h6">
          {text}
        </Typography>
      );
    case "subtitle":
      return (
        <Typography component="strong" variant="subtitle2">
          {text}
        </Typography>
      );
    default:
      return null;
  }
};

export default TextUIWidget;
