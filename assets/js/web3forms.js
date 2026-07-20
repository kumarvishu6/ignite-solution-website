/**
 * Web3Forms submission handler for the Ignite Digital contact form.
 * Replaces the template's PHP-based validate.js, which expected a plain
 * "OK" text response and would show a false "Failed" message otherwise.
 */
(function () {
  "use strict";

  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const loading = form.querySelector(".loading");
    const errorMessage = form.querySelector(".error-message");
    const sentMessage = form.querySelector(".sent-message");

    loading.classList.add("d-block");
    errorMessage.classList.remove("d-block");
    sentMessage.classList.remove("d-block");

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        loading.classList.remove("d-block");
        if (data.success) {
          sentMessage.classList.add("d-block");
          form.reset();
        } else {
          errorMessage.innerHTML = data.message || "Something went wrong. Please try again.";
          errorMessage.classList.add("d-block");
        }
      })
      .catch(() => {
        loading.classList.remove("d-block");
        errorMessage.innerHTML = "Something went wrong. Please check your connection and try again.";
        errorMessage.classList.add("d-block");
      });
  });
})();
