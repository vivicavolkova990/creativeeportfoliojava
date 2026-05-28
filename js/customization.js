document.addEventListener('DOMContentLoaded', function() {
    const sliders = {
        hueSlider: '--primary-hue',
        fontSlider: '--heading-size',
        radiusSlider: '--border-radius'
    };

    function applyValue(cssVar, value) {
        const root = document.documentElement;
        if (cssVar === '--primary-hue') {
            root.style.setProperty(cssVar, value);
        } else if (cssVar === '--heading-size') {
            root.style.setProperty(cssVar, value + 'px');
        } else if (cssVar === '--border-radius') {
            root.style.setProperty(cssVar, value + 'px');
        }
    }

    Object.entries(sliders).forEach(([sliderId, cssVar]) => {
        const slider = document.getElementById(sliderId);
        if (!slider) return;

        const saved = localStorage.getItem(cssVar);
        if (saved !== null) {
            slider.value = saved;
            applyValue(cssVar, saved);
        } else {
            applyValue(cssVar, slider.value);
        }

        slider.addEventListener('input', function() {
            const val = this.value;
            applyValue(cssVar, val);
            localStorage.setItem(cssVar, val);
        });
    });
});