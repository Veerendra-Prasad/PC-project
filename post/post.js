const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="../post/post.css" />
  <div class="post">
    <span><slot name="author"/></span>
    <div class="title-section">
      <div class="title">
        <slot name="title"/>
      </div>
      <button class="button"><i class="material-icons">arrow_drop_down</i></button>
    </div>
    <div class="description hide">
      <slot name="description"/>
    </div>
  </div>
`;

class post extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const drop_down = "arrow_drop_down";
    const drop_up = "arrow_drop_up";

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector(".button").addEventListener("click", () => {
      let extendState = this.shadowRoot
        .querySelector(".description")
        .classList.toggle("show");
      if (extendState) {
        this.shadowRoot.querySelector(".material-icons").innerText = drop_up;
      } else {
        this.shadowRoot.querySelector(".material-icons").innerText = drop_down;
      }
    });
  }
  connectedCallback() {
    this.shadowRoot.querySelector(".post").addEventListener("click", () => {
      const url = new URLSearchParams(window.location.search).get("data");
      if (url === null || !url.includes(this.getAttribute("data-id"))) {
        const newUrl = `./index.html?data=${this.getAttribute("data-id")}`;
        window.history.pushState(null, "", newUrl);
      }
    });
  }
}

window.customElements.define("blog-post", post);
