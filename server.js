
const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

// Serve static files from the out directory
app.use(express.static(path.join(__dirname, 'out')));

// For any route, send the index.html file
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}\n`);
  console.log(`   Press Ctrl+C to stop the server\n`);
});
