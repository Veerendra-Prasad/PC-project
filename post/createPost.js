import { createNewPost } from "../database/database.js";

const authorInput = document.querySelector(".input-author");
const titleInput = document.querySelector(".input-title");
const descInput = document.querySelector(".input-desc");
const button = document.querySelector(".button");

const url = new URLSearchParams(window.location.search).get("mode");
if (url != null) {
  if (url === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

export async function handleSubmit(event) {
  event.preventDefault();
  const key = new URLSearchParams(window.location.search).get("data");
  const data = {
    title: titleInput.value,
    description: descInput.value,
    author: authorInput.value,
    comments: [],
  };
  const result = await createNewPost(data, key);
  const url = new URLSearchParams(window.location.search).get('mode');
  if (result == "done") {
    window.location.href = `../index/index.html?mode=${url}`;
  } else if (result == "error") {
    alert("Error while creating a post");
  }
}

window.handleSubmit = handleSubmit;
