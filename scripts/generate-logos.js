const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const opentype = require('opentype.js');

const LOGO_DIR = path.join(__dirname, '..', 'public', 'logo');
if (!fs.existsSync(LOGO_DIR)) {
  fs.mkdirSync(LOGO_DIR, { recursive: true });
}

// ----------------------------------------------------------------------------
// 1. EXTRACT VECTOR OUTLINES FOR "Efesoft" (True Beziers, No Font Dependencies)
// ----------------------------------------------------------------------------
const fontBuf = fs.readFileSync('C:/Windows/Fonts/segoeuib.ttf');
const font = opentype.parse(fontBuf.buffer.slice(fontBuf.byteOffset, fontBuf.byteOffset + fontBuf.byteLength));

// ViewBox parameters for Full Logo: 0 0 700 220
// Icon occupies x: 38 to 198 (width 160, height 160, cy=110)
// Gap = 32px -> Text starts at x = 230
const textFontSize = 118;
const textX = 230;
const textBaselineY = 155;

const textGlyphPath = font.getPath('Efesoft', textX, textBaselineY, textFontSize);
const textVectorD = textGlyphPath.toPathData(2);

// Calculate exact right edge of the word "Efesoft"
let maxX = 0;
textGlyphPath.commands.forEach(cmd => {
  if (cmd.x && cmd.x > maxX) maxX = cmd.x;
  if (cmd.x1 && cmd.x1 > maxX) maxX = cmd.x1;
  if (cmd.x2 && cmd.x2 > maxX) maxX = cmd.x2;
});

// Cyan-blue square period "." position:
const dotSize = 20;
const dotGap = 12;
const dotX = Math.round(maxX + dotGap);
const dotY = textBaselineY - dotSize; // Sits flush on the baseline

// ----------------------------------------------------------------------------
// 2. ICON GEOMETRY ("e" MONOGRAM)
// Center: (256, 256), Radius: 140, Stroke: 54, Tail Angle: 32 deg
// Seamless path: Crossbar Left -> Crossbar Right -> Top Arc -> Bottom Arc -> Tail
// ----------------------------------------------------------------------------
const cx = 256;
const cy = 256;
const R = 140;
const strokeW = 54;
const endDeg = 32;
const rad = (endDeg * Math.PI) / 180;
const endX = (cx + R * Math.cos(rad)).toFixed(2);
const endY = (cy + R * Math.sin(rad)).toFixed(2);

// Seamless single-contour stroke:
const ePathD = `M ${cx - R} ${cy} H ${cx + R} A ${R} ${R} 0 0 0 ${cx - R} ${cy} A ${R} ${R} 0 0 0 ${endX} ${endY}`;

// ----------------------------------------------------------------------------
// 3. SVG TEMPLATES
// ----------------------------------------------------------------------------

// A. Icon Only (Light - Saydam Arka Plan - 512x512)
const iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <defs>
    <linearGradient id="efe-icon-grad" x1="256" y1="50" x2="256" y2="460" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00b4ff" />
      <stop offset="35%" stop-color="#0084ff" />
      <stop offset="100%" stop-color="#0055e5" />
    </linearGradient>
  </defs>
  <path d="${ePathD}" stroke="url(#efe-icon-grad)" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

// B. Icon Only (Dark Neon - Saydam Arka Plan - 512x512)
const iconDarkSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <defs>
    <linearGradient id="efe-icon-dark-grad" x1="256" y1="50" x2="256" y2="460" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00c8ff" />
      <stop offset="35%" stop-color="#0090ff" />
      <stop offset="100%" stop-color="#005ce6" />
    </linearGradient>
  </defs>
  <path d="${ePathD}" stroke="url(#efe-icon-dark-grad)" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

// C. Icon Monochrome (Saf Siyah & Saf Beyaz)
const iconBlackSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <path d="${ePathD}" stroke="#111111" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

const iconWhiteSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <path d="${ePathD}" stroke="#ffffff" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

// D. App Icon (Squircle Capsule)
const appIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <defs>
    <linearGradient id="app-tile-bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f0f3f8" />
    </linearGradient>
    <linearGradient id="app-e-grad" x1="256" y1="80" x2="256" y2="430" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00b4ff" />
      <stop offset="35%" stop-color="#0084ff" />
      <stop offset="100%" stop-color="#0055e5" />
    </linearGradient>
  </defs>
  <rect x="24" y="24" width="464" height="464" rx="108" fill="url(#app-tile-bg)" />
  <rect x="25" y="25" width="462" height="462" rx="107" stroke="rgba(0,0,0,0.06)" stroke-width="2" />
  <g transform="translate(48, 48) scale(0.8125)">
    <path d="${ePathD}" stroke="url(#app-e-grad)" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

// E. Full Logo - Açık Tema (Light Theme - Saydam Arka Plan - ViewBox: 0 0 700 220)
const logoLightSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 220" fill="none">
  <defs>
    <linearGradient id="logo-light-e-grad" x1="118" y1="30" x2="118" y2="190" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00b4ff" />
      <stop offset="35%" stop-color="#0084ff" />
      <stop offset="100%" stop-color="#0055e5" />
    </linearGradient>
  </defs>
  <!-- "e" Icon Monogram (scale: 160/512 = 0.3125, y: (220-160)/2 = 30) -->
  <g transform="translate(38, 30) scale(0.3125)">
    <path d="${ePathD}" stroke="url(#logo-light-e-grad)" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />
  </g>
  <!-- True Vector Wordmark "Efesoft" -->
  <path d="${textVectorD}" fill="#111111" />
  <!-- Cyan-Blue Square Period "." -->
  <rect x="${dotX}" y="${dotY}" width="${dotSize}" height="${dotSize}" rx="2" fill="#00a2ff" />
</svg>`;

// F. Full Logo - Koyu Tema (Dark Theme - Saydam Arka Plan - ViewBox: 0 0 700 220)
const logoDarkSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 220" fill="none">
  <defs>
    <linearGradient id="logo-dark-e-grad" x1="118" y1="30" x2="118" y2="190" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00c8ff" />
      <stop offset="35%" stop-color="#0090ff" />
      <stop offset="100%" stop-color="#005ce6" />
    </linearGradient>
  </defs>
  <!-- "e" Icon Monogram -->
  <g transform="translate(38, 30) scale(0.3125)">
    <path d="${ePathD}" stroke="url(#logo-dark-e-grad)" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />
  </g>
  <!-- True Vector Wordmark "Efesoft" in pure white -->
  <path d="${textVectorD}" fill="#ffffff" />
  <!-- Cyan-Blue Square Period "." -->
  <rect x="${dotX}" y="${dotY}" width="${dotSize}" height="${dotSize}" rx="2" fill="#00c4ff" />
</svg>`;

// G. Full Logo - Saf Beyaz (All White for Dark Media)
const logoWhiteSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 220" fill="none">
  <g transform="translate(38, 30) scale(0.3125)">
    <path d="${ePathD}" stroke="#ffffff" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />
  </g>
  <path d="${textVectorD}" fill="#ffffff" />
  <rect x="${dotX}" y="${dotY}" width="${dotSize}" height="${dotSize}" rx="2" fill="#ffffff" />
</svg>`;

// H. Rounded Card Light (Exact replica of User Reference Image 4)
// ViewBox: 0 0 760 260
const cardLightSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 260" fill="none">
  <defs>
    <linearGradient id="card-light-bg" x1="0" y1="0" x2="760" y2="260" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f8f9fc" />
    </linearGradient>
    <linearGradient id="card-e-grad" x1="148" y1="50" x2="148" y2="210" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00b4ff" />
      <stop offset="35%" stop-color="#0084ff" />
      <stop offset="100%" stop-color="#0055e5" />
    </linearGradient>
  </defs>
  <rect x="8" y="8" width="744" height="244" rx="36" fill="url(#card-light-bg)" stroke="rgba(0,0,0,0.07)" stroke-width="2" />
  <g transform="translate(30, 20)">
    <g transform="translate(38, 30) scale(0.3125)">
      <path d="${ePathD}" stroke="url(#card-e-grad)" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <path d="${textVectorD}" fill="#111111" />
    <rect x="${dotX}" y="${dotY}" width="${dotSize}" height="${dotSize}" rx="2" fill="#00a2ff" />
  </g>
</svg>`;

// I. Rounded Card Dark (Exact replica of User Reference Image 5)
// ViewBox: 0 0 760 260
const cardDarkSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 260" fill="none">
  <defs>
    <linearGradient id="card-dark-bg" x1="0" y1="0" x2="760" y2="260" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0d0e12" />
      <stop offset="100%" stop-color="#050608" />
    </linearGradient>
    <linearGradient id="card-dark-e-grad" x1="148" y1="50" x2="148" y2="210" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00c8ff" />
      <stop offset="35%" stop-color="#0090ff" />
      <stop offset="100%" stop-color="#005ce6" />
    </linearGradient>
  </defs>
  <rect x="8" y="8" width="744" height="244" rx="36" fill="url(#card-dark-bg)" stroke="rgba(255,255,255,0.12)" stroke-width="2" />
  <g transform="translate(30, 20)">
    <g transform="translate(38, 30) scale(0.3125)">
      <path d="${ePathD}" stroke="url(#card-dark-e-grad)" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <path d="${textVectorD}" fill="#ffffff" />
    <rect x="${dotX}" y="${dotY}" width="${dotSize}" height="${dotSize}" rx="2" fill="#00c4ff" />
  </g>
</svg>`;

// ----------------------------------------------------------------------------
// 4. GENERATION PIPELINE (SVG MASTERS + ULTRA HIGH-RES RASTERS)
// ----------------------------------------------------------------------------
async function run() {
  console.log('Generating Efesoft 4K Ultra-Resolution Logo Suite...');

  // 1. Write Pure SVG Vectors
  fs.writeFileSync(path.join(LOGO_DIR, 'efesoft-icon-light.svg'), iconSVG);
  fs.writeFileSync(path.join(LOGO_DIR, 'efesoft-icon-dark.svg'), iconDarkSVG);
  fs.writeFileSync(path.join(LOGO_DIR, 'efesoft-icon-black.svg'), iconBlackSVG);
  fs.writeFileSync(path.join(LOGO_DIR, 'efesoft-icon-white.svg'), iconWhiteSVG);
  fs.writeFileSync(path.join(LOGO_DIR, 'efesoft-app-icon.svg'), appIconSVG);
  fs.writeFileSync(path.join(LOGO_DIR, 'efesoft-logo-light.svg'), logoLightSVG);
  fs.writeFileSync(path.join(LOGO_DIR, 'efesoft-logo-dark.svg'), logoDarkSVG);
  fs.writeFileSync(path.join(LOGO_DIR, 'efesoft-logo-white.svg'), logoWhiteSVG);
  fs.writeFileSync(path.join(LOGO_DIR, 'efesoft-logo-card-light.svg'), cardLightSVG);
  fs.writeFileSync(path.join(LOGO_DIR, 'efesoft-logo-card-dark.svg'), cardDarkSVG);
  console.log('✓ SVG Master vectors written.');

  // Buffers for sharp rasterization:
  const bIcon = Buffer.from(iconSVG);
  const bIconDark = Buffer.from(iconDarkSVG);
  const bAppIcon = Buffer.from(appIconSVG);
  const bLogoLight = Buffer.from(logoLightSVG);
  const bLogoDark = Buffer.from(logoDarkSVG);
  const bCardLight = Buffer.from(cardLightSVG);
  const bCardDark = Buffer.from(cardDarkSVG);
  const bIconBlack = Buffer.from(iconBlackSVG);
  const bIconWhite = Buffer.from(iconWhiteSVG);

  // 2. High-Res PNGs for Icon Light (512, 1024, 2048, 4096 4K)
  await sharp(bIcon).resize(512, 512).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-icon-light.png'));
  await sharp(bIcon).resize(1024, 1024).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-icon-light-1024.png'));
  await sharp(bIcon).resize(2048, 2048).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-icon-light-2048.png'));
  await sharp(bIcon).resize(4096, 4096).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-icon-light-4k.png'));

  // 3. High-Res PNGs for Icon Dark (512, 1024, 2048, 4096 4K)
  await sharp(bIconDark).resize(512, 512).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-icon-dark.png'));
  await sharp(bIconDark).resize(1024, 1024).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-icon-dark-1024.png'));
  await sharp(bIconDark).resize(2048, 2048).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-icon-dark-2048.png'));
  await sharp(bIconDark).resize(4096, 4096).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-icon-dark-4k.png'));

  // 4. App Icon (512, 1024, 2048)
  await sharp(bAppIcon).resize(512, 512).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-app-icon.png'));
  await sharp(bAppIcon).resize(1024, 1024).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-app-icon-1024.png'));
  await sharp(bAppIcon).resize(2048, 2048).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-app-icon-4k.png'));

  // 5. Full Logo Light (Transparent) - 700x220, 1400x440 (2x), 2800x880 (4K), 3500x1100 (5K)
  await sharp(bLogoLight).resize(700, 220).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-logo-light.png'));
  await sharp(bLogoLight).resize(1400, 440).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-logo-light-2x.png'));
  await sharp(bLogoLight).resize(2800, 880).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-logo-light-4k.png'));

  // 6. Full Logo Dark (Transparent) - 700x220, 1400x440 (2x), 2800x880 (4K)
  await sharp(bLogoDark).resize(700, 220).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-logo-dark.png'));
  await sharp(bLogoDark).resize(1400, 440).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-logo-dark-2x.png'));
  await sharp(bLogoDark).resize(2800, 880).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-logo-dark-4k.png'));

  // 7. Rounded Card Light (Image 4 replica)
  await sharp(bCardLight).resize(760, 260).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-logo-card-light.png'));
  await sharp(bCardLight).resize(1520, 520).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-logo-card-light-2x.png'));
  await sharp(bCardLight).resize(3040, 1040).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-logo-card-light-4k.png'));

  // 8. Rounded Card Dark (Image 5 replica)
  await sharp(bCardDark).resize(760, 260).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-logo-card-dark.png'));
  await sharp(bCardDark).resize(1520, 520).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-logo-card-dark-2x.png'));
  await sharp(bCardDark).resize(3040, 1040).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-logo-card-dark-4k.png'));

  // 9. Monochrome (Saf Siyah & Saf Beyaz)
  await sharp(bIconBlack).resize(1024, 1024).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-icon-black.png'));
  await sharp(bIconBlack).resize(4096, 4096).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-icon-black-4k.png'));
  await sharp(bIconWhite).resize(1024, 1024).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-icon-white.png'));
  await sharp(bIconWhite).resize(4096, 4096).png({ compressionLevel: 9 }).toFile(path.join(LOGO_DIR, 'efesoft-icon-white-4k.png'));

  console.log('✓ All 4K Ultra-Resolution, 2K Retina, and Vector assets rendered successfully!');
}

run().catch(console.error);
