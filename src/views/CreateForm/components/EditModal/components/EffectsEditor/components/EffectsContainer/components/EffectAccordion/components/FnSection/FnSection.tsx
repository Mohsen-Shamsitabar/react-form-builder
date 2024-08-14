/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Divider, Grid, Stack } from "@mui/material";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { type ComparisonTypes } from "services/schema/constants";
import {
  type ComparisonFnParams,
  type Fn,
  type LogicalFnParams,
  type SchemaID,
} from "services/schema/types";
import { isLogicalFn } from "services/schema/utils";
import { useEffectFieldNames } from "views/CreateForm/components/EditModal/components/EffectsEditor/hooks";
import {
  EFFECT_NAME_SEPERATOR,
  FIRST_COMPARISON_FN_IDENTIFIER,
  LOGICAL_FN_IDENTIFIER,
  SECOND_COMPARISON_FN_IDENTIFIER,
} from "views/CreateForm/names";
import { Fieldset } from "views/CreateForm/utils";
import {
  ChainNodesSection,
  ComparisonNode,
  LogicalNode,
  NodeCard,
} from "./components";
import {
  COMPARISON_NODE_GRIDSIZE,
  DIVIDER_GRIDSIZE,
  LOGICAL_NODE_GRIDSIZE,
} from "./constants";

type FnFieldsetProps = {
  fn: Fn;
  effectId: SchemaID;
};

const FnSection = (props: FnFieldsetProps) => {
  const { fn: fnProp, effectId } = props;

  const [fn, setFn] = React.useState(fnProp);

  const { unregister } = useFormContext();

  const { fnFieldNames } = useEffectFieldNames(effectId);

  const operator = fn[0];

  if (isLogicalFn(operator)) {
    const [fn1, fn2] = fn[1] as LogicalFnParams;

    const logicalFnFieldName = fnFieldNames.find(name =>
      name.includes(`${LOGICAL_FN_IDENTIFIER}`),
    )!;

    const logicalFnId = logicalFnFieldName.split(EFFECT_NAME_SEPERATOR)[1]!;

    const operator1 = fn1[0] as ComparisonTypes;
    const operator2 = fn2[0] as ComparisonTypes;
    const [fieldId1, value1] = fn1[1] as ComparisonFnParams;
    const [fieldId2, value2] = fn2[1] as ComparisonFnParams;

    const fn1FieldName = fnFieldNames.find(name =>
      name.includes(`${FIRST_COMPARISON_FN_IDENTIFIER}`),
    )!;

    const fn2FieldName = fnFieldNames.find(name =>
      name.includes(`${SECOND_COMPARISON_FN_IDENTIFIER}`),
    )!;

    const fn1Id = fn1FieldName.split(`${EFFECT_NAME_SEPERATOR}`)[1]!;

    const fn2Id = fn2FieldName.split(`${EFFECT_NAME_SEPERATOR}`)[1]!;

    const handleLogicalFnDelete = () => {
      unregister(logicalFnFieldName);
      setFn(fn1);

      fnFieldNames.forEach(name => {
        if (!name.includes(fn2Id)) return;

        unregister(name);
      });
    };

    return (
      <Fieldset title={"Conditions"}>
        <Grid container columns={5} alignItems={"center"}>
          <Grid item xs={COMPARISON_NODE_GRIDSIZE}>
            <NodeCard>
              <ComparisonNode
                effectId={effectId}
                fnId={fn1Id}
                fnFieldNames={fnFieldNames}
                fieldId={fieldId1}
                operator={operator1}
                value={value1}
              />
            </NodeCard>
          </Grid>

          <Grid item xs={DIVIDER_GRIDSIZE}>
            <Divider orientation="horizontal" />
          </Grid>

          <Grid item xs={LOGICAL_NODE_GRIDSIZE}>
            <NodeCard>
              <Stack direction={"column"}>
                <LogicalNode
                  effectId={effectId}
                  fnId={logicalFnId}
                  operator={operator}
                  fnFieldNames={fnFieldNames}
                />

                <Button onClick={handleLogicalFnDelete}>Delete</Button>
              </Stack>
            </NodeCard>
          </Grid>

          <Grid item xs={DIVIDER_GRIDSIZE}>
            <Divider orientation="horizontal" />
          </Grid>

          <Grid item xs={COMPARISON_NODE_GRIDSIZE}>
            <NodeCard>
              <ComparisonNode
                effectId={effectId}
                fnId={fn2Id}
                fnFieldNames={fnFieldNames}
                fieldId={fieldId2}
                operator={operator2}
                value={value2}
              />
            </NodeCard>
          </Grid>
        </Grid>
      </Fieldset>
    );
  }

  const [fieldId, value] = fn[1] as ComparisonFnParams;

  const comparisonFnFieldName = fnFieldNames.find(name =>
    name.includes(`${FIRST_COMPARISON_FN_IDENTIFIER}`),
  )!;

  const fnId = comparisonFnFieldName.split(EFFECT_NAME_SEPERATOR)[1]!;

  return (
    <Fieldset title={"Conditions"}>
      <Grid container columns={5} alignItems={"center"}>
        <Grid item xs={COMPARISON_NODE_GRIDSIZE}>
          <NodeCard>
            <ComparisonNode
              effectId={effectId}
              fnId={fnId}
              fnFieldNames={fnFieldNames}
              fieldId={fieldId}
              operator={operator}
              value={value}
            />
          </NodeCard>
        </Grid>

        <Grid item xs={DIVIDER_GRIDSIZE}>
          <Divider orientation="horizontal" />
        </Grid>

        <ChainNodesSection effectId={effectId} fnFieldNames={fnFieldNames} />
      </Grid>
    </Fieldset>
  );
};

export default FnSection;
