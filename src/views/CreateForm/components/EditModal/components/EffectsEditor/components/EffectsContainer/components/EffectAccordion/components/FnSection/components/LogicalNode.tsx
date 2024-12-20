import { FormGroup } from "@mui/material";
import { type LogicalFnNodeProps } from "views/CreateForm/components/EditModal/types";
import { createEffectNameGenerator } from "views/CreateForm/components/EditModal/utils";
import { ChoiceFormControl } from "views/CreateForm/components/form-controls";
import { logicalOperators } from "views/CreateForm/constants";
import { OPERATOR } from "views/CreateForm/names";

const LogicalNode = (props: LogicalFnNodeProps) => {
  const {
    effectId,
    fnId,
    fnFieldNames,
    operator,
    onChange,
    shouldUnregister,
    required = true,
  } = props;

  const generateEffectName = createEffectNameGenerator(effectId, fnId);

  const operatorEffectName =
    fnFieldNames.find(key => key.includes(fnId) && key.includes(OPERATOR)) ??
    generateEffectName(OPERATOR);

  return (
    <FormGroup>
      <ChoiceFormControl
        name={operatorEffectName}
        label={"Operator"}
        multiSelect={false}
        options={logicalOperators}
        defaultValue={operator}
        size="small"
        required={required}
        onChange={onChange}
        shouldUnregister={shouldUnregister}
      />
    </FormGroup>
  );
};

export default LogicalNode;
