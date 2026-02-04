# University Dungeon 🎓⚔️

A pixel art RPG game set in a university environment where players navigate through campus buildings turned into dangerous dungeons, facing off against challenging University Lecturers as boss encounters.

## 🎮 Game Features

### Core Gameplay
- **University-Themed Setting**: Navigate through lecture halls, libraries, and campus buildings
- **Epic Boss Battles**: Face challenging University Lecturers and Professors
- **RPG Mechanics**: Level up, collect loot, and customize your character
- **Grindy Gameplay**: Designed for extended play sessions with progression systems
- **Pixel Art Style**: Inspired by Enter the Gungeon's aesthetic

### Character Classes
- 🔧 **Engineer**: Master of technology and problem-solving
- 🎨 **Artist**: Creative visionary with debuff abilities
- ⚽ **Athlete**: Physical powerhouse with high endurance
- 📚 **Scholar**: Academic master with powerful spells

### Game Pipeline
1. **Start Game** → Landing page and game initialization
2. **Choose Class** → Select your university-themed character class
3. **Character Customization** → Personalize your character's appearance
4. **Tutorial** → Lecture-style tutorial system
5. **Hub World** → Inventory management, salvage, buy/sell items
6. **Main Game** → Levels, game modes, and progression

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd university-dungeon
   ```

2. Start a local server:
   ```bash
   # Using Python
   python -m http.server 3000
   
   # Using Node.js (if you have http-server)
   npx http-server -p 3000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### File Structure
```
university-dungeon/
├── index.html          # Landing page
├── game.html           # Game screens (class selection, customization)
├── styles.css          # Landing page styles
├── game.css            # Game-specific styles
├── script.js           # Landing page JavaScript
├── game.js             # Game logic and interactions
├── README.md           # This file
└── .gitignore          # Git ignore file
```

## 🎯 Current Status

### ✅ Completed
- [x] Landing page with pixel art aesthetic
- [x] Class selection system with 4 unique classes
- [x] Character customization with multiple options
- [x] Navigation between game screens
- [x] Character data persistence
- [x] Responsive design for mobile and desktop

### 🚧 In Progress
- [ ] Tutorial system (lecture-style)
- [ ] Hub world with inventory management
- [ ] Main game levels and mechanics
- [ ] Boss battle system
- [ ] Multiplayer support (future)

### 📋 Planned Features
- [ ] Save/load game system
- [ ] Achievement system
- [ ] Sound effects and music
- [ ] More character customization options
- [ ] Additional classes and abilities
- [ ] Multiplayer functionality

## 🎨 Art Style

The game features a pixel art aesthetic inspired by Enter the Gungeon:
- 8-bit pixelated graphics
- Retro color schemes
- Pixel-perfect animations
- CRT monitor effects
- Chiptune-style UI elements

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Animations, transitions, and responsive design
- **Vanilla JavaScript**: Game logic and interactions
- **Google Fonts**: Press Start 2P for retro gaming feel
- **LocalStorage**: Character data persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎮 Gameplay Tips

- Each class has unique stats: INT (Intelligence), STR (Strength), AGI (Agility)
- Character customization is purely cosmetic but saves your preferences
- The game is designed to be grindy - take your time and enjoy the progression
- Future updates will include multiplayer functionality

## 🐛 Bug Reports

If you encounter any bugs or issues, please:
1. Check the [Issues](../../issues) page first
2. Create a new issue with detailed information
3. Include your browser version and steps to reproduce

## 📞 Contact

For questions or suggestions:
- Create an issue in this repository
- Join our Discord community (link coming soon)

---

Made with ❤️ for university students who love RPG games!
