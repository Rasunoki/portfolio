import { chromium } from "playwright-core";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 10.5pt;
    color: #111;
    background: #fff;
    padding: 48px 52px;
    line-height: 1.5;
  }

  /* Header */
  .header { border-bottom: 2px solid #111; padding-bottom: 14px; margin-bottom: 18px; }
  .header h1 { font-size: 22pt; font-weight: 700; letter-spacing: -0.5px; }
  .header .role { font-size: 10pt; color: #444; margin-top: 3px; }
  .header .contacts {
    display: flex; flex-wrap: wrap; gap: 0 18px;
    font-size: 9pt; color: #333; margin-top: 8px;
  }
  .header .contacts span { display: flex; align-items: center; gap: 4px; }

  /* Sections */
  .section { margin-bottom: 20px; }
  .section-title {
    font-size: 8pt; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: #555; border-bottom: 1px solid #ddd;
    padding-bottom: 4px; margin-bottom: 10px;
  }

  /* Summary */
  .summary p { font-size: 10pt; color: #333; }

  /* Entry */
  .entry { margin-bottom: 12px; }
  .entry-header { display: flex; justify-content: space-between; align-items: baseline; }
  .entry-title { font-size: 10.5pt; font-weight: 700; }
  .entry-date { font-size: 9pt; color: #666; white-space: nowrap; }
  .entry-sub { font-size: 9.5pt; color: #444; margin-top: 1px; }
  .entry ul { margin-top: 5px; padding-left: 16px; }
  .entry ul li { font-size: 9.5pt; color: #333; margin-bottom: 2px; }

  /* Skills grid */
  .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; }
  .skill-group { }
  .skill-label { font-size: 9pt; font-weight: 700; color: #333; }
  .skill-list { font-size: 9pt; color: #555; margin-top: 2px; }

  /* Tags */
  .tags { display: flex; flex-wrap: wrap; gap: 5px; }
  .tag {
    font-size: 8.5pt; padding: 2px 9px;
    border: 1px solid #ccc; border-radius: 20px; color: #333;
  }
</style>
</head>
<body>

<div class="header">
  <h1>Joseph Rafael A. Macasling</h1>
  <div class="role">Music Video Director &nbsp;·&nbsp; Photographer &nbsp;·&nbsp; Graphic Designer</div>
  <div class="contacts">
    <span>📍 Valenzuela City, Philippines</span>
    <span>📧 josephrmacasling@gmail.com</span>
    <span>📞 0951 546 5994</span>
    <span>🔗 linkedin.com/in/joseph-rafael-macasling-1b1027412</span>
    <span>💻 github.com/Rasunoki</span>
  </div>
</div>

<div class="section summary">
  <div class="section-title">Profile</div>
  <p>
    Creative 3rd year BSIT student at Pamantasan ng Lungsod ng Valenzuela with a strong passion for visual
    storytelling. Since 2023, has directed 15+ music videos for startup artists, handled photography for
    commercial and portrait shoots, and produced game trailers and documentary coverage for school events.
    Combines technical knowledge with an eye for design to deliver work that is intentional and visually driven.
  </p>
</div>

<div class="section">
  <div class="section-title">Education</div>
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">Pamantasan ng Lungsod ng Valenzuela (PLV)</span>
      <span class="entry-date">2022 – Present</span>
    </div>
    <div class="entry-sub">Bachelor of Science in Information Technology &nbsp;·&nbsp; 3rd Year</div>
    <div class="entry-sub" style="color:#888; margin-top:2px;">Valenzuela City, Philippines</div>
  </div>
</div>

<div class="section">
  <div class="section-title">Experience</div>

  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">Freelance Music Video Director &amp; Photographer</span>
      <span class="entry-date">2023 – Present</span>
    </div>
    <div class="entry-sub">Independent &nbsp;·&nbsp; Valenzuela City, Philippines</div>
    <ul>
      <li>Directed 15+ music videos for startup artists, handling full production from concept to final delivery.</li>
      <li>Managed cinematography, lighting design, and on-set direction for each production.</li>
      <li>Performed color grading and post-production editing to meet client creative vision.</li>
      <li>Conducted portrait and commercial photography shoots for artists and brands.</li>
    </ul>
  </div>

  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">Game Trailer Videographer</span>
      <span class="entry-date">2023 – Present</span>
    </div>
    <div class="entry-sub">Independent</div>
    <ul>
      <li>Produced cinematic promotional content for <em>Shadow of the Past</em> (Bakunawa Studios) and <em>The Smile I Didn&apos;t Mean To Show</em>.</li>
      <li>Handled direction, filming, and post-production for game marketing content.</li>
    </ul>
  </div>

  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">Documentary Videographer</span>
      <span class="entry-date">2022 – Present</span>
    </div>
    <div class="entry-sub">Pamantasan ng Lungsod ng Valenzuela</div>
    <ul>
      <li>Covered school events through documentary-style photography and videography.</li>
      <li>Delivered edited footage and photo sets for institutional documentation.</li>
    </ul>
  </div>
</div>

<div class="section">
  <div class="section-title">Skills</div>
  <div class="skills-grid">
    <div class="skill-group">
      <div class="skill-label">Creative</div>
      <div class="skill-list">Music Video Direction · Treatment Writing · Cinematography · Lighting Design · Color Grading · Portrait Photography · Brand Identity Design · Graphic Design</div>
    </div>
    <div class="skill-group">
      <div class="skill-label">Technical</div>
      <div class="skill-list">Adobe Premiere Pro · Adobe Photoshop · Adobe Lightroom · Adobe After Effects · DaVinci Resolve · Adobe Illustrator · Canva · CapCut</div>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-title">Tools &amp; Software</div>
  <div class="tags">
    <span class="tag">Premiere Pro</span>
    <span class="tag">After Effects</span>
    <span class="tag">Photoshop</span>
    <span class="tag">Lightroom</span>
    <span class="tag">Illustrator</span>
    <span class="tag">DaVinci Resolve</span>
    <span class="tag">Canva</span>
    <span class="tag">CapCut</span>
    <span class="tag">Figma</span>
  </div>
</div>

</body>
</html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle" });
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
  const out = resolve(__dirname, "../public/resume.pdf");
  writeFileSync(out, pdf);
  await browser.close();
  console.log("resume.pdf saved to public/");
})();
