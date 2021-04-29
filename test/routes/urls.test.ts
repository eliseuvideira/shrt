import "../fixture";

import { request } from "../request";

const SIMULTANEOUS_REQUESTS = 100;

describe("urls", () => {
  it("works concurrently", async () => {
    expect.assertions(22);

    const urls = [];
    for (let i = 0; i < 10; i += 1) {
      const response = await request()
        .post("/u")
        .send({ url: "https://www.youtube.com" });

      expect(response.status).toBe(201);
      expect(response.body.url).toBeDefined();
      urls.push(response.body.url);
    }

    const statusses: number[] = await Promise.all(
      (urls as any).flatMap((url: any) =>
        new Array(SIMULTANEOUS_REQUESTS).fill(null).map(async () => {
          const u = new URL(url);
          const response = await request().get(u.pathname);
          return response.status;
        }),
      ),
    );

    const ok = statusses.filter((s) => s === 307);
    const notOk = statusses.filter((s) => s === 410);

    expect(ok.length).toBe(10);
    expect(notOk.length).toBe(10 * SIMULTANEOUS_REQUESTS - 10);
  }, 60000);
});
