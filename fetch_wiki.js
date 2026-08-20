const https = require('https');
const fs = require('fs');
const file = fs.createWriteStream("static/img/InstaPay-Logo.webp");
https.get("https://upload.wikimedia.org/wikipedia/commons/4/4e/InstaPay_Logo.png", {
  headers: { 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5'
  }
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
