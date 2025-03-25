let currentTab = 'watches';
let editingWatchId = null;
let editingPostId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadWatches();
    loadPosts();
});

function switchTab(tab) {
    currentTab = tab;

    document.getElementById('watchesSection').style.display = 
        tab === 'watches' ? 'block' : 'none';
    document.getElementById('postsSection').style.display = 
        tab === 'posts' ? 'block' : 'none';

    updateJsonOutput(tab);
}

function loadWatches() {
    const watchesGrid = document.querySelector('.watches-grid');
    watchesGrid.innerHTML = '';
    
    watches.forEach((watch, index) => {
        const div = document.createElement('div');
        div.className = 'watch-item';
        div.innerHTML = `
            <div class="watch-actions">
                <button onclick="editWatch(${index})">✏️</button>
                <button onclick="deleteWatch(${index})">🗑️</button>
            </div>
            <span style="margin-left: 10px">${watch.name}</span>
        `;
        watchesGrid.appendChild(div);
    });
}

function editWatch(index) {
    const watch = watches[index];
    document.getElementById('category').value = watch['category'];
    document.getElementById('watchImage').value = watch.image;
    document.getElementById('name').value = watch.name;
    document.getElementById('oldPrice').value = watch.oldPrice || '';
    document.getElementById('newPrice').value = watch.newPrice;
    document.getElementById('description').value = watch.description;
    document.getElementById('isNew').checked = watch.isNew;
    editingWatchId = index;
    document.getElementById('watchForm').style.display = 'block';
}

function deleteWatch(index) {
    watches.splice(index, 1);
    loadWatches();
    updateJsonOutput();
}

function loadPosts() {
    const postsGrid = document.querySelector('.posts-grid');
    postsGrid.innerHTML = '';
    
    posts.forEach((post, index) => {
        const div = document.createElement('div');
        div.className = 'post-item';
        div.innerHTML = `
            <div class="post-actions">
                <button onclick="editPost(${index})">✏️</button>
                <button onclick="deletePost(${index})">🗑️</button>
            </div>
            <span style="margin-left: 10px">${post.title}</span>
        `;
        postsGrid.appendChild(div);
    });
}

function editPost(index) {
    const post = posts[index];
    document.getElementById('postTitle').value = post.title;
    document.getElementById('postDate').value = post.date;
    document.getElementById('postImage').value = post.image;
    document.getElementById('postSnippet').value = post.snippet;
    document.getElementById('postContent').value = post.content;
    editingPostId = index;
    document.getElementById('postForm').style.display = 'block';
}

function deletePost(index) {
    posts.splice(index, 1);
    loadPosts();
    updateJsonOutput();
}

function toggleForm(type) {
    if(type === 'watch') {
        document.getElementById('watchForm').style.display = 'block';
        document.getElementById('postForm').style.display = 'none';
    } else {
        document.getElementById('postForm').style.display = 'block';
        document.getElementById('watchForm').style.display = 'none';
    }
}

function cancelEdit() {
    document.getElementById('watchForm').style.display = 'none';
    document.getElementById('postForm').style.display = 'none';
    editingWatchId = null;
    editingPostId = null;
}

function saveWatch() {
    const watch = {
        "category": document.getElementById('category').value,
        "image": document.getElementById('watchImage').value,
        "name": document.getElementById('name').value,
        "oldPrice": document.getElementById('oldPrice').value || null,
        "newPrice": document.getElementById('newPrice').value,
        "description": document.getElementById('description').value,
        "isNew": document.getElementById('isNew').checked,
        "order": document.getElementById('name').value
    };

    if(editingWatchId !== null) {
        watches[editingWatchId] = watch;
    } else {
        watches.push(watch);
    }

    loadWatches();
    cancelEdit();
    updateJsonOutput();
}

function savePost() {
    const title = document.getElementById('postTitle').value;
    const slug = title.trim().toLowerCase().replace(/\s+/g, '-');

    const post = {
        title: title,
        date: document.getElementById('postDate').value,
        image: document.getElementById('postImage').value,
        snippet: document.getElementById('postSnippet').value,
        content: document.getElementById('postContent').value,
        slug: slug
    };

    if(editingPostId !== null) {
        posts[editingPostId] = post;
    } else {
        posts.push(post);
    }

    loadPosts();
    cancelEdit();
    updateJsonOutput();
}

function updateJsonOutput(type = currentTab) {
    let output = '';
    
    if(type === 'watches') {
        output = `const watches = ${JSON.stringify(watches, null, 4)};`;
    } else if(type === 'posts') {
        output = `const posts = ${JSON.stringify(posts, null, 4)};`;
    }
    
    document.getElementById('jsonOutput').textContent = output;
}

function exportChanges() {
    updateJsonOutput(currentTab);

    const jsonOutput = document.getElementById('jsonOutput').textContent;
    navigator.clipboard.writeText(jsonOutput).then(() => {
        let message = "";

        if (currentTab === 'watches') {
            message = "Промените са копирани! Замести в watches.js!";
        } else {
            message = "Промените са копирани! Замести в posts.js!";
        }         
        
        alert(message);
    });
}

document.getElementById('searchInputWatches').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    filterItems(searchTerm);
});

document.getElementById('searchInputPosts').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    filterItems(searchTerm);
});

document.getElementById('replaceWatches').addEventListener('click', function() {
    const jsonOutput = document.getElementById('jsonOutput').textContent;

    try {
        const jsonString = jsonOutput
            .replace(/^const watches = /, '')
            .replace(/;$/,'');

        const watchesData = JSON.parse(jsonString);

        fetch("replace_watches.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(watchesData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message || "Файлът с часовници е актуализиран успешно!");
        })
        .catch(error => {
            console.error("Грешка:", error);
            console.log("Грешка при актуализирането на watches.js.");
        });
    } catch (error) {
        console.log("Невалиден JSON. Провери jsonOutput.");
    }
});


function filterItems(searchTerm) {
    const items = document.querySelectorAll('.watch-item, .post-item');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? 'flex' : 'none';
    });
}