/* eslint-disable */
window.addEventListener("load", () => {
  new ClipboardJS(".btn");

  const form = document.querySelector("form");
  const input = document.querySelector("#url");
  const short = document.querySelector("#short input");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch("/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ url: input.value }),
    });

    const data = await response.json();

    short.value = data.url;
  });
});
