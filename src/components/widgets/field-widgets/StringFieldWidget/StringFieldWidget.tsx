import {
  FormGroup,
  TextField,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import { type StringFieldWidgetProps } from "services";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";

type Props = StringFieldWidgetProps & {
  sx?: SxProps<Theme>;
};

const StringFieldWidget = (props: Props) => {
  const {
    sx: sxProp,
    label,
    defaultValue = "",
    description = "",
    required = false,
    maxLength: maxLengthProp = Infinity,
    minLength: minLengthProp = -Infinity,
    multiline = false,
    type,
    placeholder = "",
  } = props;

  return (
    <FormGroup sx={mergeSx(sxProp, sx.fieldWidget)}>
      <Typography variant="body1" color="GrayText" data-slot="description">
        {description}
      </Typography>
      <TextField
        label={label}
        fullWidth
        type={type}
        multiline={multiline}
        required={required}
        inputProps={{ maxLength: maxLengthProp, minLength: minLengthProp }}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </FormGroup>
  );
};

export default StringFieldWidget;
