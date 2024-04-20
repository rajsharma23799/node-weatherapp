//Client Side JS

console.log("Client Side JS loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#messageOne");
const message2 = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  message1.textContent = "Loading.....";
  message2.textContent = "";

  fetch(`/weather?location=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.err) {
        message1.textContent = `Error: ${data.err}`;
        message2.textContent = "";
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast;
      }
    });
  });
});
