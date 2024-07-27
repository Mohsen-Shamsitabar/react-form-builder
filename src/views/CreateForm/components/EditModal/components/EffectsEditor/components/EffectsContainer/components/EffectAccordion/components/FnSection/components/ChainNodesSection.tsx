import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
} from "@mui/material";
import * as React from "react";
import { type SchemaID } from "services/schema/types";
import { v4 as uuid } from "uuid";
import {
  LOGICAL_FN_IDENTIFIER,
  logicalOperators,
  SECOND_COMPARISON_FN_IDENTIFIER,
} from "views/CreateForm/components/EditModal/constants";
import { createEffectNameGenerator } from "views/CreateForm/components/EditModal/utils";
import { ChoiceFormControl } from "views/CreateForm/components/form-controls";
import ComparisonNode from "./ComparisonNode";
import NodeCard from "./NodeCard";

type Props = {
  effectId: SchemaID;
  fnFieldNames: string[];
};

const ChainNodesSection = (props: Props) => {
  const { effectId, fnFieldNames } = props;

  const [logicalOperator, setLogicalOperator] = React.useState("");

  const logicalFnId = React.useMemo(
    () => `${LOGICAL_FN_IDENTIFIER}${uuid()}`,
    [],
  );

  const resetStates = React.useCallback(() => {
    setLogicalOperator("");
  }, []);

  const comparisonFnId = React.useMemo(
    () => `${SECOND_COMPARISON_FN_IDENTIFIER}${uuid()}`,
    [],
  );

  const generateLogicalFnFieldName = createEffectNameGenerator(
    effectId,
    logicalFnId,
  );

  const logicalFnOperatorName = generateLogicalFnFieldName("operator");

  const handleLogicalNodeChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    setLogicalOperator(newValue);
  };

  if (logicalOperator) {
    return (
      <>
        <Grid item xs={1}>
          <NodeCard>
            <Stack direction={"column"}>
              <ChoiceFormControl
                name={logicalFnOperatorName}
                label={"Operator"}
                multiSelect={false}
                options={logicalOperators}
                defaultValue={logicalOperator}
                size="small"
                onChange={(newValue: string) => setLogicalOperator(newValue)}
                shouldUnregister
              />

              <Button onClick={resetStates}>Clear</Button>
            </Stack>
          </NodeCard>
        </Grid>

        <Grid item xs={0.5}>
          <Divider orientation="horizontal" />
        </Grid>

        <Grid item xs={1.5}>
          <NodeCard>
            <ComparisonNode
              effectId={effectId}
              fnId={comparisonFnId}
              fnFieldNames={fnFieldNames}
              fieldId={""}
              operator={""}
              value={""}
              shouldUnregister
              required
            />
          </NodeCard>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid item xs={1}>
        <NodeCard>
          <FormControl fullWidth size={"small"}>
            <InputLabel
              htmlFor={`logicalFnOperator`}
              id={`logicalFnOperator-label`}
            >
              Operator
            </InputLabel>

            <Select
              id={`logicalFnOperator`}
              labelId={`logicalFnOperator-label`}
              label={"Operator"}
              value={logicalOperator}
              onChange={handleLogicalNodeChange}
            >
              {logicalOperators.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </NodeCard>
      </Grid>

      <Grid item xs={1}></Grid>

      <Grid item xs={1}></Grid>
    </>
  );
};

export default ChainNodesSection;
