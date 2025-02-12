import { createNewPost } from "../database/database.js";

const authorInput = document.querySelector(".input-author");
const titleInput = document.querySelector(".input-title");
const descInput = document.querySelector(".input-desc");
const button = document.querySelector(".button");

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
  if (result == "done") {
    window.location.href = "../index.html";
  } else if (result == "error") {
    alert("Error while creating a post");
  }
}

window.handleSubmit = handleSubmit;
