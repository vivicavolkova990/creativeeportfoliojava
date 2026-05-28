document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    function attachDragEvents(card) {
        if (card.hasAttribute('data-drag-initialized')) return;
        card.setAttribute('data-drag-initialized', 'true');
        card.setAttribute('draggable', 'true');
        card.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.id);
            this.classList.add('dragging');
        });
        card.addEventListener('dragend', function() {
            this.classList.remove('dragging');
            saveOrder();
        });
    }

    function saveOrder() {
        const order = Array.from(gallery.querySelectorAll('.project-card')).map(card => card.id);
        localStorage.setItem('projectOrder', JSON.stringify(order));
    }

    function restoreOrder() {
        const savedOrder = localStorage.getItem('projectOrder');
        if (!savedOrder) return;
        const orderIds = JSON.parse(savedOrder);
        const cards = Array.from(gallery.querySelectorAll('.project-card'));
        const idToCard = new Map();
        cards.forEach(card => idToCard.set(card.id, card));
        orderIds.forEach(id => {
            const card = idToCard.get(id);
            if (card) gallery.appendChild(card);
        });
    }

    function initDrag() {
        const cards = gallery.querySelectorAll('.project-card');
        cards.forEach(card => attachDragEvents(card));
        restoreOrder();
    }

    gallery.addEventListener('dragover', function(e) {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        if (!dragging || dragging.parentNode !== gallery) return;
        const afterElement = getDragAfterElement(gallery, e.clientY);
        if (afterElement) {
            gallery.insertBefore(dragging, afterElement);
        } else {
            gallery.appendChild(dragging);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.project-card:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            }
            return closest;
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    const observer = new MutationObserver(function(mutations, obs) {
        if (gallery.children.length > 0) {
            initDrag();
            obs.disconnect();
        }
    });
    observer.observe(gallery, { childList: true });
});