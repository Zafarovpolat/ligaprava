const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BUILD_DIR = path.join(__dirname, '..', 'build');

// Clean build directory
if (fs.existsSync(BUILD_DIR)) {
  fs.rmSync(BUILD_DIR, { recursive: true, force: true });
}
fs.mkdirSync(BUILD_DIR, { recursive: true });

console.log('📦 Building production version...\n');

// 1. Compile SCSS to CSS (minified)
console.log('1. Compiling SCSS...');
execSync('npm run build-prod', { stdio: 'inherit' });

// 2. Copy HTML files
console.log('\n2. Copying HTML files...');
const htmlFiles = fs.readdirSync(__dirname + '/..')
  .filter(file => file.endsWith('.html'));
htmlFiles.forEach(file => {
  fs.copyFileSync(
    path.join(__dirname, '..', file),
    path.join(BUILD_DIR, file)
  );
  console.log(`   ✓ ${file}`);
});

// 3. Copy PHP file if exists
if (fs.existsSync(path.join(__dirname, '..', 'index.php'))) {
  fs.copyFileSync(
    path.join(__dirname, '..', 'index.php'),
    path.join(BUILD_DIR, 'index.php')
  );
  console.log('   ✓ index.php');
}

// 4. Copy CSS folder
console.log('\n3. Copying CSS folder...');
const cssDir = path.join(BUILD_DIR, 'css');
fs.mkdirSync(cssDir, { recursive: true });
const cssFiles = fs.readdirSync(path.join(__dirname, '..', 'css'));
cssFiles.forEach(file => {
  if (file.endsWith('.css') || file.endsWith('.map')) {
    fs.copyFileSync(
      path.join(__dirname, '..', 'css', file),
      path.join(cssDir, file)
    );
  }
});
console.log(`   ✓ Copied ${cssFiles.filter(f => f.endsWith('.css')).length} CSS file(s)`);

// 5. Copy JS folder
console.log('\n4. Copying JS folder...');
const jsSourceDir = path.join(__dirname, '..', 'js');
const jsDestDir = path.join(BUILD_DIR, 'js');
fs.mkdirSync(jsDestDir, { recursive: true });

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursiveSync(jsSourceDir, jsDestDir);
console.log('   ✓ JS folder copied');

// 6. Copy images folder
console.log('\n5. Copying images folder...');
const imagesSourceDir = path.join(__dirname, '..', 'images');
const imagesDestDir = path.join(BUILD_DIR, 'images');
copyRecursiveSync(imagesSourceDir, imagesDestDir);
console.log('   ✓ Images folder copied');

console.log('\n✅ Build complete! Files are in the "build" folder.');
console.log('📤 Ready to upload to FTP!');

