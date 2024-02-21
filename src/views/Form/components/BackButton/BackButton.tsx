/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useSchemaStateManager } from "services";
import type { SchemaID } from "services/schema/types";
import type { SystemSX } from "types";

type Props = {
  schemaPages: SchemaID[];
  sx?: SystemSX;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const BackButton = (props: Props) => {
  const { onClick, sx, schemaPages } = props;

  const form = useFormContext();

  const schemaStateManager = useSchemaStateManager();

  if (!schemaStateManager) return;

  const { state, goToPage, setPageData } = schemaStateManager;

  const currentPageIdx = schemaPages.findIndex(
    pageId => pageId === state.currentPage,
  );

  const isFirstPage = currentPageIdx === 0;

  const hasPreviousVisitedPage =
    state.visitedPages[state.visitedPages.length - 1] ?? false;

  const isDisabled = isFirstPage ? !hasPreviousVisitedPage : false;

  const handleClick: Props["onClick"] = event => {
    onClick?.(event);

    const pageData = form.getValues();

    if (isDisabled) return;

    const nextPageId = hasPreviousVisitedPage
      ? state.visitedPages[state.visitedPages.length - 1]!
      : schemaPages[0]!;

    goToPage(nextPageId, true);
    setPageData({ [state.currentPage]: pageData });
  };

  return (
    <>
      <Button
        disabled={isDisabled}
        onClick={handleClick}
        sx={sx}
        variant="outlined"
      >
        Back
      </Button>
    </>
  );
};

export default BackButton;
