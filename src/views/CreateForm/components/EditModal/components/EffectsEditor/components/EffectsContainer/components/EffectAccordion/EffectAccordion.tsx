import { Accordion, AccordionDetails } from "@mui/material";
import type { Effect, SchemaID } from "services/schema/types";
import { AccordionHeader, ActionSection, FnSection } from "./components";

type Props = {
  effect: Effect;
  expandedAccordion: SchemaID | null;
  onAccordionSelect: () => void;
};

const EffectAccordion = (props: Props) => {
  const { effect, expandedAccordion, onAccordionSelect } = props;

  const expanded = expandedAccordion === effect.id;

  return (
    <Accordion
      expanded={expanded}
      onChange={onAccordionSelect}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionHeader effect={effect} expanded={expanded} />

      <AccordionDetails>
        <ActionSection effect={effect} />

        <FnSection fn={effect.fn} effectId={effect.id} />
      </AccordionDetails>
    </Accordion>
  );
};

export default EffectAccordion;
