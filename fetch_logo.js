const https = require('https');
const fs = require('fs');

const file = fs.createWriteStream("static/img/instapay-logo.png");
https.get("https://logowik.com/content/uploads/images/instapay-egypt2596.logowik.com.webp", {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, function(response) {
  response.pipe(file);
  file.on("finish", () => {
    file.close();
    console.log("Download Completed, size:", fs.statSync("static/img/instapay-logo.png").size);
  });
});
