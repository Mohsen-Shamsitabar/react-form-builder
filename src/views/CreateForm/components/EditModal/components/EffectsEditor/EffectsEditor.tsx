/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Stack } from "@mui/material";
import type { PageNode } from "views/CreateForm/types";

type Props = {
  page: PageNode;
};

const EffectsEditor = (props: Props) => {
  const { page } = props;

  return <Stack direction="column" justifyContent={"center"}></Stack>;
};

export default EffectsEditor;
