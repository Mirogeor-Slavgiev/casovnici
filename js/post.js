document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('slug');
    const post = posts.find(p => p.slug === postSlug);
    const container = document.getElementById('postContainer');

    container.innerHTML = `
        <h1 class="post-title">${post.title}</h1>
        <p class="post-date">Публикувано на ${post.date}</p>
        <img src="images/blog/${post.image}" alt="${post.title}" class="post-image">
        <div class="post-content">${post.content}</div>
        <a href="blog.html" class="back-link">&larr; Назад към блога</a>
    `;
});