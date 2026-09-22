const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'icon-src');
const files = {
  'favicon-48.png': 'favicon-48.png.b64',
  'favicon-48x48.png': 'favicon-48x48.png.b64',
  'favicon-192.png': 'favicon-192.png.b64',
  'apple-touch-icon.png': 'apple-touch-icon.png.b64',
  'images/tsm-icon-192.png': 'favicon-192.png.b64'
};
for (const [rel, name] of Object.entries(files)) {
  const src = path.join(dir, name);
  if (!fs.existsSync(src)) {
    console.warn('skip missing', name);
    continue;
  }
  const dest = path.join(__dirname, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(fs.readFileSync(src, 'utf8'), 'base64'));
  console.log('wrote', rel);
}
