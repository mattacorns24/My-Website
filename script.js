// Render project cards from projects.json into #project-grid.

const grid = document.getElementById("project-grid");

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

function escapeHtml(str = "") {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function cardHtml(p) {
  const tags = (p.tags || [])
    .map((t) => `<span class="card__tag">${escapeHtml(t)}</span>`)
    .join("");

  const links = [];
  if (p.link) links.push(`<a href="${escapeHtml(p.link)}" target="_blank" rel="noopener">Live</a>`);
  if (p.repo) links.push(`<a href="${escapeHtml(p.repo)}" target="_blank" rel="noopener">Code</a>`);

  return `
    <article class="card">
      ${p.image ? `<img class="card__image" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" />` : ""}
      <h3 class="card__title">${escapeHtml(p.name || "Untitled")}</h3>
      <p class="card__desc">${escapeHtml(p.description || "")}</p>
      ${tags ? `<div class="card__tags">${tags}</div>` : ""}
      ${links.length ? `<div class="card__links">${links.join("")}</div>` : ""}
    </article>
  `;
}

async function loadProjects() {
  try {
    const res = await fetch("projects.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const projects = await res.json();

    if (!Array.isArray(projects) || projects.length === 0) {
      grid.innerHTML = `<p class="projects__empty">No projects yet — check back soon.</p>`;
      return;
    }

    grid.innerHTML = projects.map(cardHtml).join("");
  } catch (err) {
    grid.innerHTML = `<p class="projects__empty">Couldn't load projects. (${escapeHtml(err.message)})</p>`;
  }
}

loadProjects();
