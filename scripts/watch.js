/**
 * Asset watcher — no dependencies.
 * Copies src/assets -> public on start, then re-copies on any change
 * so the Salla CLI preview session serves fresh assets.
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src', 'assets');
const DEST = path.join(__dirname, '..', 'public');

function copyAll() {
  fs.cpSync(SRC, DEST, { recursive: true });
  console.log('[watch] assets copied -> public @ ' + new Date().toLocaleTimeString());
}

copyAll();

let timer = null;
fs.watch(SRC, { recursive: true }, function () {
  clearTimeout(timer);
  timer = setTimeout(copyAll, 200);
});

console.log('[watch] watching src/assets for changes...');
setInterval(function () {}, 1 << 30);
