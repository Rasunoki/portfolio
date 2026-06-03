#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Handle both Windows and Unix paths
const srcPath = path.join(
  process.env.USERPROFILE || process.env.HOME,
  'AppData',
  'Roaming',
  'Code',
  'User',
  'globalStorage',
  'github.copilot-chat',
  'copilot-cli-images',
  '1780499763761-cdr4ibyw.png'
);

const destPath = path.join(__dirname, 'public', 'profile.png');

console.log('Copying profile image...');
console.log('Source:', srcPath);
console.log('Destination:', destPath);

try {
  // Check if source file exists
  if (!fs.existsSync(srcPath)) {
    console.error('✗ Source image not found at:', srcPath);
    process.exit(1);
  }

  // Create destination directory if it doesn't exist
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Copy the file
  fs.copyFileSync(srcPath, destPath);
  console.log('✓ Profile image copied successfully!');
  console.log('Output:', destPath);
} catch (error) {
  console.error('✗ Failed to copy profile image:');
  console.error(error.message);
  process.exit(1);
}

