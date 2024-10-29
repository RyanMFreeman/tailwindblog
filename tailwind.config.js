/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{css,html,js}", "./pages/taildemo.html", "./pages/create-post.html", './pages/posts.html'],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

