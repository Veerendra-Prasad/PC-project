import {
  getData,
  randomId,
  deleteCommentById,
  deletePostById,
  initializeDatabase,
} from "../database/database.js";

const comment_container = document.querySelector(".comment-container");
const user_post = document.querySelector(".posts-container");
const create_post = document.querySelector(".create-post");
const create_comment = document.querySelector(".create-comment");
const delete_post = document.querySelector(".delete-post");
const delete_comment = document.querySelector(".delete-comment");

create_comment.style.display = "none";
delete_comment.style.display = "none";
delete_post.style.display = "none";

create_post.addEventListener("click", () => {
  const item_id = randomId();
  window.location.href = `../post/post.html?data=${item_id}`;
});

create_comment.addEventListener("click", () => {
  const item_id = new URLSearchParams(window.location.search).get("data");
  window.location.href = `../comment/comment.html?data=${item_id}`;
});

delete_post.addEventListener("click", async () => {
  const data_id = new URLSearchParams(window.location.search).get("data");
  const result = await deletePostById(data_id);
  if (result == "done") {
    window.location.href = `./index.html`;
  } else if (result == "error") {
    alert("Error while deleting post");
  }
});

delete_comment.addEventListener("click", async () => {
  const comment_id = new URLSearchParams(window.location.search).get(
    "comment-data"
  );
  const data_id = new URLSearchParams(window.location.search).get("data");
  const result = await deleteCommentById(data_id, comment_id);
  if (result == "done") {
    window.location.href = `./index.html?data=${data_id}`;
  } else if (result == "error") {
    alert("Error while deleting comment");
  }
});

initializeDatabase();

getData().map((item) => {
  Object.entries(item).map(([key, value]) => {
    const blog_post = document.createElement("blog-post");
    blog_post.setAttribute("data-id", key);
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
    span1.innerHTML = value.title;
    span1.setAttribute("slot", "title");
    span2.innerHTML = value.author;
    span2.setAttribute("slot", "author");
    span3.innerHTML = value.description;
    span3.setAttribute("slot", "description");
    blog_post.append(span1, span2, span3);
    blog_post.addEventListener("click", (e) => {
      e.preventDefault();
      comment_container.innerHTML = "";
      create_comment.style.display = "block";
      delete_post.style.display = "block";
      create_comments(value.comments, key);
    });
    user_post.appendChild(blog_post);
  });
});

function create_comments(comments) {
  if (comments.length === 0) {
    const comment = document.createElement("comment-post");
    const span1 = document.createElement("span");
    span1.innerHTML = "No comments to display";
    span1.setAttribute("slot", "comment");
    comment.append(span1);
    comment_container.append(comment);
    return;
  }
  comments.map((item) => {
    const comment = document.createElement("comment-post");
    comment.setAttribute("comment-id", item.id);
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
    span1.innerHTML = item.replying;
    span1.setAttribute("slot", "replying-to");
    span2.innerHTML = item.author;
    span2.setAttribute("slot", "author");
    span3.innerHTML = item.description;
    span3.setAttribute("slot", "comment");
    comment.append(span1, span2, span3);
    comment.addEventListener("click", () => {
      delete_comment.style.display = "block";
    });
    comment_container.append(comment);
  });
}

const toggleSwitch = document.getElementById("toggleSwitch");

toggleSwitch.addEventListener("change", function () {
  if (this.checked) {
    const urlInBrowser = new URLSearchParams(window.location.search).get(
      "mode"
    );
    const url = new URL(window.location.href);
    if (urlInBrowser == null) {
      document.documentElement.setAttribute("data-theme", "dark");
      let updatedUrl = `${url}?&mode=dark`;
      window.history.pushState({ path: updatedUrl }, "", updatedUrl);
    } else if(urlInBrowser === "light"){
      url.searchParams.set('mode','dark');
      document.documentElement.setAttribute("data-theme", "dark");
      let updatedUrl = url.toString();
      window.history.pushState({ path: updatedUrl }, "", updatedUrl);
    }
  } else {
    const urlInBrowser = new URLSearchParams(window.location.search).get(
      "mode"
    );
    const url = new URL(window.location.href);
    if (urlInBrowser == null) {
      document.documentElement.setAttribute("data-theme", "light");
      let updatedUrl = `${url}?&mode=light`;
      window.history.pushState({ path: updatedUrl }, "", updatedUrl);
    } else if(urlInBrowser === "dark"){
      document.documentElement.setAttribute("data-theme", "light");
      url.searchParams.set('mode','light');
      let updatedUrl = url.toString();
      window.history.pushState({ path: updatedUrl }, "", updatedUrl);
    }
  }
});
