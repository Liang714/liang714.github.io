import { esc, evidenceText, icons } from './content.mjs'

const glyph = {
  green: '<svg class="g" viewBox="0 0 56 56" width="18" height="18" aria-hidden="true"><rect x="4" y="4" width="48" height="48" rx="9" fill="#0e7a55"/><path d="M15 29l9 9 17-20" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  yellow:
    '<svg class="g" viewBox="0 0 56 56" width="18" height="18" aria-hidden="true"><path d="M28 5L52 48H4z" fill="#ffc20e" stroke="#0c0f10" stroke-width="4" stroke-linejoin="round"/><path d="M28 20v14" stroke="#0c0f10" stroke-width="6" stroke-linecap="round"/><circle cx="28" cy="41" r="2.8" fill="#0c0f10"/></svg>',
  neutral:
    '<svg class="g" viewBox="0 0 56 56" width="18" height="18" aria-hidden="true"><rect x="6" y="6" width="44" height="44" rx="9" fill="none" stroke="#55616a" stroke-width="3" stroke-dasharray="5 4"/></svg>',
}
const evidenceGlyph = { used: glyph.green, building: glyph.yellow, earlier: glyph.neutral }

export function renderA(d) {
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
      <li class="row" data-reveal style="--d:${i * 80}ms">
        <div class="row__main">
          <h3><a class="row__link" href="${p.href}">${esc(p.title)}</a></h3>
          <p>${esc(p.line)}</p>
        </div>
        <div class="row__meta">
          <ul class="plates" aria-label="Technologies">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          <p class="status">${glyph[p.status.tone]}<span>${esc(p.status.text)}</span><span class="dot" aria-hidden="true">·</span><span class="repo">${esc(p.repo)}</span></p>
        </div>
        <span class="btn btn--row" aria-hidden="true"><span class="btn__label">Details</span><span class="btn__arrow">${icons.arrow(20)}</span></span>
      </li>`,
    )
    .join('')

  const stack = d.stack
    .map(
      (g) => `
      <section class="group" aria-labelledby="g-${esc(g.title.replace(/\W+/g, '-'))}" data-reveal>
        <h3 id="g-${esc(g.title.replace(/\W+/g, '-'))}">${esc(g.title)}</h3>
        <ul>${g.items.map((it) => `<li>${evidenceGlyph[it.evidence]}<span>${esc(it.name)}</span></li>`).join('')}</ul>
      </section>`,
    )
    .join('')

  const rev = d.record
    .map(
      (r) => `
      <tr><th scope="row" class="rev">${esc(r.rev)}</th><td class="date">${esc(r.date || '—')}</td><td><strong>${esc(r.title)}</strong><span>${esc(r.detail)}</span></td></tr>`,
    )
    .join('')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Preview A: Gantry, calmer</title>
  <link rel="icon" href="data:," />
  <script>document.documentElement.classList.add('js')</script>
  <link rel="stylesheet" href="./a.css" />
  <script type="module" src="./a.js"></script>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="band">
    <div class="wrap band__in">
      <a class="brand" href="#top"><svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><rect width="32" height="32" rx="7" fill="#f3f6f4"/><rect x="3.5" y="3.5" width="25" height="25" rx="4" fill="none" stroke="#0c0f10" stroke-width="2"/><path d="M11.5 8.5v14h9.5" fill="none" stroke="#0c0f10" stroke-width="4.2" stroke-linecap="square"/></svg><span>${esc(site.name)}</span></a>
      <nav aria-label="Primary"><ul>${nav}</ul></nav>
    </div>
  </header>
  <div class="route" aria-hidden="true"><span class="route__marker"></span></div>

  <main id="main">
    <section id="top" class="hero" tabindex="-1">
      <div class="wrap hero__grid">
        <div class="hero__lead">
          <h1>${esc(d.headline)}</h1>
          <p class="plate">${esc(site.name)} <span aria-hidden="true">/</span> ${esc(site.role)}</p>
        </div>
        <div class="gantry">
          <div class="beam" aria-hidden="true"></div><span class="rod rod--l" aria-hidden="true"></span><span class="rod rod--r" aria-hidden="true"></span>
          <div class="sign hero-sign">
            <h2 class="visually-hidden">Background</h2>
            <p class="lede">${esc(d.background)}</p>
            <dl class="facts">
              <div><dt>Education</dt><dd>${esc(d.education)}</dd></div>
              <div><dt>Now</dt><dd>${esc(d.status)}</dd></div>
              <div><dt>Studied in</dt><dd>${d.studiedIn.map(esc).join(', ')}</dd></div>
            </dl>
            <h3 class="small">Interests</h3>
            <ul class="plates plates--on-face">${d.interests.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
            <div class="actions">
              <a class="btn" href="#projects"><span class="btn__label">Projects</span><span class="btn__arrow">${icons.arrow(20)}</span></a>
              <a class="btn btn--secondary" href="${d.links.about}"><span class="btn__label">About me</span><span class="btn__arrow">${icons.arrow(20)}</span></a>
            </div>
          </div>
        </div>
      </div>
      <a class="cue" href="#projects"><span class="cue__line" aria-hidden="true"></span>Scroll</a>
    </section>

    <section id="projects" class="block" aria-labelledby="projects-title" tabindex="-1">
      <div class="wrap">
        <header class="head" data-reveal>
          <h2 id="projects-title">Projects</h2>
          <p>Three projects. Each opens on its own page with the full detail, the results and their limits.</p>
        </header>
        <ul class="rows">${projects}</ul>
      </div>
    </section>

    <section id="stack" class="block block--alt" aria-labelledby="stack-title" tabindex="-1">
      <div class="wrap">
        <header class="head" data-reveal>
          <h2 id="stack-title">Technical stack</h2>
          <p>What I use, marked by whether a project here shows it.</p>
        </header>
        <ul class="legend" aria-label="Legend">${Object.entries(evidenceText).map(([k, v]) => `<li>${evidenceGlyph[k]}${v}</li>`).join('')}</ul>
        <div class="groups">${stack}</div>
        <p class="more" data-reveal><a class="link" href="${d.links.stack}">Where each one was used ${icons.arrow(18)}</a></p>
      </div>
    </section>

    <section id="record" class="block" aria-labelledby="record-title" tabindex="-1">
      <div class="wrap">
        <header class="head" data-reveal>
          <h2 id="record-title">Record</h2>
          <p>Education and independent projects, newest first. Dates come from commit history.</p>
        </header>
        <table class="revisions" data-reveal>
          <caption class="visually-hidden">Record, newest first</caption>
          <tbody>${rev}</tbody>
        </table>
        <p class="more" data-reveal><a class="link" href="${d.links.record}">Full record, ${d.recordCount} entries ${icons.arrow(18)}</a></p>
      </div>
    </section>

    <section id="contact" class="block contact" aria-labelledby="contact-title" tabindex="-1">
      <div class="wrap">
        <div class="gantry gantry--end" data-reveal>
          <div class="beam" aria-hidden="true"></div><span class="rod rod--l" aria-hidden="true"></span><span class="rod rod--r" aria-hidden="true"></span>
          <div class="sign contact-sign">
            <h2 id="contact-title">If you build intelligent systems and care how they fail, I’d like to hear about it.</h2>
            <div class="actions">
              <a class="btn" href="mailto:${esc(site.email)}"><span class="btn__label">Email me</span><span class="btn__arrow">${icons.mail(20)}</span></a>
              <a class="btn btn--secondary" href="${esc(site.github)}" target="_blank" rel="noopener noreferrer"><span class="btn__label">GitHub</span><span class="btn__arrow">${icons.external(20)}</span></a>
              <a class="btn btn--secondary" href="${esc(site.linkedin)}" target="_blank" rel="noopener noreferrer"><span class="btn__label">LinkedIn</span><span class="btn__arrow">${icons.external(20)}</span></a>
            </div>
            <p class="address">${esc(site.email)}</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="foot"><div class="wrap"><p>© 2026 ${esc(site.name)}</p></div></footer>
</body>
</html>
`
}
