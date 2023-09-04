/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Stack, SxProps } from "@mui/material";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { SchemaToJSX, type Schema } from "services";

type FormProps = {
  schema: Schema;
  sx?: SxProps;
};

const Form = (props: FormProps) => {
  const { schema, sx: sxProp } = props;

  const form = useForm({ mode: "all" });

  const submitHandler: SubmitHandler<FieldValues> = (_data, _e) => void 0;

  return (
    <Box sx={sxProp}>
      <form onSubmit={form.handleSubmit(submitHandler)} noValidate>
        <FormProvider {...form}>
          <Stack spacing={2}>
            <SchemaToJSX schema={schema} />
            <button type="submit">submit</button>
          </Stack>
        </FormProvider>
      </form>
    </Box>
  );
};

export default Form;
