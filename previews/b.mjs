import { esc, evidenceText, icons } from './content.mjs'

export function renderB(d) {
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
      <li class="sample" data-reveal style="--d:${i * 80}ms">
        <p class="depth"><span data-depth-of>0.0</span> m</p>
        <div class="sample__body">
          <h3><a class="sample__link" href="${p.href}">${esc(p.title)}</a></h3>
          <p>${esc(p.line)}</p>
          <p class="meta">${p.tags.map(esc).join(' / ')}</p>
          <p class="state state--${p.status.tone}"><span class="mark" aria-hidden="true"></span>${esc(p.status.text)}<span class="repo"> · ${esc(p.repo)}</span></p>
        </div>
        <span class="go" aria-hidden="true">Details ${icons.arrow(18)}</span>
      </li>`,
    )
    .join('')

  const stack = d.stack
    .map(
      (g) => `
      <div class="test" data-reveal>
        <h3>${esc(g.title)}</h3>
        <ul>${g.items.map((it) => `<li><span class="mark mark--${it.evidence}" aria-hidden="true"></span>${esc(it.name)}</li>`).join('')}</ul>
      </div>`,
    )
    .join('')

  const rows = d.record
    .map(
      (r) => `<tr><th scope="row">${esc(r.date || '—')}</th><td><strong>${esc(r.title)}</strong><span>${esc(r.detail)}</span></td></tr>`,
    )
    .join('')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Preview B: Borehole log</title>
  <link rel="icon" href="data:," />
  <script>document.documentElement.classList.add('js')</script>
  <link rel="stylesheet" href="./b.css" />
  <script type="module" src="./b.js"></script>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="topbar">
    <div class="topbar__in">
      <a class="brand" href="#top">${esc(site.name)}</a>
      <nav aria-label="Primary"><ul>${nav}</ul></nav>
      <p class="topbar__depth" aria-hidden="true"><span data-depth>0.0</span> m</p>
    </div>
  </header>
  <div class="gauge" aria-hidden="true"><span class="gauge__value"><span data-depth>0.0</span> m</span></div>

  <div class="page">
    <div class="ruler" aria-hidden="true"></div>
    <main id="main">
      <section id="top" class="stratum fill" data-stratum="Fill" tabindex="-1">
        <div class="hero">
          <div class="hero__lead">
            <h1>${esc(d.headline)}</h1>
            <p class="lede">${esc(d.background)}</p>
            <p class="actions"><a class="btn" href="#projects">See my projects ${icons.arrow(18)}</a><a class="textlink" href="${d.links.about}">More about me ${icons.arrow(16)}</a></p>
          </div>
          <table class="block-title">
            <caption class="visually-hidden">About</caption>
            <tbody>
              <tr><th scope="row">Name</th><td>${esc(site.name)}</td></tr>
              <tr><th scope="row">Role</th><td>${esc(site.role)}</td></tr>
              <tr><th scope="row">Status</th><td>${esc(d.status)}</td></tr>
              <tr><th scope="row">Education</th><td>${esc(d.education)}</td></tr>
              <tr><th scope="row">Studied in</th><td>${d.studiedIn.map(esc).join(' / ')}</td></tr>
              <tr><th scope="row">Interests</th><td>${d.interests.map(esc).join(' / ')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="projects" class="stratum clay" data-stratum="Clay" aria-labelledby="projects-title" tabindex="-1">
        <header class="head" data-reveal><h2 id="projects-title">Projects</h2><p>Three projects. Each opens on its own page with the full detail, the results and their limits.</p></header>
        <ul class="samples">${projects}</ul>
      </section>

      <section id="stack" class="stratum sand" data-stratum="Sand" aria-labelledby="stack-title" tabindex="-1">
        <header class="head" data-reveal><h2 id="stack-title">Technical stack</h2><p>What I use, marked by whether a project here shows it.</p></header>
        <ul class="legend" aria-label="Legend">${Object.entries(evidenceText).map(([k, v]) => `<li><span class="mark mark--${k}" aria-hidden="true"></span>${v}</li>`).join('')}</ul>
        <div class="tests">${stack}</div>
        <p class="more" data-reveal><a class="textlink" href="${d.links.stack}">Where each one was used ${icons.arrow(16)}</a></p>
      </section>

      <section id="record" class="stratum gravel" data-stratum="Gravel" aria-labelledby="record-title" tabindex="-1">
        <header class="head" data-reveal><h2 id="record-title">Record</h2><p>Education and independent projects, newest first. Dates come from commit history.</p></header>
        <table class="events" data-reveal><caption class="visually-hidden">Record, newest first</caption><tbody>${rows}</tbody></table>
        <p class="more" data-reveal><a class="textlink" href="${d.links.record}">Full record, ${d.recordCount} entries ${icons.arrow(16)}</a></p>
      </section>

      <section id="contact" class="stratum rock" data-stratum="Rock" aria-labelledby="contact-title" tabindex="-1">
        <h2 id="contact-title" data-reveal>If you build intelligent systems and care how they fail, I’d like to hear about it.</h2>
        <ul class="contacts" data-reveal>
          <li><a href="mailto:${esc(site.email)}">${icons.mail(20)}<span>${esc(site.email)}</span></a></li>
          <li><a href="${esc(site.github)}" target="_blank" rel="noopener noreferrer">${icons.external(20)}<span>GitHub</span></a></li>
          <li><a href="${esc(site.linkedin)}" target="_blank" rel="noopener noreferrer">${icons.external(20)}<span>LinkedIn</span></a></li>
        </ul>
        <p class="end">End of log · <span data-end>30.0</span> m</p>
      </section>
    </main>
  </div>
</body>
</html>
`
}
