import { createModel, createSchema } from "@ev-fns/mongo";

interface UrlProps {
  urlId: string;
  url?: string;
  requests: number;
  redirected: boolean;
}

export const Url = createModel<UrlProps>(
  "Url",
  createSchema(
    {
      urlId: {
        type: String,
        unique: true,
        required: true,
      },
      requests: {
        type: Number,
        required: true,
      },
      url: {
        type: String,
      },
      redirected: {
        type: Boolean,
        required: true,
      },
    },
    { timestamps: true },
  ),
  "urls",
);
