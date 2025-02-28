
const fs = require("fs");
const path = require("path");

module.exports = () => {
   const promotionsDir = path.join(__dirname, "../assets/images/promotions");
   const files = fs.readdirSync(promotionsDir);
   return files.filter(file => /\.(jpe?g|png|webp)$/i.test(file)).map(file => `/assets/images/promotions/${file}`);
};
