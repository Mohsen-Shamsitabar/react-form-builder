import {
  FormGroup,
  TextField,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import { type NumberFieldWidgetProps } from "services";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";

type Props = NumberFieldWidgetProps & {
  sx?: SxProps<Theme>;
};

const NumberFieldWidget = (props: Props) => {
  const {
    sx: sxProp,
    label,
    defaultValue = 0,
    description = "",
    required = false,
    max: maxProp = Infinity,
    min: minProp = -Infinity,
    placeholder = "",
  } = props;

  return (
    <FormGroup sx={mergeSx(sxProp, sx.fieldWidget)}>
      <Typography variant="body1" color="GrayText" data-slot="description">
        {description}
      </Typography>
      <TextField
        fullWidth
        label={label}
        type="number"
        required={required}
        inputProps={{
          min: minProp,
          max: maxProp,
        }}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </FormGroup>
  );
};

export default NumberFieldWidget;
