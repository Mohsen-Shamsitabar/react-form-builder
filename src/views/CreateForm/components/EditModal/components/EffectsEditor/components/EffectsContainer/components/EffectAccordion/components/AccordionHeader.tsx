import {
  Delete as DeleteIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
  AccordionSummary,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { Effect } from "services/schema/types";
import { useEffectEditorData } from "../../../../../effectEditorDataContext";
import { useEffectFieldNames } from "../../../../../hooks";

type Props = {
  effect: Effect;
  expanded: boolean;
};

const AccordionHeader = (props: Props) => {
  const { effect, expanded } = props;

  const { unregister } = useFormContext();

  const { effectErrors, effectFieldNames } = useEffectFieldNames(effect.id);

  const effectEditorData = useEffectEditorData();
  if (!effectEditorData) return null;

  const { allEffects, setAllEffects } = effectEditorData;

  const renderExpandIcon = () => {
    if (expanded) return <ExpandLessIcon />;

    return <ExpandMoreIcon />;
  };

  const renderErrorMessage = () => {
    if (effectErrors.length <= 0) return null;

    return <FormHelperText error>This effect has errors!</FormHelperText>;
  };

  const handleEffectDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();

    setAllEffects(
      allEffects.filter(stateEffect => stateEffect.id !== effect.id),
    );

    effectFieldNames.forEach(name => unregister(name));
  };

  return (
    <AccordionSummary>
      <Stack direction={"column"} width={"100%"}>
        <Stack
          border={"GrayText"}
          sx={{ width: "100%" }}
          direction={"row"}
          alignItems={"center"}
        >
          {renderExpandIcon()}

          <Typography
            color={effectErrors.length > 0 ? "red" : undefined}
            marginLeft={2}
          >
            {effect.id}
          </Typography>

          <IconButton sx={{ marginLeft: "auto" }} onClick={handleEffectDelete}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>

        {renderErrorMessage()}
      </Stack>
    </AccordionSummary>
  );
};

export default AccordionHeader;
