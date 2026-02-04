// University Dungeon Game Logic
class Game {
    constructor() {
        this.currentScreen = 'startScreen';
        this.selectedClass = null;
        this.currentLesson = 1;
        this.totalLessons = 5;
        this.tutorialCompleted = false;
        this.characterData = {
            name: 'PLAYER',
            class: null,
            hair: 'short',
            hairColor: '#8B4513',
            uniformColor: '#4A90E2',
            accessory: 'none'
        };
        this.tutorialLessons = [
            {
                title: "Basic Controls",
                professor: "Welcome to University Dungeon! I'm Professor Stats, and I'll teach you how to survive your academic adventure.",
                blackboard: {
                    title: "Today's Lesson: Basic Controls",
                    content: `
                        <div class="controls-demo">
                            <div class="control-item">
                                <span class="key">WASD</span>
                                <span>Move your character</span>
                            </div>
                            <div class="control-item">
                                <span class="key">SPACE</span>
                                <span>Attack/Interact</span>
                            </div>
                            <div class="control-item">
                                <span class="key">E</span>
                                <span>Open inventory</span>
                            </div>
                            <div class="control-item">
                                <span class="key">ESC</span>
                                <span>Pause menu</span>
                            </div>
                        </div>
                    `
                },
                notes: [
                    "• Movement: WASD keys",
                    "• Attack: SPACE",
                    "• Inventory: E key"
                ]
            },
            {
                title: "Combat System",
                professor: "Excellent! Now let's learn about combat. You'll face many challenging lecturers on your journey!",
                blackboard: {
                    title: "Combat Mechanics",
                    content: `
                        <div class="controls-demo">
                            <div class="control-item">
                                <span class="key">SPACE</span>
                                <span>Basic attack</span>
                            </div>
                            <div class="control-item">
                                <span class="key">Q</span>
                                <span>Special ability</span>
                            </div>
                            <div class="control-item">
                                <span class="key">SHIFT</span>
                                <span>Block/Dodge</span>
                            </div>
                            <div class="control-item">
                                <span class="key">1-4</span>
                                <span>Use items</span>
                            </div>
                        </div>
                    `
                },
                notes: [
                    "• Basic attack: SPACE",
                    "• Special ability: Q key",
                    "• Block/Dodge: SHIFT",
                    "• Items: Number keys 1-4"
                ]
            },
            {
                title: "University Life",
                professor: "University life isn't just about combat! You need to manage your time and resources wisely.",
                blackboard: {
                    title: "Student Survival Guide",
                    content: `
                        <div class="controls-demo">
                            <div class="control-item">
                                <span class="key">💤</span>
                                <span>Sleep restores health</span>
                            </div>
                            <div class="control-item">
                                <span class="key">📚</span>
                                <span>Study increases INT</span>
                            </div>
                            <div class="control-item">
                                <span class="key">🍔</span>
                                <span>Food restores energy</span>
                            </div>
                            <div class="control-item">
                                <span class="key">💰</span>
                                <span>Buy supplies at shop</span>
                            </div>
                        </div>
                    `
                },
                notes: [
                    "• Sleep: Restores health",
                    "• Study: Increases intelligence",
                    "• Food: Restores energy",
                    "• Shop: Buy supplies"
                ]
            },
            {
                title: "Boss Battles",
                professor: "The most challenging part! University Lecturers are tough bosses with unique attack patterns.",
                blackboard: {
                    title: "Boss Battle Strategy",
                    content: `
                        <div class="controls-demo">
                            <div class="control-item">
                                <span class="key">🎯</span>
                                <span>Watch attack patterns</span>
                            </div>
                            <div class="control-item">
                                <span class="key">⏱️</span>
                                <span>Time your dodges</span>
                            </div>
                            <div class="control-item">
                                <span class="key">💊</span>
                                <span>Use healing items wisely</span>
                            </div>
                            <div class="control-item">
                                <span class="key">🏆</span>
                                <span>Victory grants rewards</span>
                            </div>
                        </div>
                    `
                },
                notes: [
                    "• Watch boss patterns",
                    "• Time dodges carefully",
                    "• Use healing items wisely",
                    "• Victory gives great rewards"
                ]
            },
            {
                title: "Graduation",
                professor: "Congratulations! You've completed the basic training. Now go forth and conquer your university adventure!",
                blackboard: {
                    title: "You're Ready!",
                    content: `
                        <div style="text-align: center; padding: 20px;">
                            <h3 style="font-size: 24px; margin-bottom: 20px;">🎓 GRADUATION COMPLETE 🎓</h3>
                            <p style="font-size: 14px; line-height: 1.8;">
                                You now have the knowledge to succeed!<br>
                                Remember your training and good luck!<br><br>
                                <strong>Your adventure begins now!</strong>
                            </p>
                        </div>
                    `
                },
                notes: [
                    "• Tutorial completed!",
                    "• Ready for adventure",
                    "• Good luck, student!"
                ]
            }
        ];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadCharacterData();
        this.showScreen('startScreen');
        this.setupTutorialListeners();
    }

    setupTutorialListeners() {
        // Next lesson button
        const nextLessonBtn = document.getElementById('nextLessonBtn');
        if (nextLessonBtn) {
            nextLessonBtn.addEventListener('click', () => this.nextLesson());
        }

        // Ask question button
        const askQuestionBtn = document.getElementById('askQuestionBtn');
        if (askQuestionBtn) {
            askQuestionBtn.addEventListener('click', () => this.askQuestion());
        }
    }

    startTutorial() {
        this.currentLesson = 1;
        this.tutorialCompleted = false;
        this.showScreen('tutorial');
        this.loadLesson(1);
    }

    loadLesson(lessonNumber) {
        const lesson = this.tutorialLessons[lessonNumber - 1];
        if (!lesson) return;

        // Update lesson number
        const lessonNumberElement = document.getElementById('lessonNumber');
        if (lessonNumberElement) {
            lessonNumberElement.textContent = lessonNumber;
        }

        // Update professor speech
        const professorSpeech = document.getElementById('professorSpeech');
        if (professorSpeech) {
            professorSpeech.textContent = lesson.professor;
            this.animateText(professorSpeech, lesson.professor);
        }

        // Update blackboard
        const blackboardContent = document.getElementById('blackboardContent');
        if (blackboardContent) {
            blackboardContent.innerHTML = `
                <h3>${lesson.blackboard.title}</h3>
                ${lesson.blackboard.content}
            `;
        }

        // Update notes
        const notesContent = document.getElementById('notesContent');
        if (notesContent) {
            notesContent.innerHTML = lesson.notes.map(note => `<p>${note}</p>`).join('');
        }

        // Update progress
        this.updateTutorialProgress();

        // Update button text
        const nextLessonBtn = document.getElementById('nextLessonBtn');
        if (nextLessonBtn) {
            if (lessonNumber === this.totalLessons) {
                nextLessonBtn.textContent = 'COMPLETE TUTORIAL';
            } else {
                nextLessonBtn.textContent = 'NEXT LESSON';
            }
        }
    }

    nextLesson() {
        if (this.currentLesson < this.totalLessons) {
            this.currentLesson++;
            this.loadLesson(this.currentLesson);
        } else {
            this.completeTutorial();
        }
    }

    completeTutorial() {
        this.tutorialCompleted = true;
        this.saveTutorialProgress();
        
        this.showFeedback('🎓 TUTORIAL COMPLETE! Ready for adventure!');
        
        setTimeout(() => {
            // Here you would typically go to the hub world
            alert('Congratulations! You completed the tutorial!\n\nNext: Hub world (coming soon...)');
            this.showScreen('startScreen');
        }, 2000);
    }

    askQuestion() {
        const questions = [
            "Professor, what's the best way to defeat tough bosses?",
            "How do I level up my character quickly?",
            "What's the most important stat for my class?",
            "Where can I find good equipment?",
            "Any tips for managing my time effectively?"
        ];

        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        const professorSpeech = document.getElementById('professorSpeech');
        
        if (professorSpeech) {
            const originalText = professorSpeech.textContent;
            professorSpeech.textContent = `Great question! ${randomQuestion}`;
            
            setTimeout(() => {
                const lesson = this.tutorialLessons[this.currentLesson - 1];
                professorSpeech.textContent = lesson.professor;
            }, 3000);
        }

        this.showFeedback('Question asked! Professor is thinking...');
    }

    updateTutorialProgress() {
        const progressFill = document.getElementById('tutorialProgress');
        if (progressFill) {
            const progress = (this.currentLesson / this.totalLessons) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }

    animateText(element, text) {
        element.textContent = '';
        let charIndex = 0;
        
        const typeWriter = () => {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 30);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    saveTutorialProgress() {
        localStorage.setItem('universityDungeonTutorialCompleted', this.tutorialCompleted);
        localStorage.setItem('universityDungeonCurrentLesson', this.currentLesson);
    }

    loadTutorialProgress() {
        const completed = localStorage.getItem('universityDungeonTutorialCompleted');
        const lesson = localStorage.getItem('universityDungeonCurrentLesson');
        
        if (completed === 'true') {
            this.tutorialCompleted = true;
        }
        
        if (lesson) {
            this.currentLesson = parseInt(lesson);
        }
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

        // Start tutorial
        this.startTutorial();
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
