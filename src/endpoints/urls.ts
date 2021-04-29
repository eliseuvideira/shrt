import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";

export const urlsPostOne = endpoint(async () => {
  throw new HttpError(501, "Not implemented");
});

export const urlsGetOne = endpoint(async () => {
  throw new HttpError(501, "Not implemented");
});
