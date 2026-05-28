document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = document.getElementById('submitBtn');
    const rules = {
        nameInput: {
            pattern: /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]{2,}$/,
            message: "Ім'я: мін. 2 літери (тільки букви, пробіли, '-)"
        },
        emailInput: {
            pattern: /^[\w.-]+@[\w.-]+\.\w{2,}$/,
            message: 'Невірний формат email (example@domain.com)'
        },
        phoneInput: {
            pattern: /^\+?\d[\d\s-]{9,}$/,
            message: 'Мінімум 10 цифр, можна +, пробіли, тире',
            optional: true
        },
        subjectInput: {
            pattern: /^.{1,}$/,
            message: 'Тема обов\'язкова'
        },
        messageInput: {
            minLength: 20,
            message: 'Мінімум 20 символів'
        }
    };

    function validateField(input) {
        const rule = rules[input.id];
        if (!rule) return true;

        const msgDiv = input.nextElementSibling;
        let isValid = false;

        if (rule.optional && !input.value.trim()) {
            input.classList.remove('is-invalid', 'is-valid');
            if (msgDiv) msgDiv.textContent = '';
            return true;
        }

        if (rule.pattern) {
            isValid = rule.pattern.test(input.value.trim());
        } else if (rule.minLength) {
            isValid = input.value.trim().length >= rule.minLength;
        }

        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            if (msgDiv) {
                msgDiv.textContent = '✓ Валідне';
                msgDiv.style.color = 'green';
            }
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            if (msgDiv) {
                msgDiv.textContent = '✗ ' + rule.message;
                msgDiv.style.color = 'red';
            }
        }
        return isValid;
    }

    Object.keys(rules).forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function() {
                validateField(this);
                updateSubmitButton();
            });
        }
    });

    function updateSubmitButton() {
        let allValid = true;
        for (let id in rules) {
            const input = document.getElementById(id);
            if (input && !validateField(input)) {
                allValid = false;
                break;
            }
        }
        if (submitBtn) submitBtn.disabled = !allValid;
    }

    function generateResultPage() {
        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const phone = document.getElementById('phoneInput').value;
        const subject = document.getElementById('subjectInput').value;
        const message = document.getElementById('messageInput').value;

        document.open();
        document.write(`
            <!DOCTYPE html>
            <html lang="ua">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Повідомлення відправлено</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body { background: #eef2f3; font-family: 'Segoe UI', sans-serif; }
                    .result-card { max-width: 600px; margin: 50px auto; border-radius: 20px; overflow: hidden; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="card result-card shadow">
                        <div class="card-header bg-primary text-white">
                            <h2 class="mb-0">Дякуємо, ${escapeHtml(name)}!</h2>
                        </div>
                        <div class="card-body">
                            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                            <p><strong>Телефон:</strong> ${escapeHtml(phone || 'не вказано')}</p>
                            <p><strong>Тема:</strong> ${escapeHtml(subject)}</p>
                            <p><strong>Повідомлення:</strong></p>
                            <div class="alert alert-secondary">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
                            <p><strong>Дата:</strong> ${new Date().toLocaleString('uk-UA')}</p>
                        </div>
                        <div class="card-footer text-center">
                            <button onclick="window.close()" class="btn btn-outline-primary">Закрити</button>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `);
        document.close();
    }

    function escapeHtml(str) {
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (submitBtn && !submitBtn.disabled) {
            generateResultPage();
        }
    });

    updateSubmitButton();
});