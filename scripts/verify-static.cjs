const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const errors = [];
const sourceFiles = [];
function walk(dir) {
  for (const item of fs.readdirSync(dir, {withFileTypes: true})) {
    const file = path.join(dir, item.name);
    if (item.isDirectory() && !['node_modules', '.next', '.git'].includes(item.name)) walk(file);
    else if (item.isFile() && /\.(tsx?|mts|cts)$/.test(item.name) && !item.name.endsWith('.d.ts')) sourceFiles.push(file);
  }
}
walk(root);
for (const file of sourceFiles) {
  try {
    const result = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      fileName: file,
      reportDiagnostics: true,
      compilerOptions: {jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext},
    });
    for (const diagnostic of result.diagnostics || []) {
      if (diagnostic.category === ts.DiagnosticCategory.Error) errors.push(`${path.relative(root, file)}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ')}`);
    }
  } catch (error) { errors.push(`${path.relative(root, file)}: ${error.message}`); }
}
for (const file of ['package.json', 'firebase.json', 'tsconfig.json']) {
  try { JSON.parse(fs.readFileSync(path.join(root, file), 'utf8')); }
  catch (error) { errors.push(`${file}: invalid JSON (${error.message})`); }
}
const css = fs.readFileSync(path.join(root, 'app/globals.css'), 'utf8');
for (const layout of ['editorial','swiss','split','terminal','timeline']) if (!css.includes(`data-layout=${layout}`)) errors.push(`Missing CSS for layout ${layout}.`);
if (!css.includes('.hero{')) errors.push('Default Cinema layout CSS is missing.');
for (const palette of ['signal','cobalt','editorial','teal','terminal','blueprint','paper']) if (!css.includes(`data-theme=${palette}`)) errors.push(`Missing CSS for palette ${palette}.`);
let depth = 0, quote = '', comment = false, escape = false;
for (let i = 0; i < css.length; i++) {
  const c = css[i], next = css[i + 1];
  if (comment) { if (c === '*' && next === '/') { comment = false; i++; } continue; }
  if (quote) { if (escape) escape = false; else if (c === '\\') escape = true; else if (c === quote) quote = ''; continue; }
  if (c === '/' && next === '*') { comment = true; i++; continue; }
  if (c === '"' || c === "'") { quote = c; continue; }
  if (c === '{') depth++;
  if (c === '}' && --depth < 0) { errors.push('app/globals.css: unexpected closing brace'); break; }
}
if (depth !== 0 || quote || comment) errors.push('app/globals.css: unbalanced braces, strings, or comments');
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (packageJson.dependencies.next !== '16.4.2') errors.push('package.json: expected patched Next.js 16.4.2');
if (packageJson.dependencies.react !== '19.3.1' || packageJson.dependencies['react-dom'] !== '19.3.1') errors.push('package.json: React and React DOM versions must match at 19.3.1');
const admin = fs.readFileSync(path.join(root, 'app/admin/page.tsx'), 'utf8');
const mediaLimits = fs.readFileSync(path.join(root, 'lib/media-limits.ts'), 'utf8');
if (!admin.includes('validateMediaUpload')) errors.push('Admin uploader does not use shared media validation.');
if (!mediaLimits.includes('95_000_000')) errors.push('The shared video upload limit is not exactly 95,000,000 bytes.');
const header = fs.readFileSync(path.join(root, 'components/site-header.tsx'), 'utf8');
if (!header.includes('SM Automations')) errors.push('Site header brand fallback is missing.');
if (header.includes('useTheme') || header.includes('SunMoon')) errors.push('A visitor-facing theme switcher is present in the public header.');
const settingsRoute = fs.readFileSync(path.join(root, 'app/api/admin/settings/route.ts'), 'utf8');
for (const preset of ['cinema','editorial','swiss','split','terminal','timeline']) if (!settingsRoute.includes(`'${preset}'`)) errors.push(`Admin API does not allow layout preset ${preset}.`);
for (const palette of ['signal','cobalt','editorial','teal','terminal','blueprint','paper']) if (!settingsRoute.includes(`'${palette}'`)) errors.push(`Admin API does not allow color palette ${palette}.`);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Static verification passed: ${sourceFiles.length} TypeScript/TSX files parsed, JSON parsed, CSS delimiters balanced, pinned framework versions checked, shared upload guard present.`);
console.log('This is a syntax/static check only; it does not replace a full TypeScript typecheck or Next.js production build.');
