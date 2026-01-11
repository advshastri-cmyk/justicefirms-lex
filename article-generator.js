/**
 * Article Generator for JusticeFirms Journal
 * GitHub Pages Compatible (Static HTML)
 *
 * Usage:
 *   node articlegenerator.js
 *
 * Output:
 *   Generates one .html file per article in root folder
 */

const fs = require('fs');
const path = require('path');

// =======================
// READ ARTICLES.JSON
// =======================
const DATA_PATH = path.join(__dirname, 'articles.json');
const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
const articles = data.articles;

// =======================
// HTML TEMPLATE FUNCTION
// =======================
function generateArticlePage(article) {
  const isHindi = article.language === 'hi';
  const fontFamily = isHindi
    ? "'Noto Sans Devanagari', sans-serif"
    : "'Inter', system-ui, sans-serif";

  const publishDate = new Date(article.published_at).toLocaleDateString('en-IN');

  return `<!DOCTYPE html>
<html lang="${article.language}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${article.seo.title}</title>
<meta name="description" content="${article.seo.description}">
<link rel="canonical" href="${article.seo.canonical}">

<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:title" content="${article.title}">
<meta property="og:description" content="${article.excerpt}">
<meta property="og:image" content="${article.cover}">
<meta property="og:url" content="${article.seo.canonical}">
<meta property="og:site_name" content="JusticeFirms Journal">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${article.title}">
<meta name="twitter:description" content="${article.excerpt}">
<meta name="twitter:image" content="${article.cover}">

<!-- Article Meta -->
<meta property="article:published_time" content="${article.published_at}">
<meta property="article:author" content="${article.author.name}">
<meta property="article:section" content="${article.category.primary}">

<meta name="robots" content="index, follow, max-image-preview:large">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>
body{
  margin:0;
  font-family:${fontFamily};
  background:#FDFDFB;
  color:#0B0C0E;
  line-height:1.8;
}
header{
  position:fixed;
  top:0;left:0;right:0;
  height:72px;
  background:#0B0C0E;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 24px;
  z-index:100;
}
header a{color:#fff;text-decoration:none;font-weight:600}
.hero{
  padding:140px 24px 80px;
  background:linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.85)),url('${article.cover}');
  background-size:cover;
  background-position:center;
  color:#fff;
  text-align:center;
}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(32px,6vw,56px)}
.hero p{max-width:800px;margin:0 auto}
.meta{margin-top:20px;font-size:14px;opacity:.85}
article{
  max-width:800px;
  margin:0 auto;
  padding:80px 24px;
}
article h2,article h3{
  font-family:'Playfair Display',serif;
  margin-top:40px;
}
article p,article li{font-size:18px}
blockquote{
  border-left:4px solid #D4AF37;
  padding-left:20px;
  color:#555;
  margin:32px 0;
}
.cta{
  margin:60px 0;
  padding:32px;
  background:linear-gradient(135deg,#D4AF37,#B89A2E);
  border-radius:16px;
  text-align:center;
}
.cta a{
  display:inline-block;
  margin-top:16px;
  padding:12px 28px;
  background:#0B0C0E;
  color:#fff;
  border-radius:40px;
  text-decoration:none;
  font-weight:600;
}
.related{
  background:#f8f8f6;
  padding:80px 24px;
}
.related-grid{
  max-width:1200px;
  margin:0 auto;
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:24px;
}
.related-card{
  background:#fff;
  padding:24px;
  border-radius:16px;
  cursor:pointer;
}
footer{
  background:#0B0C0E;
  color:#aaa;
  text-align:center;
  padding:40px 24px;
}
</style>

<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"Article",
  "headline":"${article.title}",
  "description":"${article.excerpt}",
  "image":"${article.cover}",
  "datePublished":"${article.published_at}",
  "author":{"@type":"Person","name":"${article.author.name}"},
  "publisher":{
    "@type":"Organization",
    "name":"JusticeFirms Journal"
  },
  "mainEntityOfPage":{
    "@type":"WebPage",
    "@id":"${article.seo.canonical}"
  }
}
</script>
</head>

<body>

<header>
  <a href="./index.html">JusticeFirms Journal</a>
  <a href="./index.html">← Back</a>
</header>

<section class="hero">
  <div class="category">${article.category.primary} › ${article.category.secondary}</div>
  <h1>${article.title}</h1>
  <p>${article.excerpt}</p>
  <div class="meta">
    ${article.author.name} • ${publishDate} • ${article.reading_time}
  </div>
</section>

<article>
${article.content}

<div class="cta">
  <h3>${isHindi ? 'कानूनी सहायता चाहिए?' : 'Need Legal Help?'}</h3>
  <a href="https://justicefirms.com/contact">
    ${isHindi ? 'परामर्श बुक करें' : 'Book Consultation'}
  </a>
</div>
</article>

<section class="related">
  <h2 style="text-align:center">${isHindi ? 'संबंधित लेख' : 'Related Articles'}</h2>
  <div class="related-grid" id="relatedGrid"></div>
</section>

<footer>
  <p>© 2026 JusticeFirms Journal</p>
</footer>

<script>
fetch('./articles.json')
  .then(r => r.json())
  .then(data => {
    const grid = document.getElementById('relatedGrid');
    const related = data.articles
      .filter(a => a.id !== '${article.id}' && a.category.primary === '${article.category.primary}')
      .slice(0,3);

    grid.innerHTML = related.map(a => \`
      <div class="related-card" onclick="location.href='./\${a.slug}.html'">
        <h3>\${a.title}</h3>
        <p>\${a.excerpt}</p>
      </div>
    \`).join('');
  });
</script>

</body>
</html>`;
}

// =======================
// GENERATE FILES
// =======================
articles.forEach(article => {
  const html = generateArticlePage(article);
  const filePath = path.join(__dirname, `${article.slug}.html`);
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`✅ Generated: ${article.slug}.html`);
});

console.log(`\n🎉 Done! Generated ${articles.length} SEO-ready article pages.`);
