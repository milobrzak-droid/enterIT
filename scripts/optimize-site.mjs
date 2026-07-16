import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const write = process.argv.includes('--write');
const productionExcludes = new Set(['index-redesign.html', '_redesign-demo.html', 'vlnka-reference-varianty.html']);
const languageNames = { cs: 'Domů', en: 'Home', de: 'Startseite', pl: 'Strona główna' };
const skipLabels = { cs: 'Přeskočit na obsah', en: 'Skip to content', de: 'Zum Inhalt springen', pl: 'Przejdź do treści' };
const groupLabels = { cs: 'Jazyk', en: 'Language', de: 'Sprache', pl: 'Język' };
const seoOverrides = {
  'tym.html': {
    title: '75členný tým pro AI, integrace a vývoj | EnterIT',
    description: '75 specialistů ve třech týmech: enterprise systémy, AI agenti a produktový vývoj. Jeden partner od architektury a integrací až po provoz 24/7.'
  },
  'en/tym.html': {
    title: '75-Person AI &amp; Software Engineering Team | EnterIT',
    description: 'Meet 75 specialists across Enterprise, AI Agents and Studio. One accountable team for architecture, integrations, product development and 24/7 operations.'
  },
  'de/tym.html': {
    title: '75 Fachkräfte für KI, Integration und Software | EnterIT',
    description: '75 Fachkräfte in drei Teams für Enterprise-Systeme, KI-Agenten und Produktentwicklung. Ein Partner für Architektur, Integration und Betrieb.'
  },
  'pl/tym.html': {
    title: '75 specjalistów AI, integracji i oprogramowania | EnterIT',
    description: '75 specjalistów w trzech zespołach: Enterprise, AI Agents i Studio. Jeden partner od architektury i integracji po rozwój produktu i utrzymanie.'
  },
  'en/firma-2030.html': {
    title: 'The Agentic Company 2030: Five Maturity Levels | EnterIT',
    description: 'Explore five maturity levels from manual operations to an agentic company. See where your business stands and choose the most valuable next step.'
  },
  'de/firma-2030.html': {
    title: 'Das agentische Unternehmen 2030: 5 Reifegrade | EnterIT',
    description: 'Fünf Reifegrade vom manuellen Betrieb bis zum agentischen Unternehmen. Erkennen Sie, wo Ihr Unternehmen steht und welcher Schritt als Nächstes zählt.'
  },
  'pl/firma-2030.html': {
    title: 'Firma agentowa 2030: 5 poziomów dojrzałości | EnterIT',
    description: 'Pięć poziomów dojrzałości: od pracy ręcznej po firmę agentową. Proszę sprawdzić, gdzie jest dziś Państwa firma i jaki krok ma największą wartość.'
  },
  'en/jak-stavime-automatizace.html': {
    description: 'See how EnterIT automates business processes in four phases, measures ROI and deploys an AI agent in Helios ERP — from baseline to production.'
  },
  'de/jak-stavime-automatizace.html': {
    description: 'So automatisiert EnterIT Geschäftsprozesse in vier Phasen: mit messbarem ROI und einem Praxisbeispiel für einen KI-Agenten im ERP Helios.'
  },
  'pl/jak-stavime-automatizace.html': {
    description: 'Jak EnterIT automatyzuje procesy w czterech fazach, mierzy ROI i wdraża agentów AI w ERP Helios — od wartości bazowej po produkcję.'
  },
  'reseni-sklad-bez-papiru.html': {
    title: 'Sklad bez papírů: automatizace příjmu zboží | EnterIT'
  },
  'en/reseni-faktury.html': {
    title: 'Invoice Automation with AI Extraction to ERP | EnterIT'
  },
  'en/reseni-sklad-bez-papiru.html': {
    title: 'Paperless Goods Receipt Automation | EnterIT'
  },
  'de/reseni-faktury.html': {
    title: 'Eingangsrechnungen automatisieren mit KI | EnterIT',
    description: 'KI liest Eingangsrechnungen aus, gleicht Bestellungen ab und übergibt sie ans ERP. Weniger Fehler und rund 30 Stunden Ersparnis pro Monat.'
  },
  'de/reseni-pracovni-vykazy.html': {
    title: 'Arbeitsnachweise per Sprache automatisieren | EnterIT'
  },
  'de/reseni-reklamace.html': {
    title: 'Reklamationen und Fristen automatisieren | EnterIT'
  },
  'de/reseni-sklad-bez-papiru.html': {
    title: 'Wareneingang und Lieferscheine automatisieren | EnterIT'
  },
  'pl/reseni-dochazka.html': {
    title: 'Automatyzacja ewidencji czasu pracy | EnterIT'
  },
  'pl/reseni-kniha-jizd.html': {
    title: 'Automatyczna ewidencja przebiegu z GPS | EnterIT'
  },
  'pl/reseni-reklamace.html': {
    title: 'Automatyzacja reklamacji i terminów | EnterIT'
  },
  'pl/reseni-sklad-bez-papiru.html': {
    title: 'Automatyzacja przyjęcia towaru i dokumentów | EnterIT'
  }
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && ['.git', 'node_modules', '.vercel'].includes(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function rel(file) {
  return path.relative(root, file).replaceAll('\\', '/');
}

function textContent(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function attr(html, pattern) {
  return (html.match(pattern)?.[1] || '').trim();
}

function applySeoOverride(html, override) {
  if (!override) return html;
  if (override.title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${override.title}</title>`);
    html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*">/i, `<meta property="og:title" content="${override.title}">`);
    html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*">/i, `<meta name="twitter:title" content="${override.title}">`);
  }
  if (override.description) {
    html = html.replace(/<meta\s+name="description"\s+content="[^"]*">/i, `<meta name="description" content="${override.description}">`);
    html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*">/i, `<meta property="og:description" content="${override.description}">`);
    html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*">/i, `<meta name="twitter:description" content="${override.description}">`);
  }
  return html;
}

function localeHome(lang) {
  if (lang === 'cs') return 'https://enterit.cz/';
  return `https://enterit.cz/${lang}.html`;
}

function organization() {
  return {
    '@type': 'Organization',
    '@id': 'https://enterit.cz/#organization',
    name: 'EnterIT',
    alternateName: 'Enter IT',
    legalName: 'AI Enter s.r.o.',
    url: 'https://enterit.cz/',
    logo: {
      '@type': 'ImageObject',
      '@id': 'https://enterit.cz/#logo',
      url: 'https://enterit.cz/assets/enter_logo_color.svg',
      contentUrl: 'https://enterit.cz/assets/enter_logo_color.svg',
      width: 477,
      height: 200
    },
    image: 'https://enterit.cz/assets/og.png',
    email: 'milo@enterit.cz',
    telephone: '+420608969263',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zahradní 2004/46d',
      postalCode: '792 01',
      addressLocality: 'Bruntál',
      addressCountry: 'CZ'
    },
    vatID: 'CZ19086652',
    sameAs: [
      'https://www.facebook.com/profile.php?id=61579684083040',
      'https://www.instagram.com/enterco/',
      'https://www.linkedin.com/company/enterin/'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'milo@enterit.cz',
      telephone: '+420608969263',
      availableLanguage: ['cs', 'en', 'de', 'pl']
    },
    knowsAbout: ['AI agents', 'business process automation', 'systems integration', 'custom software development', 'data platforms']
  };
}

function breadcrumbs(canonical, currentName, lang) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: languageNames[lang] || 'Home', item: localeHome(lang) },
      { '@type': 'ListItem', position: 2, name: currentName, item: canonical }
    ]
  };
}

function structuredData(fileRel, lang, canonical, title, description, h1) {
  const isRootHome = fileRel === 'index.html';
  const isHome = ['index.html', 'en.html', 'de.html', 'pl.html'].includes(fileRel);
  const fileName = path.posix.basename(fileRel);
  const graph = [];
  const page = {
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: lang,
    isPartOf: { '@id': 'https://enterit.cz/#website' },
    about: { '@id': 'https://enterit.cz/#organization' }
  };

  if (isRootHome) {
    graph.push(organization());
    graph.push({
      '@type': 'WebSite',
      '@id': 'https://enterit.cz/#website',
      url: 'https://enterit.cz/',
      name: 'EnterIT',
      alternateName: 'Enter IT',
      inLanguage: ['cs', 'en', 'de', 'pl'],
      publisher: { '@id': 'https://enterit.cz/#organization' }
    });
    graph.push(page);
  } else if (isHome) {
    graph.push(page);
  } else if (fileName.startsWith('reseni-')) {
    const serviceId = `${canonical}#service`;
    page.mainEntity = { '@id': serviceId };
    page.breadcrumb = { '@id': `${canonical}#breadcrumb` };
    graph.push(page);
    graph.push({
      '@type': 'Service',
      '@id': serviceId,
      name: h1,
      description,
      url: canonical,
      serviceType: h1,
      provider: { '@id': 'https://enterit.cz/#organization' },
      areaServed: { '@type': 'Place', name: 'Europe' },
      availableLanguage: ['cs', 'en', 'de', 'pl']
    });
    graph.push(breadcrumbs(canonical, h1, lang));
  } else if (fileName === 'tym.html') {
    graph.push({
      ...page,
      '@type': 'AboutPage',
      mainEntity: { '@id': 'https://enterit.cz/#organization' },
      breadcrumb: { '@id': `${canonical}#breadcrumb` }
    });
    graph.push(breadcrumbs(canonical, h1, lang));
  } else if (fileName.startsWith('jak-stavime-') || fileName === 'firma-2030.html') {
    const articleId = `${canonical}#article`;
    page.mainEntity = { '@id': articleId };
    page.breadcrumb = { '@id': `${canonical}#breadcrumb` };
    graph.push(page);
    graph.push({
      '@type': fileName.startsWith('jak-stavime-') ? 'TechArticle' : 'Article',
      '@id': articleId,
      headline: h1,
      description,
      inLanguage: lang,
      url: canonical,
      image: 'https://enterit.cz/assets/og.png',
      author: { '@id': 'https://enterit.cz/#organization' },
      publisher: { '@id': 'https://enterit.cz/#organization' },
      mainEntityOfPage: { '@id': `${canonical}#webpage` }
    });
    graph.push(breadcrumbs(canonical, h1, lang));
  } else {
    page.breadcrumb = { '@id': `${canonical}#breadcrumb` };
    graph.push(page);
    graph.push(breadcrumbs(canonical, h1, lang));
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

function socialMeta(html, title, description, lang) {
  const ogTitle = attr(html, /<meta\s+property="og:title"\s+content="([^"]*)"/i) || title;
  const ogDescription = attr(html, /<meta\s+property="og:description"\s+content="([^"]*)"/i) || description;
  const imageAlt = ogTitle;
  const lines = [];
  if (!/property="og:image:type"/i.test(html)) lines.push('<meta property="og:image:type" content="image/png">');
  if (!/property="og:image:width"/i.test(html)) lines.push('<meta property="og:image:width" content="1200">');
  if (!/property="og:image:height"/i.test(html)) lines.push('<meta property="og:image:height" content="630">');
  if (!/property="og:image:alt"/i.test(html)) lines.push(`<meta property="og:image:alt" content="${imageAlt}">`);
  if (!/name="twitter:card"/i.test(html)) lines.push('<meta name="twitter:card" content="summary_large_image">');
  if (!/name="twitter:title"/i.test(html)) lines.push(`<meta name="twitter:title" content="${ogTitle}">`);
  if (!/name="twitter:description"/i.test(html)) lines.push(`<meta name="twitter:description" content="${ogDescription}">`);
  if (!/name="twitter:image"/i.test(html)) lines.push('<meta name="twitter:image" content="https://enterit.cz/assets/og.png">');
  if (!/name="twitter:image:alt"/i.test(html)) lines.push(`<meta name="twitter:image:alt" content="${imageAlt}">`);
  if (!lines.length) return html;
  const anchor = html.match(/<link\s+rel="sitemap"[^>]*>/i)?.[0] || html.match(/<script\s+type="application\/ld\+json"/i)?.[0] || '<style>';
  return html.replace(anchor, `${lines.join('\n')}\n${anchor}`);
}

function languageLinks(fileRel, lang, mobile = false) {
  const slug = path.posix.basename(fileRel);
  const variants = [
    ['cs', 'CZ', `/${slug}`],
    ['en', 'EN', `/en/${slug}`],
    ['de', 'DE', `/de/${slug}`],
    ['pl', 'PL', `/pl/${slug}`]
  ];
  const links = variants.map(([code, label, href]) => {
    const current = code === lang ? ' aria-current="page"' : '';
    return `<a href="${href}" lang="${code}" hreflang="${code}"${current}>${label}</a>`;
  }).join('');
  return `<div class="page-lang${mobile ? '' : ' lang-desktop'}" role="group" aria-label="${groupLabels[lang] || 'Language'}">${links}</div>`;
}

function readImageSize(file) {
  const ext = path.extname(file).toLowerCase();
  const buffer = fs.readFileSync(file);
  if (ext === '.svg') {
    const svg = buffer.toString('utf8', 0, Math.min(buffer.length, 8192));
    const width = Number(svg.match(/\bwidth=["']([\d.]+)/i)?.[1]);
    const height = Number(svg.match(/\bheight=["']([\d.]+)/i)?.[1]);
    if (width > 0 && height > 0) return [Math.round(width), Math.round(height)];
    const viewBox = svg.match(/\bviewBox=["']\s*[-\d.]+[ ,]+[-\d.]+[ ,]+([\d.]+)[ ,]+([\d.]+)\s*["']/i);
    if (viewBox) return [Math.max(1, Math.round(Number(viewBox[1]))), Math.max(1, Math.round(Number(viewBox[2])))];
  }
  if (ext === '.png' && buffer.length >= 24 && buffer.toString('ascii', 1, 4) === 'PNG') return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
  if ((ext === '.jpg' || ext === '.jpeg') && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) { offset += 1; continue; }
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) return [buffer.readUInt16BE(offset + 7), buffer.readUInt16BE(offset + 5)];
      if (length < 2) break;
      offset += 2 + length;
    }
  }
  if (ext === '.gif' && buffer.length >= 10) return [buffer.readUInt16LE(6), buffer.readUInt16LE(8)];
  if (ext === '.webp' && buffer.length >= 30 && buffer.toString('ascii', 0, 4) === 'RIFF') {
    const kind = buffer.toString('ascii', 12, 16);
    if (kind === 'VP8X') return [1 + buffer.readUIntLE(24, 3), 1 + buffer.readUIntLE(27, 3)];
    if (kind === 'VP8 ' && buffer.length >= 30) return [buffer.readUInt16LE(26) & 0x3fff, buffer.readUInt16LE(28) & 0x3fff];
    if (kind === 'VP8L' && buffer.length >= 25) {
      const b1 = buffer[21], b2 = buffer[22], b3 = buffer[23], b4 = buffer[24];
      return [1 + (((b2 & 0x3f) << 8) | b1), 1 + ((b4 << 6) | ((b3 & 0xfc) >> 2) | ((b2 & 0xc0) >> 6))];
    }
  }
  if (ext === '.ico' && buffer.length >= 8) return [buffer[6] || 256, buffer[7] || 256];
  return null;
}

const sizeCache = new Map();
function enhanceImages(html, file) {
  const firstSectionEnd = html.indexOf('</section>');
  return html.replace(/<img\b[^>]*>/gi, (tag, offset) => {
    const source = tag.match(/\bsrc="([^"]+)"/i)?.[1];
    if (!source || /^(?:https?:|data:|\/\/)/i.test(source)) return tag;
    const clean = source.split(/[?#]/)[0];
    const imageFile = clean.startsWith('/') ? path.join(root, clean.slice(1)) : path.resolve(path.dirname(file), clean);
    let next = tag;
    if (fs.existsSync(imageFile)) {
      let size = sizeCache.get(imageFile);
      if (size === undefined) {
        try { size = readImageSize(imageFile); } catch { size = null; }
        sizeCache.set(imageFile, size);
      }
      if (size && !/\bwidth=/i.test(next)) next = next.replace(/>$/, ` width="${size[0]}" height="${size[1]}">`);
    }
    if (!/\bdecoding=/i.test(next)) next = next.replace(/>$/, ' decoding="async">');
    if (offset > firstSectionEnd && !/\bloading=/i.test(next)) next = next.replace(/>$/, ' loading="lazy">');
    return next;
  });
}

const files = walk(root)
  .filter((file) => file.toLowerCase().endsWith('.html'))
  .filter((file) => !rel(file).includes('/.git/'))
  .filter((file) => !productionExcludes.has(rel(file)));

let changed = 0;
let imagesSized = 0;
for (const file of files) {
  const fileRel = rel(file);
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  html = applySeoOverride(html, seoOverrides[fileRel]);
  const lang = attr(html, /<html\s+lang="([^"]+)"/i) || 'cs';
  const title = attr(html, /<title>([\s\S]*?)<\/title>/i);
  const description = attr(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = attr(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const h1 = textContent(attr(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i));

  html = html.replace(/href="(?:\/)?index\.html(?=([#"]))/g, 'href="/');
  html = html.replace(/@media\(max-width:(?:1000|1120|1220)px\)(\{\s*\.nav-links\{display:none\})/, '@media(max-width:1180px)$1');
  html = html.replace(/@media\(min-width:(?:1001|1121|1221)px\)\{\.mobile-menu\{display:none\}\}/, '@media(min-width:1181px){.mobile-menu{display:none}}');
  html = html.replace('<b>do 12 týdnů</b><span>se vrátí investice</span>', '<b>ROI v pilotu</b><span>změříme na vašich datech</span>');
  html = html.replace('<b>within 12 weeks</b><span>payback</span>', '<b>ROI in the pilot</b><span>measured on your data</span>');
  html = html.replace(/<b>(?:binnen|bis) 12 Wochen<\/b><span>amortisiert sich die Investition<\/span>/, '<b>ROI im Pilot</b><span>auf Ihren Daten gemessen</span>');
  html = html.replace('<b>do 12 tygodni</b><span>zwrot inwestycji</span>', '<b>ROI w pilotażu</b><span>mierzone na Państwa danych</span>');
  html = html.replace(/<meta\s+property="og:site_name"\s+content="[^"]*">/i, '<meta property="og:site_name" content="EnterIT">');
  if (fileRel.includes('/') && /<link\s+rel="icon"\s+href="favicon\.ico"/i.test(html)) html = html.replace(/<link\s+rel="icon"\s+href="favicon\.ico"/i, '<link rel="icon" href="/favicon.ico"');
  if (!/<link\s+rel="sitemap"/i.test(html)) html = html.replace(/(<script\s+type="application\/ld\+json")/i, '<link rel="sitemap" type="application/xml" href="/sitemap.xml">\n$1');
  html = socialMeta(html, title, description, lang);

  if (canonical) {
    const replacement = `<script type="application/ld+json">${structuredData(fileRel, lang, canonical, textContent(title), description, h1)}</script>`;
    const blocks = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
    const organizationBlock = blocks.find((match) => {
      try {
        const parsed = JSON.parse(match[1]);
        return parsed?.['@type'] === 'Organization' || parsed?.['@graph']?.some((node) => node?.['@id'] === `${canonical}#webpage`);
      } catch { return false; }
    });
    if (organizationBlock) html = html.replace(organizationBlock[0], replacement);
  }

  if (!/href="\/assets\/site-ui\.css"/i.test(html)) html = html.replace('</style>', '</style>\n<link rel="stylesheet" href="/assets/site-ui.css">');
  if (!/src="\/assets\/site-ui\.js"/i.test(html)) html = html.replace('</head>', '<script src="/assets/site-ui.js" defer></script>\n</head>');
  if (!/rel="preload"[^>]+GreycliffCF-Heavy/i.test(html)) {
    html = html.replace('<style>', '<link rel="preload" href="/assets/fonts/GreycliffCF-Heavy.otf" as="font" type="font/otf" crossorigin>\n<link rel="preload" href="/assets/fonts/FiraMono-Medium.ttf" as="font" type="font/ttf" crossorigin>\n<style>');
  }

  const mainTag = html.match(/<main\b[^>]*>/i)?.[0];
  if (mainTag) {
    let enhancedMain = mainTag;
    if (!/\bid=/i.test(enhancedMain)) enhancedMain = enhancedMain.replace('<main', '<main id="main-content"');
    if (!/\btabindex=/i.test(enhancedMain)) enhancedMain = enhancedMain.replace(/>$/, ' tabindex="-1">');
    html = html.replace(mainTag, enhancedMain);
    const mainId = enhancedMain.match(/\bid="([^"]+)"/i)?.[1] || 'main-content';
    if (!/class="skip-link"/i.test(html)) html = html.replace(/<body([^>]*)>/i, `<body$1>\n<a class="skip-link" href="#${mainId}">${skipLabels[lang] || skipLabels.en}</a>`);
  }

  html = html.replace(/<button\s+class="mtoggle"\s+id="mtoggle"(?![^>]*aria-controls)/i, '<button class="mtoggle" id="mtoggle" aria-controls="mmenu"');

  const isHome = ['index.html', 'en.html', 'de.html', 'pl.html'].includes(fileRel);
  if (isHome) {
    const codes = { CZ: 'cs', EN: 'en', DE: 'de', PL: 'pl' };
    html = html.replace(/<a href="([^"]+)"( class="active")?>(CZ|EN|DE|PL)<\/a>/g, (match, href, active, label) => {
      const code = codes[label];
      return `<a href="${href}" lang="${code}" hreflang="${code}"${active || ''}${active ? ' aria-current="page"' : ''}>${label}</a>`;
    });
    html = html.replace(/(<div class="idf-val"[^\r\n]*?<)h4>([^\r\n]*?)<\/h4>/g, '$1h3>$2</h3>');
    html = html.replace(/(<li><span class="how-num"[^\r\n]*?<)h4>([^\r\n]*?)<\/h4>/g, '$1h3>$2</h3>');
    html = html.replaceAll('.idf-val h4', '.idf-val h3').replaceAll('.how-list h4', '.how-list h3');
  }
  const pageFileName = path.posix.basename(fileRel);
  if (pageFileName.startsWith('reseni-')) {
    html = html.replaceAll('<h4>', '<h3>').replaceAll('</h4>', '</h3>').replaceAll('.rs-faq-item h4', '.rs-faq-item h3');
  }
  if (pageFileName.startsWith('jak-stavime-')) {
    html = html.replaceAll('<h4>', '<h3>').replaceAll('</h4>', '</h3>').replaceAll('.jp-block h4', '.jp-block h3').replaceAll('.jp-step h4', '.jp-step h3');
  }
  if (!isHome && !/class="page-lang/i.test(html)) {
    const desktop = languageLinks(fileRel, lang, false);
    html = html.replace(/(<div\s+class="nav-right">\s*)/i, `$1${desktop}\n        `);
    const mobile = languageLinks(fileRel, lang, true);
    html = html.replace(/(<nav\s+class="mobile-menu"\s+id="mmenu"[^>]*>[\s\S]*?)(\s*<\/nav>)/i, `$1\n  ${mobile}$2`);
  }
  if (!isHome && !/<nav\s+class="mobile-menu"/i.test(html)) {
    html = html.replace('class="page-lang lang-desktop"', 'class="page-lang legal-lang"');
  }

  const beforeImages = (html.match(/<img\b[^>]*\bwidth=/gi) || []).length;
  html = enhanceImages(html, file);
  imagesSized += (html.match(/<img\b[^>]*\bwidth=/gi) || []).length - beforeImages;

  if (html !== before) {
    changed += 1;
    if (write) fs.writeFileSync(file, html, 'utf8');
  }
}

console.log(`${write ? 'Updated' : 'Would update'} ${changed} HTML files; added intrinsic dimensions to ${imagesSized} images.`);
