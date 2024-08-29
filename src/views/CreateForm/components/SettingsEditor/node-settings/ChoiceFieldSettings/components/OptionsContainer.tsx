import { Delete as DeleteIcon } from "@mui/icons-material";
import { FormHelperText, IconButton, Stack, TextField } from "@mui/material";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
  type ChoiceFieldWidgetProps,
  type ChoiceOption,
} from "services/schema/types";
import * as names from "views/CreateForm/names";
import * as choiceSx from "../styles";

type Props = {
  options: ChoiceOption[];
};

const OptionsContainer = (props: Props) => {
  const { options } = props;

  const { setValue, getValues, setError, clearErrors, formState } =
    useFormContext();

  const { errors } = formState;
  const errorKeys = Object.keys(errors);

  React.useEffect(() => {
    if (options.length === 0) {
      if (!errorKeys.includes(names.OPTIONS)) {
        setError(names.OPTIONS, {
          message: "NO OPTIONS PROVIDED, PLEASE CREATE OPTIONS!",
        });
        return;
      }

      return;
    }

    if (errorKeys.includes(names.OPTIONS)) {
      clearErrors(names.OPTIONS);
    }
  }, [clearErrors, errorKeys, options, setError]);

  const makeHandleOptionDelete = (value: string) => () => {
    const newOptions = options.filter(option => option.value !== value);
    setValue(names.OPTIONS, newOptions);

    const defaultValue = getValues(
      names.DEFAULT_VALUE,
    ) as ChoiceFieldWidgetProps["defaultValue"];

    if (!defaultValue) return;

    if (typeof defaultValue === "string" && defaultValue === value) {
      setValue(names.DEFAULT_VALUE, "");
      return;
    }

    if (typeof defaultValue !== "string" && defaultValue.includes(value)) {
      setValue(names.DEFAULT_VALUE, []);
      return;
    }
  };

  const renderOptions = () => {
    if (options.length === 0) {
      return (
        <FormHelperText error>
          NO OPTIONS PROVIDED, PLEASE CREATE OPTIONS!
        </FormHelperText>
      );
    }

    return options.map(option => (
      <Stack
        key={option.value}
        sx={choiceSx.choiceOption}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          value={option.label}
          size="small"
          label="Label"
          type="text"
          placeholder="Option label"
          aria-readonly
          inputProps={{ readOnly: true }}
        />

        <TextField
          value={option.value}
          size="small"
          label="Value"
          type="text"
          placeholder="Option Value"
          aria-readonly
          inputProps={{ readOnly: true }}
        />

        <IconButton onClick={makeHandleOptionDelete(option.value)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    ));
  };

  return (
    <Stack direction="column" justifyContent="center">
      {renderOptions()}
    </Stack>
  );
};

export default OptionsContainer;
