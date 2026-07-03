
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'application/font-woff',
  '.woff2': 'application/font-woff2',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Clean up the URL
  let urlPath = req.url;
  
  // Remove query parameters
  const queryIndex = urlPath.indexOf('?');
  if (queryIndex !== -1) {
    urlPath = urlPath.substring(0, queryIndex);
  }

  // Handle root
  if (urlPath === '/') {
    urlPath = '/index.html';
  }

  let filePath = '.' + urlPath;
  const fullPath = path.join(__dirname, 'out', filePath);

  // Get file extension
  const extname = String(path.extname(fullPath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Check if path exists and what it is
  fs.stat(fullPath, (statError, stats) => {
    if (statError) {
      if (statError.code === 'ENOENT') {
        // If not found and no extension, try adding .html
        if (!extname) {
          const htmlFilePath = fullPath + '.html';
          fs.readFile(htmlFilePath, (htmlError, htmlContent) => {
            if (!htmlError) {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(htmlContent, 'utf-8');
            } else {
              send404(res);
            }
          });
        } else {
          send404(res);
        }
      } else {
        console.error('Server Error:', statError);
        res.writeHead(500);
        res.end(`Server Error: ${statError.code}`);
      }
    } else if (stats.isDirectory()) {
      // If it's a directory, try to serve index.html
      const indexFilePath = path.join(fullPath, 'index.html');
      fs.readFile(indexFilePath, (indexError, indexContent) => {
        if (!indexError) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(indexContent, 'utf-8');
        } else {
          // If no index.html in directory, check if adding .html to the directory path works
          const htmlFilePath = fullPath + '.html';
          fs.readFile(htmlFilePath, (htmlError, htmlContent) => {
            if (!htmlError) {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(htmlContent, 'utf-8');
            } else {
              send404(res);
            }
          });
        }
      });
    } else if (stats.isFile()) {
      // It's a file, read and serve it
      fs.readFile(fullPath, (error, content) => {
        if (error) {
          console.error('Server Error:', error);
          res.writeHead(500);
          res.end(`Server Error: ${error.code}`);
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    } else {
      send404(res);
    }
  });
});

function send404(res) {
  const notFoundPath = path.join(__dirname, 'out', '404.html');
  fs.readFile(notFoundPath, (error, content) => {
    if (!error) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Page Not Found</h1>', 'utf-8');
    }
  });
}

server.listen(PORT, () => {
  console.log(`\n🚀 Static site server running at:`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`\n   Press Ctrl+C to stop the server\n`);
});
