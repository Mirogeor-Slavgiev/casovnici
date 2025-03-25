document.addEventListener('DOMContentLoaded', function() {
    displayWatches();
    prepareOrderButtons();
    prepareFilters();
});

function displayWatches() {
    const watchGrids = document.querySelectorAll('.watch-grid');
    
    if (watchGrids.length === 2) { // Ако имаме две решетки (като в promo.html)
        const promoGrid = watchGrids[0]; // Първа решетка - продукти със стара цена
        const promoWatches = watches.filter(watch => watch.oldPrice);
        promoGrid.innerHTML = '';
        promoWatches.forEach(watch => createWatchCard(watch, promoGrid));
        
        const newGrid = watchGrids[1]; // Втора решетка - нови продукти
        const newWatches = watches.filter(watch => watch.isNew);
        newGrid.innerHTML = '';
        newWatches.forEach(watch => createWatchCard(watch, newGrid));
    } else { // Ако имаме една решетка (като в shop.html) 
        const watchGrid = watchGrids[0];
        watchGrid.innerHTML = '';
        watches.forEach(watch => createWatchCard(watch, watchGrid));
    }
}

function createWatchCard(watch, container) {
    const card = document.createElement('div');
    card.classList.add('watch-card');
    card.setAttribute('category', watch['category']);
    
    card.innerHTML = `
        <a href="images/watches/${watch.image}" target="_blank">
            <img src="images/watches/${watch.image}" alt="${watch.name}">
        </a>
        <h3>${watch.name}</h3>
        <p class="price">
            ${watch.oldPrice ? 
                `<span class="old-price">${watch.oldPrice} лв.</span>
                 <span class="new-price">${watch.newPrice} лв.</span>` 
                : 
                `${watch.newPrice} лв.`}
        </p>
        <p class="description">
            ${watch.description}
        </p>
        ${watch.isNew ? '<div class="new-badge">НОВО!</div>' : ''}
        <button class="button" order="${watch.name}">Поръчай</button>
    `;
    
    container.appendChild(card);
}

function prepareOrderButtons() {
    const orderButtons = document.querySelectorAll('.button');
        
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const watchName = button.getAttribute('order');
            const subject = `Поръчка на ${watchName}`;
            const body = `Искам да си закупя ${watchName}. Моят адрес за доставка е...`;
            
            window.location.href = `contact.html?subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(body)}`;
        });
    });
}

function prepareFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const watchCards = document.querySelectorAll('.watch-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('category');
            
            watchCards.forEach(card => {
                if (category === 'all' || card.getAttribute('category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}