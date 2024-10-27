/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Button, Stack } from "@mui/material";
import Footer from "components/Footer";
import * as React from "react";
import { type FieldValues, FormProvider, useForm } from "react-hook-form";
import { SchemaProvider, SchemaStateManagerProvider } from "services";
import { SchemaForm } from "services/schema/components";
import type { DocumentSchema, SchemaID } from "services/schema/types";
import { getSchemaPages } from "utils";
import { BackButton, FormTable, SubmitButton } from "./components";
import * as sx from "./styles";

type Props = {
  schema: DocumentSchema;
};

const Form = (props: Props) => {
  const { schema } = props;

  const [formData, setFormData] = React.useState<FieldValues>({});
  const isFormFilled = React.useMemo(
    () => !!Object.keys(formData).length,
    [formData],
  );

  const formDefaultValues = React.useMemo(() => {
    const { widgets } = schema.definitions;

    return Object.keys(widgets).reduce<Record<SchemaID, unknown>>(
      (defaultValues, widgetId) => {
        const widget = widgets[widgetId]!;

        if (widget.type !== "field") return defaultValues;

        let fieldDefaultValue: unknown;
        const { type, properties } = widget.properties;

        switch (type) {
          case "boolean": {
            fieldDefaultValue = properties.defaultChecked;
            break;
          }

          case "choice":
          case "number":
          case "string": {
            fieldDefaultValue = properties.defaultValue;
            break;
          }

          default:
            return defaultValues;
        }

        defaultValues[widget.id] = fieldDefaultValue;

        return defaultValues;
      },
      {},
    );
  }, [schema]);

  const form = useForm({
    mode: "all",
    defaultValues: formDefaultValues as object,
  });

  const btnRef = React.useRef<HTMLButtonElement>(null);

  const pages = React.useMemo(() => getSchemaPages(schema), [schema]);

  const handleSubmitClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    btnRef.current?.click();
  };

  const handleResetClick = () => {
    setFormData({});
  };

  const renderContent = () => {
    if (isFormFilled) {
      return (
        <>
          <FormTable data={formData} />

          <Footer sx={sx.footer}>
            <Button variant="contained" onClick={handleResetClick}>
              Reset
            </Button>
          </Footer>
        </>
      );
    }

    return (
      <>
        <Box sx={sx.main} component="main">
          <SchemaForm
            setFormData={setFormData}
            submitButton={
              <button ref={btnRef} type="submit" style={{ display: "none" }} />
            }
          />
        </Box>

        <Footer
          sx={sx.footer}
          submitButton={
            <SubmitButton
              sx={sx.submitButton}
              text={schema.submitButtonText}
              onClick={handleSubmitClick}
            />
          }
          backButton={<BackButton sx={sx.backButton} schemaPages={pages} />}
        />
      </>
    );
  };

  return (
    <Stack direction="column" sx={sx.wrapper}>
      <SchemaProvider schema={schema}>
        <FormProvider {...form}>
          <SchemaStateManagerProvider>
            {renderContent()}
          </SchemaStateManagerProvider>
        </FormProvider>
      </SchemaProvider>
    </Stack>
  );
};

export default Form;
