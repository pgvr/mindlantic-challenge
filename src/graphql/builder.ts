import SchemaBuilder from "@giraphql/core";
import ValidationPlugin from "@giraphql/plugin-validation";
import { IncomingMessage, OutgoingMessage } from "http";

export interface Context {
  req: IncomingMessage;
  res: OutgoingMessage;
}

export function createGraphQLContext(
  req: IncomingMessage,
  res: OutgoingMessage
): Context {
  return {
    req,
    res,
  };
}

export const builder = new SchemaBuilder<{
  // We change the defaults for arguments to be `required`. Any non-required
  // argument can be set to `required: false`.
  DefaultInputFieldRequiredness: true;
  Context: Context;
  Scalars: {
    // We modify the types for the `ID` type to denote that it's always a string when it comes in.
    ID: { Input: string; Output: string };
    DateTime: { Input: Date; Output: Date };
  };
}>({
  defaultInputFieldRequiredness: true,
  plugins: [ValidationPlugin],
});

// This initializes the query and mutation types so that we can add fields to them dynamically:
builder.queryType({});
builder.mutationType({});

// Provide the custom DateTime scalar that allows dates to be transmitted over GraphQL:
builder.scalarType("DateTime", {
  serialize: (date: any) => date.toISOString(),
  parseValue: (date: any) => {
    return new Date(date);
  },
});
