const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'pages', 'css', and 'js' directories
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'src')) );


// MongoDB Atlas connection
mongoose.connect('mongodb+srv://ryanmfreeman:zKIU7q4zcdlkbxpS@forumcluster.h63xq.mongodb.net/?retryWrites=true&w=majority&appName=forumCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Blog post schema
const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Route to fetch all blog posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Route to create a new blog post
app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new BlogPost({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create post' });
  }
});

// Route to serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'posts.html')); // Correct path
});

app.get('/css', (req, res) => {
  res.sendFile(path.join(__dirname, 'css/tailstyles.css'));
});

app.get('/css/tailstyles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'css', 'tailstyles.css'));
});

app.get('/js/blog.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'js', 'blog.js'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


