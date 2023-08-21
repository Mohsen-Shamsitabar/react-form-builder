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
import * as React from "react";
import { type BooleanFieldWidgetProps, SchemaContext } from "services";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";
import { checkValidity } from "./utils";

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

  const context = React.useContext(SchemaContext);
  let contextField = context.find(field => field.id === label);
  if (!contextField) {
    contextField = {
      id: label,
      checkValidity: checkValidity(defaultChecked, {
        required,
      }),
    };
    context.push(contextField);
  }

  const validation = React.useMemo(
    () =>
      checkValidity(defaultChecked, {
        required,
      }),
    [defaultChecked, required],
  );

  const [checked, setChecked] = React.useState(defaultChecked);

  const [hasError, setHasError] = React.useState(!validation.isValid);

  const [helperText, setHelperText] = React.useState<string | undefined>(
    validation.errorMessage,
  );

  const handleValidity = (value: boolean) => {
    const validation = checkValidity(value, {
      required,
    });

    const { isValid, errorMessage } = validation;

    if (contextField) contextField.checkValidity = validation;

    setHasError(!isValid);
    setHelperText(errorMessage);
  };

  const handleChange = () => {
    const newValue = !checked;
    setChecked(newValue);

    handleValidity(newValue);
  };

  return (
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
              checked={checked}
              inputProps={{ role: "switch", "aria-labelledby": label }}
              onInvalid={event => event.preventDefault()}
              onChange={handleChange}
            />
          }
          label={label}
        />
      </FormGroup>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default BooleanFieldWidget;
