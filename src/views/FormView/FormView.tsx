/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Form } from "components";
import { useLoaderData } from "react-router-dom";
import { Header } from "./components";
import { type LoaderData } from "./loader";

const FormView = () => {
  const schema = useLoaderData() as LoaderData;

  return (
    <>
      <Header />
      <Form schema={schema} />
    </>
  );
};

export default FormView;
