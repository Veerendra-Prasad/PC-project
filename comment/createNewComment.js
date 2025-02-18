import {
  createNewComment,
  getDataById,
  randomId,
} from "../database/database.js";

const urlData = new URLSearchParams(window.location.search).get("data");
const input = document.querySelector(".input");
const AuthorInput = document.querySelector(".input-author");
const button = document.querySelector(".button");

const url = new URLSearchParams(window.location.search).get("mode");
if (url != null) {
  if (url === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

button.addEventListener("click", async () => {
  const parsedData = getDataById(urlData);
  const data = {
    id: randomId(),
    replying: parsedData.author,
    author: AuthorInput.value || "Anonymous",
    description: input.value,
  };
  const result = await createNewComment(data, urlData);
  const url = new URLSearchParams(window.location.search).get('mode');
  if (result == "done") {
    window.location.href = `../index/index.html?mode=${url}`;
  } else if (result == "error") {
    alert("Error while creating a comment");
  }
});
