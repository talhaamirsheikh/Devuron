const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function traverseAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverseAndReplace(fullPath);
    } else if (/\.(js|jsx|css)$/.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;

      // Hex codes
      content = content.replace(/#F13A34/gi, '#4db9e0');
      content = content.replace(/#6A070E/gi, '#10475c');
      content = content.replace(/#8a1c1a/gi, '#185e78');
      content = content.replace(/#a52d2a/gi, '#207694');
      content = content.replace(/#c03e3a/gi, '#2b8eb3');
      content = content.replace(/#db4f4a/gi, '#38a6d1');

      // RGBA
      content = content.replace(/241\s*,\s*58\s*,\s*52/g, '77, 185, 224');

      // Tailwind red utilities
      content = content.replace(/text-red-500/g, 'text-[#4db9e0]');
      content = content.replace(/bg-red-500/g, 'bg-[#4db9e0]');
      content = content.replace(/border-red-500/g, 'border-[#4db9e0]');
      content = content.replace(/text-red-600/g, 'text-[#38a6d1]');
      content = content.replace(/bg-red-600/g, 'bg-[#38a6d1]');
      
      content = content.replace(/bg-red-50/g, 'bg-[#4db9e0]/10');
      content = content.replace(/text-red-800/g, 'text-[#10475c]');
      content = content.replace(/border-red-300/g, 'border-[#4db9e0]/30');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

traverseAndReplace(srcDir);
console.log('Replacement complete.');
