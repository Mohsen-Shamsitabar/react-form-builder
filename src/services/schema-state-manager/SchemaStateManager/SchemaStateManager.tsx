/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { useSchema } from "services";
import {
  type DocumentSchema,
  type FieldDatas,
  type SchemaID,
} from "services/schema/types";
import {
  calcInitialVisibleWidgets,
  getFieldEffects,
  isEffectTriggered,
} from "services/schema/utils";
import {
  createGoToPageAction,
  createSetCurrentPageWidgets,
  createSetPageData,
  createSetVisibleWidgets,
} from "./actions";
import {
  Provider as SchemaStateManagerProvider,
  type ContextValue as SchemaStateManagerContextValue,
} from "./context";
import reducer, { INITIAL_STATE } from "./reducer";

type Props = {
  children: React.ReactNode;
};

const SchemaStateManager = (props: Props) => {
  const { children } = props;

  const { getValues } = useFormContext();

  const schema = useSchema();

  const fieldDatas = getValues() as FieldDatas;

  const getVisibleWidgetIds = React.useCallback(
    (schema: DocumentSchema, pageId: SchemaID) => {
      const { "order:widgets": widgetIds } = schema.definitions.pages[pageId]!;

      const fieldEffects = getFieldEffects(pageId, schema);

      return fieldEffects.reduce((result, fieldEffect) => {
        const isTriggered = isEffectTriggered(fieldEffect.fn, fieldDatas);

        if (!isTriggered) return result;

        return calcInitialVisibleWidgets(widgetIds, fieldEffect.action);
      }, widgetIds);
    },
    [fieldDatas],
  );

  const schemaPages = schema?.["order:pages"] ?? [];

  const [state, dispatch] = React.useReducer(
    reducer,
    INITIAL_STATE,
    initialState => {
      const currentPage = schemaPages[0]!;
      const currentPageWidgets = schema
        ? schema.definitions.pages[currentPage]!["order:widgets"]
        : [];
      const visibleWidgets: SchemaID[] = !schema
        ? []
        : getVisibleWidgetIds(schema, currentPage);

      return {
        ...initialState,
        currentPage,
        visibleWidgets,
        currentPageWidgets,
      };
    },
  );

  const stateManagerContext = React.useMemo<SchemaStateManagerContextValue>(
    () => ({
      state,
      goToPage: (pageId, isBack) => {
        dispatch(createGoToPageAction(pageId, isBack));

        if (!schema) return;

        const newVisibleWidgetIds = getVisibleWidgetIds(schema, pageId);
        const currentPageWidgets =
          schema.definitions.pages[pageId]!["order:widgets"];

        dispatch(createSetVisibleWidgets(newVisibleWidgetIds));
        dispatch(createSetCurrentPageWidgets(currentPageWidgets));
      },

      setPageData: pageData => dispatch(createSetPageData(pageData)),

      setVisibleWidgets: widgetIds =>
        dispatch(createSetVisibleWidgets(widgetIds)),
    }),
    [getVisibleWidgetIds, schema, state],
  );

  if (!schema) return;

  return (
    <SchemaStateManagerProvider context={stateManagerContext}>
      {children}
    </SchemaStateManagerProvider>
  );
};

export default SchemaStateManager;
