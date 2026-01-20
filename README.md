# 🧠 Constraint-Driven Number Guessing Game

A logic-based web game designed to avoid boredom by using meaningful constraints such as limited attempts, time pressure, and intelligent feedback.  
The game is lightweight, fully responsive, and deployable for free using static hosting.

---

## 🎯 Project Objective

Traditional number guessing games become boring very quickly due to repetitive logic.  
This project overcomes that issue by introducing:

- Limited attempts (risk)
- Time pressure (urgency)
- Hot/Warm/Cold feedback (emotional engagement)
- Visible progress through a shrinking number range

The result is a simple but engaging logic game that rewards smart thinking.

---

## 🎮 Game Features

- 🔢 Random secret number between **1 and 100**
- 🎯 **7 fixed attempts** per game
- ⏱️ **60-second countdown timer**
- 🔥 Smart feedback system:
  - **Hot** – very close
  - **Warm** – moderately close
  - **Cold** – far from the target
- 📉 Dynamic number range update after each guess
- 🏆 Score calculation based on remaining attempts
- 🔁 Play Again option after win or loss

---

## 🧠 How the Game Works

1. The game generates a secret number at the start.
2. The player enters a guess.
3. The game compares the guess with the secret number.
4. Feedback is shown (Hot / Warm / Cold).
5. The possible number range updates dynamically.
6. The player wins by guessing the number within:
   - Available attempts **and**
   - The time limit
7. The game ends with a win or loss screen.

---

## 🧩 Technology Stack

| Technology | Purpose |
|----------|---------|
| HTML | Game structure |
| CSS | Responsive UI design |
| JavaScript | Game logic and interaction |

- No frameworks
- No backend
- No database

---

## 📱 Device Compatibility

- ✅ Desktop (Keyboard & Mouse)
- ✅ Mobile (Touch-friendly interface)
- ✅ Fully responsive design

---

## 📂 Project Structure

number-guessing-logic-game/
│── index.html    # Game UI structure
│── style.css     # Styling and responsiveness
│── script.js     # Game logic
└── README.md     # Project documentation

---

## 🚀 How to Run the Project

### Run Locally
1. Download or clone the repository
2. Open `index.html` in any modern web browser
3. Start playing

### Free Deployment
This project can be deployed using static hosting services such as:
- GitHub Pages
- Netlify
- Vercel

No server configuration required.

---

## 🧠 Design Philosophy

> **Boredom is removed by constraints, not complexity.**

This project demonstrates that:
- Simple logic combined with smart rules creates engaging gameplay
- Good game design does not require heavy frameworks

---

## 🌱 Future Enhancements

- Difficulty levels (Easy / Medium / Hard)
- Best score storage using `localStorage`
- Dark mode
- Daily challenge mode
- Subtle animations and sound effects

---

## 👤 Author

**Ravi Teja**  
Frontend Developer | Logic Game Designer  

---

## 📄 License

This project is open-source and free to use for learning, personal projects, and portfolio purposes.

