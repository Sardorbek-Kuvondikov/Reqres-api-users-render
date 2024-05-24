const dataToken = JSON.parse(window.localStorage.getItem("token"));

if (!dataToken) {
  window.location.pathname = "./src/login.html";
}

const elBackBtn = document.querySelector(".js-back-btn");
const elRenderList = document.querySelector(".js-users-render-list");
const elTemplate = document.querySelector(".js-template").content;

let BASE_URL = "https://reqres.in/api/users";

elBackBtn.addEventListener("click", () => {
  window.localStorage.removeItem("token");
  document.readyState;
  alert("Token delete!");
  window.location.reload();
});

// DATA RENDER LIST
function renderListUsers(arr, node) {
  node.innerHTML = "";
  const docFrg = document.createDocumentFragment();
  arr.forEach((item) => {
    const clone = elTemplate.cloneNode(true);

    clone.querySelector(".js-user-img").src = item.avatar;
    clone.querySelector(".js-user-img").alt = item.first_name;
    clone.querySelector(
      ".js-user-first-name"
    ).textContent = `${item.first_name}, ${item.last_name}`;
    clone.querySelector(".js-user-email").textContent = item.email;
    clone.querySelector(".js-user-email").href = `mailto:${item.email}`;
    clone.querySelector(".js-user-id").textContent = item.id;

    docFrg.appendChild(clone);
  });
  node.appendChild(docFrg);
}

async function getData(url) {
  try {
    const res = await fetch(url);
    const users = await res.json();
    const data = users.data;
    renderListUsers(data, elRenderList);
  } catch (error) {
    console.log(error);
  }
}
getData(BASE_URL);
