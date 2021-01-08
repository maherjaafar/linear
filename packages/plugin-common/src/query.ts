import { FieldDefinitionNode } from "graphql";
import c from "./constants";
import { getTypeName } from "./field";
import { Named, PluginContext } from "./types";

/**
 * Find a query that can return this field
 * */
export function findQuery<C>(
  context: PluginContext<C>,
  field: Named<FieldDefinitionNode> | FieldDefinitionNode
): FieldDefinitionNode | undefined {
  /** Ignore queries for connections */
  if (getTypeName(field.type).endsWith(c.CONNECTION_TYPE)) {
    return undefined;
  }

  const match = context.queries.find(q => {
    return (
      /** Matches name */
      // q.name.value === (field as FieldDefinitionNode).name?.value ?? field.name &&
      /** Matches return type */
      getTypeName(q.type) === getTypeName(field.type)
      // requiredArgs(q.arguments)?.find(a => a.name.value === c.ID_NAME)
      // /** Matches required arguments */
      // requiredArgs(q.arguments).every(a => a.name.value field.arguments.)
    );
  });

  return match;
}
