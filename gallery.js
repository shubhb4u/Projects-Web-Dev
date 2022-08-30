const backBtn = document.querySelector(".back");
backBtn.addEventListener("click", () => {

  // Relative path on back button to take us to gallery
  location.assign("./index.html");
});