import { Stack } from "@mui/material";
import * as React from "react";
import type { Effect, SchemaID } from "services/schema/types";
import { Fieldset } from "views/CreateForm/utils";
import EffectAccordion from "./components/EffectAccordion/EffectAccordion";

type Props = {
  effects: Effect[];
};

const EffectsContainer = (props: Props) => {
  const { effects } = props;

  const [expandedAccordion, setExpandedAccordion] =
    React.useState<SchemaID | null>(null);

  const makeHandleAccordionSelect = (effectId: SchemaID) => () => {
    setExpandedAccordion(expandedAccordion === effectId ? null : effectId);
  };

  return (
    <Fieldset title={"All Effects"}>
      <Stack direction={"column"} justifyContent={"center"}>
        {effects.map(effect => (
          <EffectAccordion
            key={effect.id}
            effect={effect}
            expandedAccordion={expandedAccordion}
            onAccordionSelect={makeHandleAccordionSelect(effect.id)}
          />
        ))}
      </Stack>
    </Fieldset>
  );
};

export default EffectsContainer;
