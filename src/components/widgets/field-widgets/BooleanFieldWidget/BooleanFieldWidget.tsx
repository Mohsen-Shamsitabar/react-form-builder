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
import { useFormContext } from "react-hook-form";
import { type BooleanFieldWidgetProps } from "services";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";

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

  const messages = {
    required: "Please check this box if you want to proceed nigga.",
  };

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = messages[errors[label]?.type as keyof typeof messages];
  const hasError = errors[label] ? true : false;

  return (
    <>
      <FormControl error={hasError} sx={mergeSx(sxProp, sx.fieldWidget)}>
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
                {...register(label, {
                  required,
                  shouldUnregister: true,
                })}
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
