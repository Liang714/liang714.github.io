import { esc, evidenceText, icons } from './content.mjs'

export function renderC(d) {
  const { site } = d
  const nav = [
    ['projects', 'Projects'],
    ['stack', 'Stack'],
    ['record', 'Record'],
    ['contact', 'Contact'],
  ]
    .map(([id, label]) => `<li><a data-nav href="#${id}">${label}</a></li>`)
    .join('')

  const projects = d.projects
    .map(
      (p, i) => `
      <li class="project" data-reveal style="--d:${i * 70}ms">
        <div class="project__main">
          <h3><a class="project__link" href="${p.href}">${esc(p.title)}</a></h3>
          <p>${esc(p.line)}</p>
          <p class="project__meta">${p.tags.map(esc).join(', ')}<span class="sep" aria-hidden="true"> / </span><span class="state">${esc(p.status.text)}</span><span class="sep" aria-hidden="true"> / </span>${esc(p.repo)}</p>
        </div>
        <span class="project__go" aria-hidden="true">${icons.arrow(22)}</span>
      </li>`,
    )
    .join('')

  const stack = d.stack
    .map(
      (g) => `
      <div class="group" data-reveal>
        <h3>${esc(g.title)}</h3>
        <ul>${g.items.map((it) => `<li class="is-${it.evidence}"><span class="mark mark--${it.evidence}" aria-hidden="true"></span>${esc(it.name)}</li>`).join('')}</ul>
      </div>`,
    )
    .join('')

  const rows = d.record
    .map(
      (r) => `<li><span class="when">${esc(r.date || '—')}</span><div><strong>${esc(r.title)}</strong><span>${esc(r.detail)}</span></div></li>`,
    )
    .join('')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Preview C: Plain grid</title>
  <link rel="icon" href="data:," />
  <script>document.documentElement.classList.add('js')</script>
  <link rel="stylesheet" href="./c.css" />
  <script type="module" src="./c.js"></script>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="bar">
    <div class="bar__in">
      <a class="brand" href="#top">${esc(site.name)}</a>
      <nav aria-label="Primary"><ul>${nav}</ul></nav>
    </div>
    <span class="progress" aria-hidden="true"></span>
  </header>

  <main id="main">
    <section id="top" class="sec hero" tabindex="-1">
      <div class="sec__side"><p class="who"><strong>${esc(site.name)}</strong>${esc(site.role)}, ${esc(d.status.toLowerCase())}</p></div>
      <div class="sec__body">
        <h1>${esc(d.headline)}</h1>
        <div class="hero__cols">
          <div>
            <p class="lede">${esc(d.background)}</p>
            <p class="actions"><a class="textlink" href="#projects">See my projects ${icons.arrow(18)}</a><a class="textlink" href="${d.links.about}">More about me ${icons.arrow(18)}</a></p>
          </div>
          <div class="hero__facts">
            <h2 class="h-small">Interests</h2>
            <ul class="interests">${d.interests.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          </div>
        </div>
        <dl class="facts">
          <div><dt>Education</dt><dd>${esc(d.education)}</dd></div>
          <div><dt>Studied in</dt><dd>${d.studiedIn.map(esc).join(', ')}</dd></div>
        </dl>
      </div>
    </section>

    <section id="projects" class="sec" aria-labelledby="projects-title" tabindex="-1">
      <div class="sec__side"><h2 id="projects-title">Projects</h2></div>
      <div class="sec__body">
        <p class="intro" data-reveal>Three projects. Each opens on its own page with the full detail, the results and their limits.</p>
        <ul class="projects">${projects}</ul>
      </div>
    </section>

    <section id="stack" class="sec" aria-labelledby="stack-title" tabindex="-1">
      <div class="sec__side"><h2 id="stack-title">Technical stack</h2></div>
      <div class="sec__body">
        <ul class="legend" aria-label="Legend" data-reveal>${Object.entries(evidenceText).map(([k, v]) => `<li><span class="mark mark--${k}" aria-hidden="true"></span>${v}</li>`).join('')}</ul>
        <div class="groups">${stack}</div>
        <p class="more" data-reveal><a class="textlink" href="${d.links.stack}">Where each one was used ${icons.arrow(18)}</a></p>
      </div>
    </section>

    <section id="record" class="sec" aria-labelledby="record-title" tabindex="-1">
      <div class="sec__side"><h2 id="record-title">Record</h2></div>
      <div class="sec__body">
        <p class="intro" data-reveal>Education and independent projects, newest first. Dates come from commit history.</p>
        <ol class="events" data-reveal>${rows}</ol>
        <p class="more" data-reveal><a class="textlink" href="${d.links.record}">Full record, ${d.recordCount} entries ${icons.arrow(18)}</a></p>
      </div>
    </section>

    <section id="contact" class="sec contact" aria-labelledby="contact-title" tabindex="-1">
      <div class="sec__side"><h2 id="contact-title">Contact</h2></div>
      <div class="sec__body">
        <p class="intro" data-reveal>If you build intelligent systems and care how they fail, I’d like to hear about it.</p>
        <p class="mail" data-reveal><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
        <ul class="elsewhere" data-reveal>
          <li><a class="textlink" href="${esc(site.github)}" target="_blank" rel="noopener noreferrer">GitHub ${icons.external(16)}</a></li>
          <li><a class="textlink" href="${esc(site.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ${icons.external(16)}</a></li>
        </ul>
      </div>
    </section>
  </main>
  <footer class="foot"><p>© 2026 ${esc(site.name)}</p></footer>
</body>
</html>
`
}
