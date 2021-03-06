import { body, params } from "@ev-fns/validation";
import { Router } from "express";
import { urlsPostOne, urlsGetOne } from "../endpoints/urls";
import { urlsPostOneBody, urlsGetOneParams } from "../validations/urls";

const router = Router();

/**
 * POST /
 * @tag urls
 * @bodyContent {UrlPostOneBody} application/json
 * @response 201
 * @responseContent {UrlPostOneBody} 201.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/", body(urlsPostOneBody), urlsPostOne);

/**
 * GET /{urlId}
 * @tag urls
 * @pathParam {string} urlId
 * @response 307
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get("/:urlId", params(urlsGetOneParams), urlsGetOne);

export default router;
