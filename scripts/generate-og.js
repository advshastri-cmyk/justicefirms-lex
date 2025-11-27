const fs = require('fs');
const path = require('path');
const satori = require('satori').default;
const { Resvg } = require('@resvg/resvg-js');

const postsDir = "src/posts";
const outDir = "_og";
if(!fs.existsSync(outDir)) fs.mkdirSync(outDir);

function readTitle(md){
  const m = md.match(/title:\s*"(.*)"/);
  return m? m[1] : 'JusticeFirms Article';
}

(async function(){
  const files = fs.readdirSync(postsDir).filter(f=>f.endsWith('.md'));
  for(const f of files){
    const slug = f.replace(/\.md$/, '').split('-').slice(3).join('-') || f.replace(/\.md$/,'');
    const md = fs.readFileSync(path.join(postsDir,f),'utf8');
    const title = readTitle(md);

    const jsx = {
      type: "div",
      props: {
        style: { width:1200, height:630, background:'#004080', color:'#fff', display:'flex', flexDirection:'column', justifyContent:'center', padding:80, fontFamily:'Arial' },
        children: [
          { type:'div', props:{ style:{ fontSize:60, fontWeight:700, lineHeight:1.1 }, children: title } },
          { type:'div', props:{ style:{ marginTop:40, fontSize:28, opacity:0.9 }, children: 'JusticeFirms Legal Blog' } }
        ]
      }
    };

    const svg = await satori(jsx, { width:1200, height:630, fonts:[] });
    const resvg = new Resvg(svg);
    const png = resvg.render().asPng();
    fs.writeFileSync(path.join(outDir, `${slug}.png`), png);
    console.log('OG generated for', slug);
  }
})();
