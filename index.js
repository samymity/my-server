const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// Serve static files from public directory
app.use(express.static('public'));

// Mock user database
const users = [
  { username: 'demo', password: 'password123' }
];

// Mock stories database
const stories = [
  { id: 1, title: 'First Story', content: 'This is the first story', author: 'demo' },
  { id: 2, title: 'Second Story', content: 'This is the second story', author: 'demo' }
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({ success: true, username: user.username });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get stories endpoint
app.get('/api/stories', (req, res) => {
  res.json(stories);
});

// Add new story endpoint
app.post('/api/stories', (req, res) => {
  const { title, content, author } = req.body;
  const newStory = {
    id: stories.length + 1,
    title,
    content,
    author
  };
  stories.push(newStory);
  res.json(newStory);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});