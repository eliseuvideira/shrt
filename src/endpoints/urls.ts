import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";
import { nanoid } from "nanoid";
import { Url } from "../models/Url";

export const urlsPostOne = endpoint(async (req, res) => {
  const { url: urlStr } = req.body;

  const urlId = nanoid();

  await Url.create({
    urlId,
    url: urlStr,
    requests: 0,
    redirected: false,
  });

  const url = new URL(process.env.API_URL || "");
  url.pathname = `/u/${urlId}`;

  res.status(201).json({ url: url.toString() });
});

export const urlsGetOne = endpoint(async (req, res) => {
  const { urlId } = req.params;

  let url = await Url.findOneAndUpdate(
    { urlId, redirected: false, requests: 0 },
    { redirected: true, requests: 1 },
  );

  if (url) {
    await Url.findOneAndUpdate({ urlId }, { $unset: { url: 1 } });
    return res.status(307).redirect(url.url || "");
  }

  url = await Url.findOneAndUpdate({ urlId }, { $inc: { requests: 1 } });

  if (url) {
    throw new HttpError(410, "Gone");
  }

  throw new HttpError(404, "Not Found");
});
