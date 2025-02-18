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
      const url = new URLSearchParams(window.location.search).get("comment-id");
      if (url == null) {
        const new_url = new URL(window.location.href);
        new_url.searchParams.append("comment-id",this.getAttribute("comment-id"));
        window.history.replaceState(null,"",new_url.toString());
      } else {
        const new_url = new URL(window.location.href);
        new_url.searchParams.set("comment-id", this.getAttribute("comment-id"));
        window.history.replaceState(null,"",new_url.toString());
      }
    });
  }
}

window.customElements.define("comment-post", comment);
