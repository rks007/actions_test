const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic API route for video metadata
app.get('/api/videos', (req, res) => {
  res.json([
    { id: 1, title: 'Introduction to CICD', author: 'DevOps Master', views: '1.2M' },
    { id: 2, title: 'Dockerizing Node.js Apps', author: 'Container Guru', views: '850K' },
    { id: 3, title: 'GitHub Actions from Scratch', author: 'Automation Pro', views: '2.1M' },
    { id: 4, title: 'Kubernetes for Beginners', author: 'Cloud Expert', views: '1.5M' },
    { id: 5, title: 'CI/CD Best Practices', author: 'DevOps Evangelist', views: '900K' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
