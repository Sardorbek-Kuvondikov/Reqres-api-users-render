// GET ALL DOM ELEMENTS
const elLoginPage = document.querySelector(".js-logon-page");
const elOpenEye = document.querySelector(".js-open-eye");
const elClosedEye = document.querySelector(".js-closed-eye");

const elLoginForm = document.querySelector(".js-login-form"),
  elLoginEmailnp = elLoginForm.querySelector(".js-email-inp"),
  elLoginPasswordInp = elLoginForm.querySelector(".js-password-inp");

const dataToken = JSON.parse(window.localStorage.getItem("token"));

if (dataToken) {
  window.location.pathname = "./src/index.html";
}

async function loginPost(emailValue, passwordValue) {
  try {
    const res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    });
    const data = await res.json();

    window.localStorage.setItem("token", JSON.stringify(data.token));

    if (data.token) {
      window.location.pathname = "./src/index.html";
    }
  } catch (error) {
    console.log(error);
  }
}

elLoginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const emailValue = elLoginEmailnp.value.trim();
  const passwordValue = elLoginPasswordInp.value.trim();

  loginPost(emailValue, passwordValue);
});

// PASSWORDNI KO'RINISHI VA KO'RINMASLIGI USERGA QULAY HOLATDA
elOpenEye.addEventListener("mousedown", () => {
  elLoginPasswordInp.type = "text";
});

elOpenEye.addEventListener("mouseup", () => {
  elLoginPasswordInp.type = "Password";
});

elOpenEye.addEventListener("mouseleave", () => {
  elLoginPasswordInp.type = "Password";
});
