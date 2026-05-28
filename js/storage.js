function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.innerHTML = '☀️ Світла';
    } else {
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.innerHTML = '🌙 Темна';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.innerHTML = isDark ? '☀️ Світла' : '🌙 Темна';
    }
}

function initVisitCounter() {
    let count = parseInt(localStorage.getItem('visitCount') || '0');
    count++;
    localStorage.setItem('visitCount', count.toString());

    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().toLocaleDateString('uk-UA');
    localStorage.setItem('lastVisit', now);

    if (count > 1 && lastVisit) {
        showWelcomeBack(count, lastVisit);
    }
}

function showWelcomeBack(count, lastVisit) {
    const toast = document.createElement('div');
    toast.className = 'welcome-toast';
    toast.innerHTML = `<strong>Ласкаво просимо назад!</strong><br>Ви відвідали сайт ${count} разів.<br>Останній візит: ${lastVisit}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

function saveGalleryFilter(filter) {
    localStorage.setItem('galleryFilter', filter);
}

function getGalleryFilter() {
    return localStorage.getItem('galleryFilter') || 'all';
}

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initVisitCounter();

    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
});