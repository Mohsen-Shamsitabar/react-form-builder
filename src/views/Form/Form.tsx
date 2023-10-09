import { Box, Stack } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { FormStateManager } from "services";
import { SchemaForm } from "services/schema/components";
import { BackButton, Footer, Header, SubmitButton } from "./components";
import { type LoaderData } from "./loader";
import * as sx from "./styles";
import { getSchemaPages } from "./utils";

const Form = () => {
  const schema = useLoaderData() as LoaderData;
  const form = useForm({ mode: "all" });

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
        <FormStateManager form={form} schemaPages={pages}>
          <Box sx={sx.main} component="main">
            <SchemaForm
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              form={form}
              schema={schema}
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
        </FormStateManager>
      </Stack>
    </>
  );
};

export default Form;
