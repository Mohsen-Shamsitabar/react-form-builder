import { Stack } from "@mui/material";
import { type SchemaID } from "services";
import * as sx from "./styles";

interface Props {
  widgets: (JSX.Element | null)[];
  pageId: SchemaID;
  pageTitle: string;
}

const SchemaPage = (props: Props) => {
  const { widgets, pageId, pageTitle } = props;

  return (
    <Stack id={`page-${pageId}`} sx={sx.root} spacing={2}>
      <h1>{pageTitle}</h1>
      {widgets}
    </Stack>
  );
};

export default SchemaPage;
