/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Stack, SxProps } from "@mui/material";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { SchemaToJSX, type Schema } from "services";
type FormProps = {
  schema: Schema;
  sx?: SxProps;
};

export type FormValues = Record<
  string,
  string | number | boolean | string[] | undefined
>;

let renders = 0;
const Form = (props: FormProps) => {
  renders++;
  const { schema, sx: sxProp } = props;

  const rhForm = useForm<FormValues>({ mode: "all" });

  const onSubmit: SubmitHandler<FormValues> = (data, e) =>
    console.log("submitted", data, e);

  const onError: SubmitErrorHandler<FormValues> | undefined = (errors, e) =>
    console.log(errors, e);

  const handleClicked = () => {
    console.log({ fields: rhForm.getValues(), formState: rhForm.formState });
  };

  return (
    <Box sx={sxProp}>
      <form onSubmit={rhForm.handleSubmit(onSubmit)} noValidate>
        <p>{renders}</p>
        <FormProvider {...rhForm}>
          <Stack spacing={2}>
            <SchemaToJSX schema={schema} />
            <button type="submit" onClick={handleClicked}>
              submit
            </button>
          </Stack>
        </FormProvider>
      </form>
    </Box>
  );
};

export default Form;
