import { Stack } from "@mui/material";
import type { PageSchema } from "services/schema/types";
import * as sx from "./styles";

interface Props {
  page: PageSchema;
  widgets: (JSX.Element | null)[];
}

const SchemaPage = (props: Props) => {
  const { page, widgets } = props;

  return (
    <Stack id={`page-${page.id}`} sx={sx.root} spacing={2}>
      <h1>{page.title}</h1>
      {widgets}
    </Stack>
  );
};

export default SchemaPage;
