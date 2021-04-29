import { body, params } from "@ev-fns/validation";
import { Router } from "express";
import { urlsPostOne, urlsGetOne } from "../endpoints/urls";
import { urlsPostOneBody, urlsGetOneParams } from "../validations/urls";

const router = Router();

/**
 * POST /u
 * @tag urls
 * @bodyContent {UrlPostOneRequestBody} application/json
 * @response 201
 * @responseContent {UrlPostOneResponseBody} 201.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/u", body(urlsPostOneBody), urlsPostOne);

/**
 * GET /u/{urlId}
 * @tag urls
 * @pathParam {integer} urlId
 * @response 307
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get("/u/:urlId", params(urlsGetOneParams), urlsGetOne);

export default router;
