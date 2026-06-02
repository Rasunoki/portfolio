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
    font-family: 'Times New Roman', Times, serif;
    font-size: 11pt;
    color: #000;
    background: #fff;
    padding: 54px 64px;
    line-height: 1.45;
  }

  /* Header — centered name block */
  .header { text-align: center; margin-bottom: 14px; }
  .header h1 { font-size: 18pt; font-weight: 700; letter-spacing: 0.5px; }
  .header .contacts {
    font-size: 10pt; margin-top: 5px;
  }
  .header .contacts span { display: inline; }
  .header .contacts span + span::before { content: " | "; }

  /* Sections */
  .section { margin-bottom: 14px; }
  .section-title {
    font-size: 11pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1.5px solid #000;
    padding-bottom: 2px;
    margin-bottom: 8px;
  }

  /* Entry */
  .entry { margin-bottom: 10px; }
  .entry-header { display: flex; justify-content: space-between; align-items: baseline; }
  .entry-org { font-size: 11pt; font-weight: 700; }
  .entry-date { font-size: 10.5pt; font-weight: 400; white-space: nowrap; }
  .entry-role { font-size: 10.5pt; font-style: italic; margin-top: 1px; }
  .entry-loc { font-size: 10.5pt; color: #000; margin-top: 1px; }
  .entry ul { margin-top: 4px; padding-left: 18px; }
  .entry ul li { font-size: 10.5pt; margin-bottom: 2px; }

  /* Skills */
  .skill-row { font-size: 10.5pt; margin-bottom: 4px; }
  .skill-row b { font-weight: 700; }
</style>
</head>
<body>

<div class="header">
  <h1>Joseph Rafael A. Macasling</h1>
  <div class="contacts">
    <span>Valenzuela City, Philippines</span>
    <span>josephrmacasling@gmail.com</span>
    <span>0951 546 5994</span>
    <span>linkedin.com/in/joseph-rafael-macasling-1b1027412</span>
    <span>github.com/Rasunoki</span>
  </div>
</div>

<div class="section">
  <div class="section-title">Education</div>
  <div class="entry">
    <div class="entry-header">
      <span class="entry-org">Pamantasan ng Lungsod ng Valenzuela (PLV)</span>
      <span class="entry-date">2022 – Present</span>
    </div>
    <div class="entry-role">Bachelor of Science in Information Technology, 3rd Year</div>
    <div class="entry-loc">Valenzuela City, Philippines</div>
  </div>
</div>

<div class="section">
  <div class="section-title">Experience</div>

  <div class="entry">
    <div class="entry-header">
      <span class="entry-org">Freelance / Independent</span>
      <span class="entry-date">2023 – Present</span>
    </div>
    <div class="entry-role">Music Video Director &amp; Photographer</div>
    <div class="entry-loc">Valenzuela City, Philippines</div>
    <ul>
      <li>Directed 15+ music videos for startup artists, overseeing full production from concept to final delivery.</li>
      <li>Managed cinematography, lighting design, and on-set direction across all productions.</li>
      <li>Performed color grading and post-production editing to meet client creative vision.</li>
      <li>Conducted portrait and commercial photography shoots for artists and brands.</li>
    </ul>
  </div>

  <div class="entry">
    <div class="entry-header">
      <span class="entry-org">Bakunawa Studios / maeluis</span>
      <span class="entry-date">2023 – Present</span>
    </div>
    <div class="entry-role">Game Trailer Videographer</div>
    <div class="entry-loc">Philippines</div>
    <ul>
      <li>Produced cinematic promotional content for <em>Shadow of the Past</em> (Bakunawa Studios) and <em>The Smile I Didn&apos;t Mean To Show</em>.</li>
      <li>Handled direction, filming, and post-production for game marketing material.</li>
    </ul>
  </div>

  <div class="entry">
    <div class="entry-header">
      <span class="entry-org">Pamantasan ng Lungsod ng Valenzuela</span>
      <span class="entry-date">2022 – Present</span>
    </div>
    <div class="entry-role">Documentary Videographer</div>
    <div class="entry-loc">Valenzuela City, Philippines</div>
    <ul>
      <li>Covered school events through documentary-style photography and videography.</li>
      <li>Delivered edited footage and photo sets for institutional documentation.</li>
    </ul>
  </div>
</div>

<div class="section">
  <div class="section-title">Skills</div>
  <div class="skill-row"><b>Creative:</b> Music Video Direction · Treatment Writing · Cinematography · Lighting Design · Color Grading · Portrait Photography · Brand Identity Design · Graphic Design</div>
  <div class="skill-row"><b>Technical:</b> Adobe Premiere Pro · Adobe Photoshop · Adobe Lightroom · Adobe After Effects · DaVinci Resolve · Adobe Illustrator · Figma · Canva · CapCut</div>
</div>

</body>
</html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle" });
  const pdf = await page.pdf({
    format: "Letter",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
  const out = resolve(__dirname, "../public/resume.pdf");
  writeFileSync(out, pdf);
  await browser.close();
  console.log("resume.pdf saved to public/");
})();
