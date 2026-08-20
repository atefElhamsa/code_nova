const https = require('https');
const fs = require('fs');
const file = fs.createWriteStream("static/img/InstaPay-Logo.webp"); // overwrite with a clean one
https.get("https://www.egyptianbanks.com/wp-content/uploads/2022/03/InstaPay-logo.png", {
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
}).on('error', (e) => console.log(e));
