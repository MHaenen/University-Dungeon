// University Dungeon Game Logic
class Game {
    constructor() {
        this.currentScreen = 'startScreen';
        this.selectedClass = null;
        this.characterData = {
            name: 'PLAYER',
            class: null,
            hair: 'short',
            hairColor: '#8B4513',
            uniformColor: '#4A90E2',
            accessory: 'none'
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadCharacterData();
        this.showScreen('startScreen');
    }

    setupEventListeners() {
        // Class selection
        document.querySelectorAll('.class-select-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const classCard = btn.closest('.class-card');
                this.selectClass(classCard.dataset.class);
            });
        });

        // Character customization options
        document.querySelectorAll('.option-item').forEach(item => {
            item.addEventListener('click', () => {
                const option = item.dataset.option;
                const value = item.dataset.value;
                this.selectOption(option, value, item);
            });
        });

        // Color options
        document.querySelectorAll('.color-option').forEach(item => {
            item.addEventListener('click', () => {
                const option = item.dataset.option;
                const value = item.dataset.value;
                this.selectColorOption(option, value, item);
            });
        });

        // Name input
        const nameInput = document.getElementById('nameInput');
        if (nameInput) {
            nameInput.addEventListener('input', (e) => {
                this.characterData.name = e.target.value.toUpperCase() || 'PLAYER';
                this.updateCharacterPreview();
            });
        }
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.game-screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
            
            // Add screen transition effect
            this.createScreenTransition();
        }

        // Update character preview if on customization screen
        if (screenId === 'characterCustomization') {
            this.updateCharacterPreview();
        }
    }

    createScreenTransition() {
        const transition = document.createElement('div');
        transition.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--accent-color);
            z-index: 9999;
            opacity: 0.8;
            pointer-events: none;
        `;
        document.body.appendChild(transition);

        setTimeout(() => {
            transition.style.transition = 'opacity 0.3s ease';
            transition.style.opacity = '0';
            setTimeout(() => transition.remove(), 300);
        }, 100);
    }

    selectClass(className) {
        this.selectedClass = className;
        this.characterData.class = className;

        // Update UI
        document.querySelectorAll('.class-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-class="${className}"]`).classList.add('selected');

        // Show selection feedback
        this.showFeedback(`${className.toUpperCase()} SELECTED!`);

        // Auto-advance to customization after delay
        setTimeout(() => {
            this.showScreen('characterCustomization');
        }, 1500);
    }

    selectOption(option, value, element) {
        // Update data
        this.characterData[option] = value;

        // Update UI
        document.querySelectorAll(`[data-option="${option}"]`).forEach(item => {
            item.classList.remove('selected');
        });
        element.classList.add('selected');

        // Update character preview
        this.updateCharacterPreview();
    }

    selectColorOption(option, value, element) {
        // Update data
        this.characterData[option] = value;

        // Update UI
        document.querySelectorAll(`[data-option="${option}"]`).forEach(item => {
            item.classList.remove('selected');
        });
        element.classList.add('selected');

        // Update character preview
        this.updateCharacterPreview();
    }

    updateCharacterPreview() {
        const characterSprite = document.querySelector('.character-sprite');
        const characterName = document.getElementById('characterName');
        const characterClass = document.getElementById('characterClass');

        if (characterSprite) {
            // Remove all class variations
            characterSprite.className = 'character-sprite';

            // Add hair style
            if (this.characterData.hair !== 'short') {
                characterSprite.classList.add(`hair-${this.characterData.hair}`);
            }

            // Add accessory
            if (this.characterData.accessory !== 'none') {
                characterSprite.classList.add(`accessory-${this.characterData.accessory}`);
            }

            // Update colors
            this.updateSpriteColors(characterSprite);
        }

        if (characterName) {
            characterName.textContent = this.characterData.name;
        }

        if (characterClass) {
            characterClass.textContent = `CLASS: ${this.selectedClass ? this.selectedClass.toUpperCase() : 'NONE'}`;
        }
    }

    updateSpriteColors(sprite) {
        // Create dynamic style for character colors
        let styleElement = document.getElementById('dynamic-character-style');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'dynamic-character-style';
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = `
            .character-sprite {
                background: ${this.characterData.uniformColor} !important;
            }
            .character-sprite::before,
            .character-sprite::after {
                background: ${this.characterData.hairColor} !important;
            }
        `;
    }

    showFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'selection-feedback';
        feedback.textContent = message;
        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

    saveCharacterData() {
        localStorage.setItem('universityDungeonCharacter', JSON.stringify(this.characterData));
        localStorage.setItem('universityDungeonClass', this.selectedClass);
    }

    loadCharacterData() {
        const savedCharacter = localStorage.getItem('universityDungeonCharacter');
        const savedClass = localStorage.getItem('universityDungeonClass');

        if (savedCharacter) {
            this.characterData = JSON.parse(savedCharacter);
        }

        if (savedClass) {
            this.selectedClass = savedClass;
        }
    }

    startGame() {
        if (!this.selectedClass) {
            this.showFeedback('PLEASE SELECT A CLASS FIRST!');
            return;
        }

        if (!this.characterData.name || this.characterData.name === 'PLAYER') {
            this.showFeedback('PLEASE ENTER YOUR NAME!');
            return;
        }

        // Save character data
        this.saveCharacterData();

        // Show start game feedback
        this.showFeedback('STARTING ADVENTURE...');

        // Here you would typically load the main game
        setTimeout(() => {
            alert(`Welcome to University Dungeon, ${this.characterData.name} the ${this.selectedClass}!\n\nTutorial and main game coming next...`);
        }, 2000);
    }
}

// Global functions for HTML onclick handlers
function showScreen(screenId) {
    game.showScreen(screenId);
}

function startGame() {
    game.startGame();
}

// Initialize game when DOM is loaded
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new Game();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Go back to previous screen
        if (game.currentScreen === 'characterCustomization') {
            game.showScreen('classSelection');
        } else if (game.currentScreen === 'classSelection') {
            game.showScreen('startScreen');
        }
    }

    // Number keys for quick class selection
    if (game.currentScreen === 'classSelection') {
        const classes = ['engineer', 'artist', 'athlete', 'scholar'];
        if (e.key >= '1' && e.key <= '4') {
            const classIndex = parseInt(e.key) - 1;
            if (classes[classIndex]) {
                game.selectClass(classes[classIndex]);
            }
        }
    }
});

// Add visual feedback for hover states
document.addEventListener('DOMContentLoaded', () => {
    // Add hover sound effect simulation
    const interactiveElements = document.querySelectorAll('.class-card, .option-item, .color-option, .pixel-button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'all 0.2s ease';
        });

        element.addEventListener('click', function() {
            // Create pixel particles on click
            createPixelParticles(this);
        });
    });
});

// Create pixel particle effect
function createPixelParticles(element) {
    const rect = element.getBoundingClientRect();
    const particleCount = 6;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--accent-color);
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            pointer-events: none;
            z-index: 9999;
            image-rendering: pixelated;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 3 + Math.random() * 3;
        const lifetime = 400 + Math.random() * 400;
        
        let x = 0;
        let y = 0;
        let opacity = 1;
        
        const animate = () => {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity;
            opacity -= 0.025;
            
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
