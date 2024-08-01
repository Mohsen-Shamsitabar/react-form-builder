import { Add as AddIcon } from "@mui/icons-material";
import { FormHelperText, IconButton, Stack, TextField } from "@mui/material";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import type { ChoiceOption } from "services/schema/types";

type Props = {
  options: ChoiceOption[];
};

const CreateOptionSection = (props: Props) => {
  const { options } = props;

  const { setValue } = useFormContext();

  const [inputLabel, setInputLabel] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleLabelChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newLabel = event.target.value;

    setInputLabel(newLabel);
  };

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    const allValues = options.map(option => option.value);

    if (allValues.includes(newValue)) {
      setErrorMessage("The given value is taken by another option!");
      return;
    }

    setErrorMessage("");
  };

  const handleAddBtnClick = () => {
    if (!inputLabel || !inputValue || errorMessage) return;

    const newOption: ChoiceOption = { label: inputLabel, value: inputValue };

    const newOptions = [...options, newOption];

    setValue("options", newOptions);
    setInputLabel("");
    setInputValue("");
  };

  const renderError = () => {
    if (!errorMessage) return null;

    return <FormHelperText error>{errorMessage}</FormHelperText>;
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <TextField
          label="Label"
          type="text"
          size="small"
          placeholder="Option label"
          value={inputLabel}
          onChange={handleLabelChange}
        />

        <TextField
          label="Value"
          type="text"
          size="small"
          placeholder="Option Value"
          value={inputValue}
          onChange={handleValueChange}
          error={Boolean(errorMessage)}
        />

        <IconButton onClick={handleAddBtnClick}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Stack>

      {renderError()}
    </>
  );
};

export default CreateOptionSection;
