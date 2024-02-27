import { type SchemaStateManager } from "services";
import { FieldAction } from "services/schema/constants";
import {
  type DocumentSchema,
  type FieldDatas,
  type SchemaID,
} from "services/schema/types";
import {
  getFieldEffects,
  isEffectTriggered,
  triggerEffectAction,
} from "services/schema/utils";

const handleFieldEffects = (
  schema: DocumentSchema,
  schemaStateManager: SchemaStateManager,
  fieldDatas: FieldDatas,
) => {
  const { currentPage } = schemaStateManager.state;

  const fieldEffects = getFieldEffects(currentPage, schema);

  const hiddenWidgetIds: SchemaID[] = fieldEffects.reduce(
    (result, fieldEffect) => {
      const isTriggered = isEffectTriggered(fieldEffect.fn, fieldDatas);

      if (!isTriggered) return result;

      return result.concat(fieldEffect.action.payload.widgetIds);
    },
    [] as SchemaID[],
  );

  // fix this ?!

  triggerEffectAction(
    {
      type: FieldAction.HIDE_WIDGETS,
      payload: { widgetIds: hiddenWidgetIds },
    },
    schemaStateManager,
  );
};

export default handleFieldEffects;
