document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    sections.forEach(section => {
        section.classList.add('hidden');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.replace('hidden', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });
});
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateAllBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    skillsObserver.observe(skillsSection);
}

function animateAllBars() {
    const bars = document.querySelectorAll('.progress-bar[data-target]');
    bars.forEach(bar => {
        const target = parseInt(bar.getAttribute('data-target'));
        animateProgress(bar, target);
    });
}

function animateProgress(bar, target) {
    let current = 0;
    function step() {
        current++;
        bar.style.width = current + '%';
        bar.textContent = current + '%';
        if (current < target) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}