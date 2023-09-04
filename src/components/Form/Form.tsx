import { Box, SxProps } from "@mui/material";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { SchemaToJSX, type DocumentSchema } from "services";

type FormProps = {
  schema: DocumentSchema;
  sx?: SxProps;
};

const Form = (props: FormProps) => {
  const { schema, sx: sxProp } = props;
  const { submitButtonText } = schema;

  const form = useForm({ mode: "all" });

  const submitHandler: SubmitHandler<FieldValues> = (_data, _e) => void 0;

  return (
    <Box sx={sxProp}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(submitHandler)} noValidate>
        <FormProvider {...form}>
          <SchemaToJSX schema={schema} />
          <button type="submit">{submitButtonText}</button>
        </FormProvider>
      </form>
    </Box>
  );
};

export default Form;
