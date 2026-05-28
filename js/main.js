function validateForm() {
    clearErrors();
    let isValid = true;

    const name = document.getElementById('name')?.value.trim();
    if (!name) {
        showError('nameError', "Будь ласка, введіть ім'я");
        isValid = false;
    } else if (name.length < 2) {
        showError('nameError', "Ім'я занадто коротке");
        isValid = false;
    }

    const email = document.getElementById('email')?.value.trim();
    if (!email) {
        showError('emailError', 'Будь ласка, введіть email');
        isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
        showError('emailError', 'Некорректний формат email');
        isValid = false;
    }

    const message = document.getElementById('message')?.value.trim();
    if (!message) {
        showError('messageError', 'Будь ласка, введіть повідомлення');
        isValid = false;
    } else if (message.length < 10) {
        showError('messageError', 'Повідомлення занадто коротке (мін. 10 символів)');
        isValid = false;
    }

    if (isValid) {
        const successDiv = document.getElementById('successMessage');
        if (successDiv) successDiv.style.display = 'block';
        const form = document.getElementById('contactForm');
        if (form) form.reset();
        const charCount = document.getElementById('charCount');
        if (charCount) charCount.textContent = '0 символів';
        setTimeout(() => {
            if (successDiv) successDiv.style.display = 'none';
        }, 3000);
    }
    return false;
}

function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

function countCharacters() {
    const message = document.getElementById('message');
    if (!message) return;
    const count = message.value.length;
    const charCount = document.getElementById('charCount');
    if (charCount) {
        charCount.textContent = count + ' символів';
        charCount.style.color = (count > 0 && count < 10) ? 'red' : '#6c757d';
    }
}

// Спінер завантаження
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    }
});