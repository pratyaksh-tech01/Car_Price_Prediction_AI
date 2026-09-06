// js/animation.js

// Generate floating particles
function createParticles() {
    const container = document.querySelector('.background-animation');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(particle);
    }
}

// Mouse tracking effect for background
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
    
    // Optional: Add glow effect to cursor
    const glow = document.createElement('div');
    glow.style.position = 'fixed';
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.style.width = '30px';
    glow.style.height = '30px';
    glow.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.5), transparent)';
    glow.style.borderRadius = '50%';
    glow.style.pointerEvents = 'none';
    glow.style.animation = 'fadeOut 0.5s ease-out';
    glow.style.zIndex = '-1';
    
    document.body.appendChild(glow);
    
    setTimeout(() => glow.remove(), 500);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card, .chart-card').forEach(el => {
    observer.observe(el);
});

// CTA button scroll to prediction section
document.querySelector('.cta-btn').addEventListener('click', () => {
    document.querySelector('#predict').scrollIntoView({ behavior: 'smooth' });
});

// Initialize
window.addEventListener('load', () => {
    createParticles();
    
    // Add fadeOut animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: scale(1.5);
            }
        }
    `;
    document.head.appendChild(style);
});