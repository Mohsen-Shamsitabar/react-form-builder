import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { FieldValues } from "react-hook-form";
import { useSchema } from "services";
import type { FieldWidget } from "services/schema/types";

type Props = {
  data: FieldValues;
};

const FormTable = (props: Props) => {
  const { data } = props;

  const schema = useSchema();
  if (!schema) return null;

  const {
    definitions: { widgets },
  } = schema;

  const renderRows = () => {
    const widgetIds = Object.keys(data);

    const renderValue = (value: unknown) => {
      switch (typeof value) {
        case "boolean": {
          return (
            <TableCell align="right">{value ? "true" : "false"}</TableCell>
          );
        }
        case "object": {
          return (
            <TableCell align="right">
              {(value as string[]).join(", ")}
            </TableCell>
          );
        }
        default: {
          // string and number
          return <TableCell align="right">{value as string}</TableCell>;
        }
      }
    };

    return widgetIds.map(widgetId => {
      const widgetValue = data[widgetId] as unknown;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const widget = widgets[widgetId] as FieldWidget;

      return (
        <TableRow
          key={widgetId}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {widget.properties.properties.label}
          </TableCell>

          {renderValue(widgetValue)}
        </TableRow>
      );
    });
  };

  return (
    <TableContainer sx={{ marginBottom: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Widget Label</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>{renderRows()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default FormTable;
