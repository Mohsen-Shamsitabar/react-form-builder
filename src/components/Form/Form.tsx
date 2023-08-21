import { Box, Stack, SxProps } from "@mui/material";
import { type Schema, SchemaToJSX, SchemaContext } from "services";
import * as React from "react";

type MyFormProps = {
  schema: Schema;
  sx?: SxProps;
};

const MyForm = (props: MyFormProps) => {
  const { schema, sx: sxProp } = props;

  const context = React.useContext(SchemaContext);

  const handleSubmit: React.FormEventHandler = event => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    let isFormValid = true;

    context.forEach(field => {
      const validation = field.checkValidity;
      const { isValid } = validation;
      if (!isValid) {
        isFormValid = false;
      }
    });

    if (!isFormValid) return;

    form.submit();
  };

  return (
    <Box sx={sxProp}>
      <form name="testForm" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <SchemaToJSX schema={schema} />
          <button type="submit">submit</button>
        </Stack>
      </form>
    </Box>
  );
};

export default MyForm;
