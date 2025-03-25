document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('blogContainer');
    
    posts.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('blog-post');
        
        article.innerHTML = `
            <h2>${post.title}</h2>
            <p class="post-date">Публикувано на ${post.date}</p>
            <img src="images/blog/${post.image}" alt="${post.title}" class="post-image">
            <p>${post.snippet}</p>
            <a href="post.html?slug=${post.slug}" class="read-more">Прочети още</a>
        `;
        
        container.appendChild(article);
    });
});