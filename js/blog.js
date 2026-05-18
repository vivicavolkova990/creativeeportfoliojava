const posts = [
  {
    title: 'Огляд переваг Bootstrap 5',
    date: '15 березня 2025',
    author: 'Автор1',
    text: 'Bootstrap 5 став революційним оновленням: відмова від jQuery, нові утиліти, покращена сіткова система...',
    fullText: 'Bootstrap 5 став революційним оновленням: відмова від jQuery, нові утиліти, покращена сіткова система та нативні компоненти. Докладніше про всі переваги читайте у цьому пості.'
  },
  {
    title: 'Мій перший проект на JavaScript',
    date: '5 лютого 2025',
    author: 'Автор2',
    text: 'Покроковий гайд зі створення першого JS-проекту: від валідації форм до динамічної генерації контенту...',
    fullText: 'Розповідаю про свій досвід створення інтерактивного портфоліо з нуля. Від валідації форм до динамічної генерації контенту. Код та приклади.'
  },
  {
    title: 'CSS Grid vs Flexbox',
    date: '20 квітня 2025',
    author: 'Автор3',
    text: 'Порівнюємо дві найпотужніші технології верстки. Коли використовувати Grid, а коли Flexbox?...',
    fullText: 'CSS Grid чудово підходить для двовимірних макетів (рядки + колонки), тоді як Flexbox — для одновимірних (ряд або колонка). Розглянемо приклади.'
  }
];
function createPostCard(post, index) {
  let card = document.createElement('div');
  card.className = 'card mb-3 post-card';

  let body = document.createElement('div');
  body.className = 'card-body';

  let title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = post.title;

  let meta = document.createElement('p');
  meta.className = 'card-text text-muted';
  meta.innerHTML = post.date + ' &nbsp;|&nbsp; ' + post.author;

  let shortText = document.createElement('p');
  shortText.className = 'card-text';
  shortText.textContent = post.text;

  let fullTextDiv = document.createElement('div');
  fullTextDiv.id = 'fullText-' + index;
  fullTextDiv.style.display = 'none';
  fullTextDiv.className = 'mt-2 p-3 bg-light rounded';
  fullTextDiv.textContent = post.fullText;

  let readMoreBtn = document.createElement('a');
  readMoreBtn.className = 'btn btn-outline-primary btn-sm';
  readMoreBtn.innerHTML = 'Читати далі &rarr;';
  readMoreBtn.style.cursor = 'pointer';
  readMoreBtn.addEventListener('click', function() {
    toggleFullText(index, readMoreBtn);
  });
  body.appendChild(title);
  body.appendChild(meta);
  body.appendChild(shortText);
  body.appendChild(fullTextDiv);
  body.appendChild(readMoreBtn);
  card.appendChild(body);
  return card;
}
function toggleFullText(index, button) {
  let fullText = document.getElementById('fullText-' + index);
  if (fullText.style.display === 'none') {
    fullText.style.display = 'block';
    button.innerHTML = 'Згорнути ▲';
    button.classList.remove('btn-outline-primary');
    button.classList.add('btn-primary');
  } else {
    fullText.style.display = 'none';
    button.innerHTML = 'Читати далі &rarr;';
    button.classList.remove('btn-primary');
    button.classList.add('btn-outline-primary');
  }
}
function renderBlogPosts() {
  let container = document.getElementById('blogPosts');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < posts.length; i++) {
    container.appendChild(createPostCard(posts[i], i));
  }
}
function initBlogSearch() {
  let searchInput = document.getElementById('blogSearch');
  if (!searchInput) return;
  searchInput.addEventListener('input', function() {
    let query = this.value.toLowerCase();
    let posts = document.querySelectorAll('#blogPosts .post-card');
    posts.forEach(post => {
      let title = post.querySelector('.card-title')?.textContent.toLowerCase() || '';
      let text = post.querySelector('.card-text:not(.text-muted)')?.textContent.toLowerCase() || '';
      if (title.includes(query) || text.includes(query)) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });
  });
}
function initSiteSearchForBlog() {
  let siteSearch = document.getElementById('siteSearch');
  if (!siteSearch) return;
  siteSearch.addEventListener('input', function() {
    let query = this.value.toLowerCase();
    let posts = document.querySelectorAll('#blogPosts .post-card');
    posts.forEach(post => {
      let title = post.querySelector('.card-title')?.textContent.toLowerCase() || '';
      let text = post.querySelector('.card-text:not(.text-muted)')?.textContent.toLowerCase() || '';
      if (title.includes(query) || text.includes(query)) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });
  });
}
if (document.getElementById('blogPosts')) {
  renderBlogPosts();
  initBlogSearch();
  initSiteSearchForBlog();
}