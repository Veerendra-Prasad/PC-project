import {
  createNewComment,
  getDataById,
  randomId
} from "../database/database.js";

const urlData = new URLSearchParams(window.location.search).get("data");
const input = document.querySelector(".input");
const AuthorInput = document.querySelector(".input-author");
const button = document.querySelector(".button");

button.addEventListener("click", async () => {
  const parsedData = getDataById(urlData);
  const data = {
    id : randomId(),
    replying: parsedData.author,
    author: AuthorInput.value || "Anonymous",
    description: input.value,
  };
  const result = await createNewComment(data, urlData);
  if (result == "done") {
    window.location.href = "../index.html";
  } else if (result == "error") {
    alert("Error while creating a comment");
  }
});
