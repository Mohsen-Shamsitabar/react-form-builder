/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Stack } from "@mui/material";
import * as React from "react";
import type { Effect } from "services/schema/types";
import { useCreateFormData } from "views/CreateForm/DataProvider";
import type { PageNode } from "views/CreateForm/types";
import { isFieldWidgetNode } from "views/CreateForm/utils";
import { CreateEffectSection, EffectsContainer } from "./components";
import { EditorDataProvider } from "./editorDataCtx";

type Props = {
  page: PageNode;
};

const EffectsEditor = (props: Props) => {
  const { page } = props;

  const data = useCreateFormData();

  const [allEffects, setAllEffects] = React.useState(() =>
    !data || !page.effects
      ? []
      : (page.effects.map(effectId => data.effects.byId[effectId]) as Effect[]),
  );

  if (!data) return null;

  const allFieldWidgets = page.widgets.filter(widgetId => {
    const widget = data.widgets.byId[widgetId]!;

    return isFieldWidgetNode(widget);
  });

  // const fieldEffects = allEffects.filter(effect => effect.type === "field");
  // const pageEffects = allEffects.filter(effect => effect.type === "page");

  return (
    <Stack
      justifyContent={"center"}
      direction="column"
      marginTop={2}
      marginBottom={2}
    >
      <EditorDataProvider
        editorData={{
          allEffects,
          setAllEffects,
          allFieldWidgets,
        }}
      >
        <CreateEffectSection />

        {allEffects.length !== 0 && <EffectsContainer effects={allEffects} />}
      </EditorDataProvider>
    </Stack>
  );
};

export default EffectsEditor;
