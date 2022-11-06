document
  .getElementById("name")
  .addEventListener("input", function(e) {
    document
      .getElementById("res-name")
      .innerText = e.target.value;
});

document
  .getElementById("gender")
  .addEventListener("change", function(e) {
    document
      .getElementById("res-gender")
      .innerText = e.target.value;
});

document
  .getElementById("result")
  .addEventListener("mousemove", function(e) {
    document
      .getElementById("mouse-x")
      .innerText = e.offsetX;
    document
      .getElementById("mouse-y")
      .innerText = e.offsetY;
});