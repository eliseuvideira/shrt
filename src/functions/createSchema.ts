import {
  Document,
  DocumentDefinition,
  Model,
  Schema,
  SchemaDefinition,
  SchemaOptions,
} from "mongoose";

export const createSchema = <T>(
  schema?: SchemaDefinition<DocumentDefinition<T & Document>>,
  options?: SchemaOptions,
) => new Schema<T & Document, Model<T & Document>>(schema, options);
