import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useFormStateManager, type SchemaID } from "services";
import type { SystemSX } from "types";

type Props = {
  schemaPages: SchemaID[];
  sx?: SystemSX;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const BackButton = (props: Props) => {
  const { onClick, sx, schemaPages } = props;

  const form = useFormContext();

  const formStateManager = useFormStateManager();
  if (!formStateManager) return;
  const { state, goToPage, setPageData } = formStateManager;

  const currentPageIdx = schemaPages.findIndex(
    pageId => pageId === state.currentPage,
  );

  const handleClick: Props["onClick"] = event => {
    onClick?.(event);
    const pageData = form.getValues();
    if (currentPageIdx === 0) {
      return;
    }
    setPageData({ [state.currentPage]: pageData });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    goToPage(schemaPages[currentPageIdx - 1]!);
  };

  return (
    <>
      <Button onClick={handleClick} sx={sx} variant="outlined">
        Back
      </Button>
    </>
  );
};

export default BackButton;
