// js/blog.js

// Function to handle post submission
document.getElementById('postForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
  
    try {
      const response = await fetch('https://tailblogtest-b7c37ddcb6a2.herokuapp.com/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
  
      if (response.ok) {
        alert('Post created successfully!');
        document.getElementById('postForm').reset();
      } else {
        alert('Failed to create post.');
      }
    } catch (error) {
      alert('Error:', error);
    }
  });
  
  // Function to fetch and display blog posts
  async function fetchPosts() {
    try {
      const response = await fetch('https://tailblogtest-b7c37ddcb6a2.herokuapp.com/api/posts');
      const posts = await response.json();
      const postsContainer = document.getElementById('postsContainer');
      postsContainer.innerHTML = posts.map(post => `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden p-4">
          <h3 class="text-lg font-semibold mb-2">${post.title}</h3>
          <p class="text-gray-500 text-sm">${new Date(post.date).toLocaleString()}</p>
          <p class="mt-2">${post.content}</p>
        </div>
      `).join('');
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  
  // Call fetchPosts to load posts when the page is ready
  if (document.getElementById('postsContainer')) {
    fetchPosts();
  }
  
// Fetch blog posts from API

async function fetchPosts() {
    try {
      const response = await fetch('/api/posts');
      const posts = await response.json();
  
      const postsContainer = document.getElementById('postsContainer');
      postsContainer.innerHTML = '';
  
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'bg-slate-700 p-4 rounded-lg shadow-md';
        postElement.style.width = '360px';
        postElement.style.minHeight = '241px';
        postElement.style.maxHeight = '500px';
        // postElement.style.height = '241px';
        postElement.innerHTML = `
                  <h3 class="text-lg font-semibold text-slate-100">${post.title}</h3>
                  <div class="text-slate-300 mt-2 overflow-y-auto max-h-96 ">  <!-- Set max height and overflow on this content container -->
                        <pre class="whitespace-pre-wrap">${post.content}</pre>
                   </div>
                  <p class="text-gray-400 text-sm pt-2">${new Date(post.date).toLocaleDateString()}</p>
              `;
              postsContainer.appendChild(postElement);
      }); }
       catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  
  document.addEventListener('DOMContentLoaded', fetchPosts);

  setInterval(fetchPosts, 10000);
