const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="./post/post.css" />
  <div class="post">
    <span><slot name="author"/></span>
    <div class="title-section">
      <div class="title">
        <slot name="title"/>
      </div>
      <button class="button">🔽</button>
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

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector(".button").addEventListener("click", () => {
      let extendState = this.shadowRoot
        .querySelector(".description")
        .classList.toggle("show");
      if (extendState) {
        this.shadowRoot.querySelector(".button").innerHTML = "🔼";
      } else {
        this.shadowRoot.querySelector(".button").innerHTML = "🔽";
      }
    });
  }
  connectedCallback() {
    this.shadowRoot.querySelector(".post").addEventListener("click", () => {
      const url = new URLSearchParams(window.location.search).get("data");
      if( url === null || !url.includes(this.getAttribute("data-id"))){
        const newUrl = `./index.html?data=${this.getAttribute("data-id")}`;
        window.history.pushState(null, "", newUrl);
      }
    });
  }
}

window.customElements.define("blog-post", post);
