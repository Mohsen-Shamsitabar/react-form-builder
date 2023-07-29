import {
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import { type BooleanFieldWidgetProps } from "services";
import { mergeSx } from "utils";
import * as sx from "../commonStyles";

type Props = BooleanFieldWidgetProps & {
  sx?: SxProps<Theme>;
};

const BooleanFieldWidget = (props: Props) => {
  const { label, defaultValue, description, required, sx: sxProp } = props;

  return (
    <FormGroup sx={mergeSx(sxProp, sx.fieldWidget)}>
      <Typography variant="body1" color="GrayText" data-slot="description">
        {description}
      </Typography>
      <FormControlLabel
        required={required}
        control={<Switch defaultChecked={defaultValue} />}
        label={label}
        labelPlacement="end"
      />
    </FormGroup>
  );
};

export default BooleanFieldWidget;
