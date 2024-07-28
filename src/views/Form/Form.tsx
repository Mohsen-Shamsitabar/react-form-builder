/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Stack } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { SchemaProvider, SchemaStateManagerProvider } from "services";
import { SchemaForm } from "services/schema/components";
import { type SchemaID } from "services/schema/types";
import { BackButton, Footer, Header, SubmitButton } from "./components";
import { type LoaderData } from "./loader";
import * as sx from "./styles";
import { getSchemaPages } from "./utils";

const Form = () => {
  const schema = useLoaderData() as LoaderData;

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

  const handleBackClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    return;
  };

  return (
    <>
      <Header />
      <Stack direction="column" sx={sx.wrapper}>
        <SchemaProvider schema={schema}>
          <FormProvider {...form}>
            <SchemaStateManagerProvider>
              <Box sx={sx.main} component="main">
                <SchemaForm
                  submitButton={
                    <button
                      ref={btnRef}
                      type="submit"
                      style={{ display: "none" }}
                    />
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
                backButton={
                  <BackButton
                    onClick={handleBackClick}
                    sx={sx.backButton}
                    schemaPages={pages}
                  />
                }
              />
            </SchemaStateManagerProvider>
          </FormProvider>
        </SchemaProvider>
      </Stack>
    </>
  );
};

export default Form;
