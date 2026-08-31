import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static assets from root
app.use(express.static(__dirname));

// Route handling for HTML files and fallback
app.get('*', (req, res) => {
  const reqPath = req.path === '/' ? '/index.html' : req.path;
  const filePath = path.join(__dirname, reqPath.endsWith('.html') ? reqPath : `${reqPath}.html`);
  
  res.sendFile(filePath, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'index.html'));
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio server running at http://0.0.0.0:${PORT}`);
});
