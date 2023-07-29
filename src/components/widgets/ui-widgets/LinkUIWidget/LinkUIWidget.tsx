import { Link } from "@mui/material";
import { LinkUIWidgetProps } from "services";

const LinkUIWidget = (props: LinkUIWidgetProps) => {
  const { href, text } = props;

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </Link>
  );
};

export default LinkUIWidget;
