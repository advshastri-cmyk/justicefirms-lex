const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

function ask(q){ return new Promise(res => rl.question(q, a => res(a.trim()))); }
function slugify(t){ return t.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,''); }

(async () => {
  console.log('\nCreate a new blog post\n');
  const title = await ask('Title: ');
  const date = await ask('Date (YYYY-MM-DD) [default: today]: ') || new Date().toISOString().slice(0,10);
  const category = await ask('Category [e.g. Corporate Law]: ') || 'Uncategorized';
  const tags = await ask('Tags (comma separated): ');
  const description = await ask('Short description (1-2 lines): ');
  const featured = await ask('Featured image (e.g. /assets/img/sample1.jpg) [optional]: ');
  rl.close();

  const slug = slugify(title || `post-${Date.now()}`);
  const filename = `${date}-${slug}.md`;
  const dir = path.join(process.cwd(), 'src', 'posts');
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true});

  const tagsArr = tags ? tags.split(',').map(s=>s.trim()).filter(Boolean) : [];
  const fm = [
    '---',
    `title: "${(title||'Untitled').replace(/"/g,'\\"')}"`,
    `date: ${date}`,
    `tags: [${tagsArr.map(t=>`"${t.replace(/"/g,'\\"')}"`).join(', ')}]`,
    `category: "${category.replace(/"/g,'\\"')}"`,
    `author: "${"Advocate R. Sharma"}"`,
    featured ? `featuredImage: "${featured}"` : '',
    `description: "${(description||'').replace(/"/g,'\\"')}"`,
    `permalink: "/${slug}/index.html"`,
    '---',
    '',
    'Write your article here in Markdown.',
    ''
  ].filter(Boolean).join('\n');

  const filepath = path.join(dir, filename);
  fs.writeFileSync(filepath, fm, 'utf8');
  console.log(`\nCreated ${filepath}\n`);
  console.log('Edit the file, then:');
  console.log(`  git add src/posts/${filename}`);
  console.log(`  git commit -m "Add post: ${title}"`);
  console.log('  git push\n');
})();
