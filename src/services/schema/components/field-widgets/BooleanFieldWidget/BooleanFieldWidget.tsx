/* eslint-disable no-case-declarations */
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Switch,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { type BooleanFieldWidgetProps } from "services";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";
import { useErrorMessage } from "./hooks";

type Props = BooleanFieldWidgetProps & {
  sx?: SxProps<Theme>;
};

const BooleanFieldWidget = (props: Props) => {
  const {
    label,
    defaultChecked = false,
    description,
    required = false,
    sx: sxProp,
  } = props;

  const { control } = useFormContext();

  const { field, fieldState } = useController({
    name: label,
    control,
    defaultValue: defaultChecked,
    shouldUnregister: true,
    rules: {
      required,
    },
  });

  const errorMessage = useErrorMessage(fieldState);

  return (
    <>
      <FormControl
        error={Boolean(errorMessage)}
        sx={mergeSx(sxProp, sx.fieldWidget)}
      >
        {description && (
          <FormLabel>
            <Typography variant="body1" color="GrayText">
              {description}
            </Typography>
          </FormLabel>
        )}
        <FormGroup>
          <FormControlLabel
            required={required}
            id={label}
            control={
              <Switch
                {...field}
                defaultChecked={defaultChecked}
                inputProps={{ role: "switch", "aria-labelledby": label }}
              />
            }
            label={label}
          />
        </FormGroup>
        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default BooleanFieldWidget;
