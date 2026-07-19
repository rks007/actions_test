const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic API route for video metadata
app.get('/api/videos', (req, res) => {
  res.json([
    { id: 1, title: 'Introduction to CI/CD', author: 'DevOps Master', views: '1.2M' },
    { id: 2, title: 'Dockerizing Node.js Apps', author: 'Container Guru', views: '850K' },
    { id: 3, title: 'GitHub Actions from Scratch', author: 'Automation Pro', views: '2.1M' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
