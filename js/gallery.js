const projects = [
  {
    name: 'Інтернет-магазин',
    image: 'images/portfolio/project1.jpg',
    description: 'Адаптивний e-commerce сайт на Bootstrap',
    category: 'web'
  },
  {
    name: 'Мобільний додаток',
    image: 'images/portfolio/project2.jpg',
    description: 'UI/UX для сервісу доставки їжі',
    category: 'mobile'
  },
  {
    name: 'Лендінг-сторінка',
    image: 'images/portfolio/project3.jpg',
    description: 'Промо-сайт для стартапу в медицині',
    category: 'web'
  },
  {
    name: 'Дашборд',
    image: 'images/portfolio/project4.jpg',
    description: 'Панель аналітики з графіками',
    category: 'ui'
  },
  {
    name: 'Портал новин',
    image: 'images/portfolio/project5.jpg',
    description: 'Новинний сайт з динамічним контентом',
    category: 'web'
  },
  {
    name: 'Фітнес-трекер',
    image: 'images/portfolio/project6.jpg',
    description: 'Мобільний додаток для тренувань',
    category: 'mobile'
  }
];
function createProjectCard(project, index) {
  let col = document.createElement('div');
  col.className = 'col-sm-6 col-md-4 col-lg-3';
  col.setAttribute('data-category', project.category);
  let card = document.createElement('div');
  card.className = 'card h-100 project-card';
  card.id = 'project-' + index + '-' + Date.now();
  let imgWrapper = document.createElement('div');
  imgWrapper.className = 'card-img-wrapper';
  let img = document.createElement('img');
  img.className = 'card-img-top';
  img.src = project.image;
  img.alt = project.name;
  let overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.innerHTML = '<p>' + project.description + '</p><a class="btn btn-warning btn-sm">Детальніше</a>';
  imgWrapper.appendChild(img);
  imgWrapper.appendChild(overlay);
  let body = document.createElement('div');
  body.className = 'card-body';
  body.innerHTML = '<h5 class="card-title">' + project.name + '</h5><p class="card-text">' + project.description + '</p><span class="badge bg-primary">' + project.category + '</span>';
  card.appendChild(imgWrapper);
  card.appendChild(body);
  col.appendChild(card);
  card.addEventListener('click', function() {
    openLightbox(index);
  });
  return col;
}
function displayProjects(filter) {
  let gallery = document.getElementById('gallery');
  if (!gallery) return;
  gallery.innerHTML = '';
  for (let i = 0; i < projects.length; i++) {
    if (filter === 'all' || projects[i].category === filter) {
      let card = createProjectCard(projects[i], i);
      gallery.appendChild(card);
    }
  }
}
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  let overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.id = 'lightbox';

  let content = document.createElement('div');
  content.className = 'lightbox-content';

  let closeBtn = document.createElement('span');
  closeBtn.className = 'lightbox-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', closeLightbox);

  let img = document.createElement('img');
  img.src = projects[currentIndex].image;
  img.alt = projects[currentIndex].name;
  img.id = 'lightboxImg';

  let info = document.createElement('div');
  info.style.padding = '16px';
  info.id = 'lightboxInfo';
  info.innerHTML = '<h4>' + projects[currentIndex].name + '</h4><p>' + projects[currentIndex].description + '</p><span class="badge bg-primary">' + projects[currentIndex].category + '</span>';

  let nav = document.createElement('div');
  nav.className = 'lightbox-nav';
  let prevBtn = document.createElement('button');
  prevBtn.innerHTML = '&larr; Попередній';
  prevBtn.addEventListener('click', function() { navigateLightbox(-1); });
  let nextBtn = document.createElement('button');
  nextBtn.innerHTML = 'Наступний &rarr;';
  nextBtn.addEventListener('click', function() { navigateLightbox(1); });
  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);

  content.appendChild(closeBtn);
  content.appendChild(img);
  content.appendChild(info);
  content.appendChild(nav);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeLightbox();
  });
}
function navigateLightbox(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = projects.length - 1;
  if (currentIndex >= projects.length) currentIndex = 0;
  document.getElementById('lightboxImg').src = projects[currentIndex].image;
  document.getElementById('lightboxInfo').innerHTML = '<h4>' + projects[currentIndex].name + '</h4><p>' + projects[currentIndex].description + '</p><span class="badge bg-primary">' + projects[currentIndex].category + '</span>';
}
function closeLightbox() {
  let lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.remove();
}
function initFilters() {
    let filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;
    
    let savedFilter = 'all';
    if (typeof getGalleryFilter === 'function') {
        savedFilter = getGalleryFilter();
    }
    displayProjects(savedFilter);
    
    filterButtons.forEach(btn => {
        btn.classList.remove('active', 'btn-primary');
        btn.classList.add('btn-outline-primary');
        if (btn.getAttribute('data-category') === savedFilter) {
            btn.classList.add('active', 'btn-primary');
            btn.classList.remove('btn-outline-primary');
        }
    });
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => {
                b.classList.remove('active', 'btn-primary');
                b.classList.add('btn-outline-primary');
            });
            this.classList.add('active', 'btn-primary');
            this.classList.remove('btn-outline-primary');
            let category = this.getAttribute('data-category');
            displayProjects(category);
        });
    });
}
function initSiteSearch() {
  let siteSearch = document.getElementById('siteSearch');
  if (!siteSearch) return;
  siteSearch.addEventListener('input', function() {
    let query = this.value.toLowerCase();
    let cards = document.querySelectorAll('#gallery > div');
    cards.forEach(card => {
      let title = card.querySelector('.card-title');
      if (title && title.textContent.toLowerCase().includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
if (document.getElementById('gallery')) {
  displayProjects('all');
  initFilters();
  initSiteSearch();
}
function displayProjects(filter) {
    let gallery = document.getElementById('gallery');
    if (!gallery) return;
    gallery.innerHTML = '';
    for (let i = 0; i < projects.length; i++) {
        if (filter === 'all' || projects[i].category === filter) {
            let card = createProjectCard(projects[i], i);
            gallery.appendChild(card);
        }
    }
    if (typeof saveGalleryFilter === 'function') {
        saveGalleryFilter(filter);
    }
}