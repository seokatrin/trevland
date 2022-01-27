export const handleOnSubmit = () => {
  const form = document.querySelector(".footer__form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(JSON.stringify({ email: form.email.value }));
    form.email.value = "";
  });
};
