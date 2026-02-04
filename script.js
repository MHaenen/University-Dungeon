// University Dungeon - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Pixel button sound effect simulation
    const buttons = document.querySelectorAll('.pixel-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Check if this is the play button
            if (this.classList.contains('play-button') || this.textContent.includes('START GAME')) {
                // Redirect to game page
                window.location.href = 'game.html';
                return;
            }
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
            
            // Create pixel particles effect
            createPixelParticles(this);
        });
    });

    // Create pixel particle effect
    function createPixelParticles(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'pixel-particle';
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${getComputedStyle(element).backgroundColor};
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                pointer-events: none;
                z-index: 9999;
                image-rendering: pixelated;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 5 + Math.random() * 5;
            const lifetime = 500 + Math.random() * 500;
            
            let x = 0;
            let y = 0;
            let opacity = 1;
            
            const animate = () => {
                x += Math.cos(angle) * velocity;
                y += Math.sin(angle) * velocity;
                opacity -= 0.02;
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    }

    // Parallax scrolling effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const heroCharacter = document.querySelector('.hero-character');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroSection && heroCharacter) {
            heroCharacter.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });

    // Typing effect for subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        let charIndex = 0;
        
        const typeWriter = () => {
            if (charIndex < originalText.length) {
                subtitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Game stats counter animation
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add counter animation for stats if needed
                if (entry.target.classList.contains('stat-number')) {
                    const target = parseInt(entry.target.textContent);
                    animateCounter(entry.target, target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-card, .feature-item, .play-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Play button functionality
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            // Redirect to game page
            window.location.href = 'game.html';
        });
    }

    // Download button functionality
    const downloadButton = document.querySelector('.play-card .pixel-button.primary');
    if (downloadButton && downloadButton.textContent.includes('DOWNLOAD')) {
        downloadButton.addEventListener('click', function() {
            // Redirect to game page for now
            window.location.href = 'game.html';
        });
    }

    // Web version button
    const webButton = document.querySelector('.play-card .pixel-button.secondary');
    if (webButton && webButton.textContent.includes('PLAY NOW')) {
        webButton.addEventListener('click', function() {
            // Redirect to game page
            window.location.href = 'game.html';
        });
    }

    // Trailer button
    const trailerButton = document.querySelector('.cta-container .pixel-button.secondary');
    if (trailerButton && trailerButton.textContent.includes('TRAILER')) {
        trailerButton.addEventListener('click', function() {
            alert('Game trailer coming soon!');
        });
    }

    // Add hover sound effect simulation (visual feedback)
    const interactiveElements = document.querySelectorAll('.pixel-button, .about-card, .feature-item, .play-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
        });
    });

    // Dynamic background particles
    function createBackgroundParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 107, 53, 0.3);
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight}px;
            pointer-events: none;
            z-index: 1;
        `;
        
        document.body.appendChild(particle);
        
        const duration = 3000 + Math.random() * 2000;
        const horizontalMovement = (Math.random() - 0.5) * 100;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 0.3 },
            { transform: `translate(${horizontalMovement}px, -${window.innerHeight + 100}px) scale(0.5)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => particle.remove();
    }

    // Create background particles periodically
    setInterval(createBackgroundParticle, 500);

    // Easter egg: Konami code
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        const easterEggMessage = document.createElement('div');
        easterEggMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--accent-color);
            color: white;
            padding: 20px;
            border: 4px solid white;
            font-family: 'Press Start 2P', cursive;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 0 20px rgba(0,0,0,0.8);
        `;
        easterEggMessage.textContent = 'SECRET MODE UNLOCKED! You found the Konami code!';
        document.body.appendChild(easterEggMessage);
        
        setTimeout(() => easterEggMessage.remove(), 3000);
    }
});
