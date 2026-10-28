// Builds the cards from content.js. You don't need to edit this file.

(function () {
  const data = window.PORTFOLIO || (typeof PORTFOLIO !== "undefined" ? PORTFOLIO : { caseStudies: [], projects: [] });
  const cases = data.caseStudies || [];
  const projects = data.projects || [];

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const bold = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  const tint = (i) => "t" + ((i % 6) + 1);
  const plural = (n, one, many) => n + " " + (n === 1 ? one : many);

  const icons = {
    notebook: '<rect x="2.5" y="1.5" width="11" height="13" rx="1.5"/><path d="M5 5h6M5 8h6M5 11h3"/>',
    dashboard: '<rect x="1.5" y="2.5" width="13" height="11" rx="1.5"/><path d="M4.5 10.5v-2M8 10.5v-5M11.5 10.5v-3.5"/>',
    deck: '<rect x="1.5" y="2.5" width="13" height="9" rx="1.5"/><path d="M8 11.5v2.5M5 14h6"/>',
    model: '<circle cx="4" cy="4" r="1.8"/><circle cx="12" cy="4" r="1.8"/><circle cx="8" cy="12" r="1.8"/><path d="M5.5 5.2 7 10.4M10.5 5.2 9 10.4M5.8 4h4.4"/>',
    report: '<path d="M4 1.5h5.5l3 3v10H4z"/><path d="M9.5 1.5v3h3M6 8h4.5M6 11h4.5"/>',
    sql: '<path d="M5.5 4 2 8l3.5 4M10.5 4 14 8l-3.5 4"/>',
  };
  const icon = (name) =>
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4">' +
    (icons[String(name).toLowerCase()] || icons.report) + "</svg>";

  const media = (item, i, tag) =>
    `<${tag} class="media ${tint(i)}" ${tag === "a" ? `href="${esc(item.page || "#")}"` : ""} data-mark="${esc(item.title)}">` +
    (item.image ? `<img src="${esc(item.image)}" alt="" data-fallback>` : "") +
    `</${tag}>`;

  // ---- Case study list ----
  const caseList = document.getElementById("case-list");
  if (caseList) {
    caseList.innerHTML = cases.length
      ? cases.map((c, i) => `
        <article class="case">
          ${media(c, i, "a")}
          <div class="body">
            ${c.label ? `<p class="label">${esc(c.label)}</p>` : ""}
            <h3><a href="${esc(c.page || "#")}">${esc(c.title)}</a></h3>
            ${c.finding ? `<p class="finding">${bold(c.finding)}</p>` : ""}
            ${c.artefact ? `<span class="artefact">${icon(c.artefact)}${esc(c.artefact)}</span>` : ""}
            <div class="actions">
              ${c.page ? `<a class="arrow-link" href="${esc(c.page)}">Read case study</a>` : ""}
              ${c.artefactLink ? `<a class="arrow-link ext" href="${esc(c.artefactLink)}" target="_blank" rel="noopener">Open ${esc((c.artefact || "artefact").toLowerCase())}</a>` : ""}
            </div>
          </div>
        </article>`).join("")
      : `<p class="empty">No case studies yet.</p>`;
  }

  // ---- Project list ----
  const projectList = document.getElementById("project-list");
  if (projectList) {
    projectList.innerHTML = projects.length
      ? projects.map((p, i) => {
          const live = String(p.status || "").toLowerCase() === "live";
          return `
        <article class="tile">
          ${media(p, i, "a")}
          <div class="meta">
            <div class="row"><h3><a href="${esc(p.page || "#")}">${esc(p.title)}</a></h3>${p.status ? `<span class="tag${live ? " live" : ""}">${esc(p.status)}</span>` : ""}</div>
            ${p.summary ? `<p>${esc(p.summary)}</p>` : ""}
            <div class="actions">
              ${p.liveLink ? `<a class="arrow-link ext" href="${esc(p.liveLink)}" target="_blank" rel="noopener">Live</a>` : ""}
              ${p.codeLink ? `<a class="arrow-link ext" href="${esc(p.codeLink)}" target="_blank" rel="noopener">Code</a>` : ""}
            </div>
          </div>
        </article>`;
        }).join("")
      : `<div class="empty query">
          <div class="bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>query.sql</div>
          <p><span class="cmd">SELECT * FROM projects;</span>→ 0 rows returned. Still cooking, check back soon.<span class="cursor" aria-hidden="true"></span></p>
        </div>`;
  }

  // ---- Counts on the homepage tiles ----
  document.querySelectorAll("[data-count]").forEach((el) => {
    const key = el.dataset.count;
    if (key !== "caseStudies" && !projects.length) {
      el.classList.add("soon");
      el.innerHTML = '<i class="pulse"></i>Coming soon';
      return;
    }
    el.textContent = key === "caseStudies"
      ? plural(cases.length, "case study", "case studies")
      : plural(projects.length, "project", "projects");
  });

  // ---- Missing images: show the placeholder instead ----
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    const drop = () => img.remove();
    if (img.complete && img.naturalWidth === 0) drop();
    else img.addEventListener("error", drop);
  });

  // ---- Copy email ----
  const copyBtn = document.getElementById("copy-email");
  const emailEl = document.getElementById("email");
  if (copyBtn && emailEl) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(emailEl.textContent.trim());
        copyBtn.textContent = "Copied";
      } catch {
        const r = document.createRange();
        r.selectNodeContents(emailEl);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        copyBtn.textContent = "Selected";
      }
      setTimeout(() => (copyBtn.textContent = "Copy"), 1800);
    });
  }
})();
