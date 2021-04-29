import { endpoint } from "@ev-fns/endpoint";
import { nanoid } from "nanoid";
import { Url } from "../models/Url";

export const urlsPostOne = endpoint(async (req, res) => {
  const { url: urlStr } = req.body;

  const urlId = nanoid(10);

  await Url.create({
    urlId,
    url: urlStr,
    requests: 0,
    redirected: false,
  });

  const url = new URL(process.env.API_URL || "");
  url.pathname = `/${urlId}`;

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
    return res.redirect(307, url.url || "");
  }

  url = await Url.findOneAndUpdate({ urlId }, { $inc: { requests: 1 } });

  if (url) {
    return res.status(410).render("pages/gone", { requests: url.requests });
  }

  return res.status(404).render("pages/not-found");
});
