import { Document, model, Model, Schema } from "mongoose";

export const createModel = <T>(
  name: string,
  schema: Schema<T & Document, Model<T & Document>>,
  collection?: string,
) => model(name, schema, collection);
