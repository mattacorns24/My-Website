// Render a single project's detail page from projects/<slug>.json.

const container = document.getElementById("project-detail");

document.getElementById("year").textContent = new Date().getFullYear();

function escapeHtml(str = "") {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function imageOrPlaceholder(src, alt) {
  if (src) {
    return `<img class="part__image" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" />`;
  }
  return `<div class="part__image part__image--placeholder">Screenshot coming soon</div>`;
}

function partHtml(part, i) {
  return `
    <section class="part ${i % 2 ? "part--reverse" : ""}">
      <div class="part__media">${imageOrPlaceholder(part.image, part.title || "")}</div>
      <div class="part__body">
        <h2 class="part__title">${escapeHtml(part.title || "")}</h2>
        <p class="part__desc">${escapeHtml(part.description || "")}</p>
      </div>
    </section>
  `;
}

function render(p) {
  document.title = `${p.name || "Project"} — Matthew Akins`;

  const tags = (p.tags || [])
    .map((t) => `<span class="card__tag">${escapeHtml(t)}</span>`)
    .join("");

  const links = (p.links || [])
    .filter((l) => l.url)
    .map((l) => `<a class="detail-link" href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.label || "Link")}</a>`)
    .join("");

  const parts = (p.parts || []).map(partHtml).join("");

  container.innerHTML = `
    <header class="detail-hero">
      <h1 class="detail-hero__title">${escapeHtml(p.name || "Untitled")}</h1>
      ${p.summary ? `<p class="detail-hero__summary">${escapeHtml(p.summary)}</p>` : ""}
      ${tags ? `<div class="card__tags">${tags}</div>` : ""}
      ${links ? `<div class="detail-hero__links">${links}</div>` : ""}
      ${p.hero ? `<img class="detail-hero__image" src="${escapeHtml(p.hero)}" alt="${escapeHtml(p.name || "")}" />` : ""}
    </header>
    ${parts ? `<div class="parts">${parts}</div>` : ""}
  `;
}

function renderMessage(msg) {
  container.innerHTML = `<p class="projects__empty">${escapeHtml(msg)}</p>`;
}

async function load() {
  const slug = new URLSearchParams(location.search).get("slug");
  if (!slug || !/^[a-z0-9-]+$/i.test(slug)) {
    renderMessage("Project not found.");
    return;
  }

  try {
    const res = await fetch(`projects/${slug}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    render(await res.json());
  } catch (err) {
    renderMessage(`Couldn't load this project. (${err.message})`);
  }
}

load();
