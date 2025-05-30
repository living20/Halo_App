const fs = require('fs');

try {
  fs.renameSync('d:/Projects/living/Hal0App/src/screens/home/HomeScreen.tsx.new', 
                'd:/Projects/living/Hal0App/src/screens/home/HomeScreen.tsx');
  console.log('File renamed successfully');
} catch (err) {
  console.error('Error renaming file:', err);
}
