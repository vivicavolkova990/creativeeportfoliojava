function validateForm() {
    clearErrors();
    let isValid = true;

    const name = document.getElementById('name').value.trim();
    if (name === '') {
        showError('nameError', "Будь ласка, введіть ім'я");
        isValid = false;
    } else if (name.length < 2) {
        showError('nameError', "Ім'я занадто коротке");
        isValid = false;
    }

    const email = document.getElementById('email').value.trim();
    if (email === '') {
        showError('emailError', 'Будь ласка, введіть email');
        isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
        showError('emailError', 'Некорректний формат email');
        isValid = false;
    }

    const message = document.getElementById('message').value.trim();
    if (message === '') {
        showError('messageError', 'Будь ласка, введіть повідомлення');
        isValid = false;
    } else if (message.length < 10) {
        showError('messageError', 'Повідомлення занадто коротке (мін. 10 символів)');
        isValid = false;
    }

    if (isValid) {
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('contactForm').reset();
        document.getElementById('charCount').textContent = '0 символів';
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 3000);
    }
    return false; 
}
function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = msg;
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

function countCharacters() {
    const message = document.getElementById('message').value;
    const count = message.length;
    const charCount = document.getElementById('charCount');
    if (charCount) {
        charCount.textContent = count + ' символів';
        charCount.style.color = (count > 0 && count < 10) ? 'red' : '#6c757d';
    }
}

window.addEventListener('scroll', function() {
    const btn = document.getElementById('scrollTopBtn');
    if (btn) {
        btn.style.display = (document.documentElement.scrollTop > 300) ? 'block' : 'none';
    }
});
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        themeToggle.innerHTML = document.body.classList.contains('dark-theme'); 'Світла тема' ; 'Темна тема';
    });
}
const skills = [
    { name: 'HTML5 / CSS3', level: 90 },
    { name: 'JavaScript', level: 75 },
    { name: 'Bootstrap', level: 85 },
    { name: 'Git / GitHub', level: 70 }
];
const skillsList = document.getElementById('skillsList');
if (skillsList) {
    let html = '';
    for (let i = 0; i < skills.length; i++) {
        html += `
            <div class="mb-3">
                <label>${skills[i].name}</label>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${skills[i].level}%" 
                         aria-valuenow="${skills[i].level}" aria-valuemin="0" aria-valuemax="100">
                        ${skills[i].level}%
                    </div>
                </div>
            </div>`;
    }
    skillsList.innerHTML = html;
}
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000); 
    }
});