document.addEventListener('DOMContentLoaded', function() {
    const typingEl = document.getElementById('typingText');
    if (!typingEl) return;
    
    const phrases = ['веб-розробник', 'дизайнер', 'фрілансер', 'креативна особистість'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        typingEl.textContent = currentPhrase.substring(0, charIndex);
        
        let delay;
        if (!isDeleting && charIndex < currentPhrase.length) {
            charIndex++;
            delay = 100;
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            delay = 50;
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
            delay = isDeleting ? 1500 : 500;
        }
        setTimeout(typeEffect, delay);
    }
    
    typeEffect();
});