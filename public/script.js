/* eslint-disable */
window.addEventListener("load", () => {
  const form = document.querySelector("form");
  const input = document.querySelector("#url");
  const short = document.querySelector("#short");

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

    short.textContent = data.url;
  });
});
