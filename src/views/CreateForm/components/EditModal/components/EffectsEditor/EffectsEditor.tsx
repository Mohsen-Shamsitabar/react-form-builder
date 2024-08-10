/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Stack } from "@mui/material";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { useFormStateManager } from "views/CreateForm/form-state-manager";
import type { PageNode } from "views/CreateForm/types";
import { isFieldWidgetNode } from "views/CreateForm/utils";
import { getEffectsFromFormValues } from "../../utils";
import { CreateEffectSection, EffectsContainer } from "./components";
import { EditorDataProvider } from "./editorDataCtx";

type Props = {
  page: PageNode;
};

const EffectsEditor = (props: Props) => {
  const { page } = props;

  const formStateManager = useFormStateManager();

  const { getValues } = useFormContext();

  const allFieldNames = getValues();

  const [allEffects, setAllEffects] = React.useState(
    getEffectsFromFormValues(page.id, allFieldNames),
  );

  if (!formStateManager) return null;

  const { state } = formStateManager;

  const allFieldWidgets = page.widgets.filter(widgetId => {
    const widget = state.widgets.byId[widgetId]!;

    return isFieldWidgetNode(widget);
  });

  const renderEffectsContainer = () => {
    if (allEffects.length === 0) return null;

    return <EffectsContainer effects={allEffects} />;
  };

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

        {renderEffectsContainer()}
      </EditorDataProvider>
    </Stack>
  );
};

export default EffectsEditor;
