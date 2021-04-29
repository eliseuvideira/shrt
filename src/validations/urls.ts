import Joi from "joi";

export const urlsPostOneBody = Joi.object()
  .keys({
    url: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required(),
  })
  .required();

export const urlsGetOneParams = Joi.object()
  .keys({
    urlId: Joi.string().required(),
  })
  .required();
