const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, '../src/assets/images');

const convertToJpg = async (pngPath) => {
  const jpgPath = pngPath.replace('.png', '.jpg');
  await sharp(pngPath)
    .jpeg({ quality: 85 })
    .toFile(jpgPath);
  console.log(`Converted ${pngPath} to ${jpgPath}`);
};

fs.readdirSync(imageDir)
  .filter(file => file.endsWith('.png'))
  .forEach(file => {
    convertToJpg(path.join(imageDir, file));
  }); 