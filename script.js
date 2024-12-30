// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Snow effect
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.opacity = Math.random() * 0.6 + 0.4;
    snowflake.style.width = snowflake.style.height = Math.random() * 4 + 2 + 'px';
    
    const duration = Math.random() * 3 + 2;
    snowflake.style.animationDuration = `${duration}s`;
    
    document.querySelector('.snow').appendChild(snowflake);
    
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
}

setInterval(createSnowflake, 100);

// Gift box animation
const giftBox = document.querySelector('.gift-box');
giftBox.addEventListener('click', function() {
    if (!this.classList.contains('open')) {
        this.classList.add('open');
        
        // Создаем эффект тряски
        this.style.animation = 'shake 0.5s ease-in-out';
        
        createConfetti();
        
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
        
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    }
});

// Добавляем анимацию тряски
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
}`;

const styleSheet = document.createElement('style');
styleSheet.textContent = shakeKeyframes;
document.head.appendChild(styleSheet);

// Confetti effect
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Случайное начальное положение
        confetti.style.left = giftBox.offsetLeft + giftBox.offsetWidth/2 + 'px';
        confetti.style.top = giftBox.offsetTop + 'px';
        
        // Случайный цвет и размер
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 8 + 6;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        document.body.appendChild(confetti);
        
        // Анимация разлета конфетти
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 300 + 200;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 200;
        
        confetti.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) rotate(${Math.random() * 1000}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 1000 + 1500,
            easing: 'cubic-bezier(.25,.46,.45,.94)',
            fill: 'forwards'
        }).onfinish = () => confetti.remove();
    }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add sparkle effect on hover
function createSparkle(e) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

document.addEventListener('mousemove', createSparkle);

// Добавляем стили для конфетти
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: fixed;
        z-index: 1000;
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Предзагрузка изображения
window.addEventListener('load', function() {
    const giftImage = document.querySelector('.gift-image');
    if (giftImage) {
        giftImage.style.display = 'block'; // Убеждаемся, что изображение видимо
        const preloadImage = new Image();
        preloadImage.src = giftImage.src;
    }
});

document.querySelector('.gift-image').addEventListener('error', function() {
    console.error('Ошибка загрузки изображения sticker2.png');
    this.style.display = 'none';
}); 