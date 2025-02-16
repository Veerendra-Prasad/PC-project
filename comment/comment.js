const templateContent = document.createElement("template");
templateContent.innerHTML = `
<link rel="stylesheet" href="../comment/comment.css" />
<div class="comment">
  <div class="comment-header">
    <span>
      <slot name="replying-to"/>
    </span>
    <span class="last-span">
      <slot name="author"/>
    </span>
  </div>
  <div class="comment-desc">
    <slot name="comment"/>
  </div>
</div>
`;

class comment extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateContent.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot.querySelector(".comment").addEventListener("click", () => {
      const url = new URLSearchParams(window.location.search).get("comment-data");
      const dataUrl = new URLSearchParams(window.location.search).get("data");
      if (url === null || !url.includes(this.getAttribute("comment-id"))) {
        const newUrl = `./index.html?data=${dataUrl}&comment-data=${this.getAttribute("comment-id")}`;
        window.history.pushState(null, "", newUrl);
      }
    });
  }
}

window.customElements.define("comment-post", comment);
