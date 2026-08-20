const https = require('https');
const fs = require('fs');

const file = fs.createWriteStream("static/img/InstaPay-Logo.webp"); // overwrite their bad file
https.get("https://upload.wikimedia.org/wikipedia/commons/4/4e/InstaPay_Logo.png", {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, function(response) {
  if (response.statusCode === 200) {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log("Download Completed, size:", fs.statSync("static/img/InstaPay-Logo.webp").size);
      });
  } else {
      console.log("Failed to download, status code:", response.statusCode);
  }
});
