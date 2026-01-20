/* --- Game Configuration --- */
const MAX_ATTEMPTS = 7;
const MAX_TIME = 60; // seconds
const MIN_NUM = 1;
const MAX_NUM = 100;

/* --- State Variables --- */
let secret, attempts, minRange, maxRange, timer, timeLeft, isGameActive;

/* --- DOM Elements --- */
const els = {
    input: document.getElementById('guess-input'),
    btnGuess: document.getElementById('guess-btn'),
    btnRestart: document.getElementById('restart-btn'),
    timeVal: document.getElementById('time-val'),
    timeBar: document.getElementById('timer-bar'),
    rangeVal: document.getElementById('range-val'),
    attemptsVal: document.getElementById('attempts-val'),
    fbTitle: document.getElementById('fb-title'),
    fbDesc: document.getElementById('fb-desc'),
    card: document.querySelector('.game-card') // for animations
};

/* --- Initialization --- */
function initGame() {
    // Reset State
    secret = Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1)) + MIN_NUM;
    attempts = MAX_ATTEMPTS;
    minRange = MIN_NUM;
    maxRange = MAX_NUM;
    timeLeft = MAX_TIME;
    isGameActive = true;

    // Reset UI
    els.input.value = '';
    els.input.disabled = false;
    els.input.focus();
    els.btnGuess.classList.remove('hidden');
    els.btnRestart.classList.add('hidden');
    
    updateDashboard();
    setFeedback("Make your move", "Clock is ticking...", "");
    
    // Start Timer
    clearInterval(timer);
    els.timeVal.textContent = MAX_TIME;
    els.timeBar.style.width = '100%';
    els.timeBar.style.backgroundColor = 'var(--primary)';
    
    timer = setInterval(gameLoop, 1000);
    
    console.log("Secret:", secret); // For debugging
}

/* --- Core Logic --- */
function gameLoop() {
    if (!isGameActive) return;

    timeLeft--;
    els.timeVal.textContent = timeLeft;
    
    // Update Timer Bar visual
    const percentage = (timeLeft / MAX_TIME) * 100;
    els.timeBar.style.width = `${percentage}%`;
    
    if (percentage < 30) els.timeBar.style.backgroundColor = 'var(--hot)';

    if (timeLeft <= 0) {
        endGame(false, "Time's Up!");
    }
}

function handleGuess() {
    if (!isGameActive) return;

    const val = parseInt(els.input.value);

    // Validation
    if (isNaN(val)) {
        triggerShake();
        return;
    }
    if (val < minRange || val > maxRange) {
        setFeedback("Out of Range", `Stay between ${minRange} and ${maxRange}`, "cold");
        triggerShake();
        return;
    }

    attempts--;
    updateDashboard();

    // Check Win/Loss
    if (val === secret) {
        const score = attempts * 10 + timeLeft; // Bonus for speed
        endGame(true, `Score: ${score}`);
        return;
    }

    if (attempts === 0) {
        endGame(false, "Out of attempts");
        return;
    }

    // Logic: Update Range & Provide Feedback
    let feedbackTitle = "";
    let feedbackClass = "";
    
    // Narrow the range based on logic
    if (val < secret) {
        minRange = Math.max(minRange, val + 1); // Logic: Secret is higher
        feedbackTitle = "Too Low";
    } else {
        maxRange = Math.min(maxRange, val - 1); // Logic: Secret is lower
        feedbackTitle = "Too High";
    }

    // Determine Temperature (Distance)
    const diff = Math.abs(secret - val);
    if (diff <= 5) {
        feedbackTitle += " & 🔥 HOT";
        feedbackClass = "hot";
    } else if (diff <= 15) {
        feedbackTitle += " & 🌡️ Warm";
        feedbackClass = "warm";
    } else {
        feedbackTitle += " & ❄️ Cold";
        feedbackClass = "cold";
    }

    setFeedback(feedbackTitle, `Try between ${minRange} - ${maxRange}`, feedbackClass);
    updateDashboard();
    
    // Clear input for next guess
    els.input.value = '';
    els.input.focus();
}

function endGame(win, mainText) {
    isGameActive = false;
    clearInterval(timer);
    els.input.disabled = true;
    els.btnGuess.classList.add('hidden');
    els.btnRestart.classList.remove('hidden');
    els.btnRestart.focus();

    if (win) {
        setFeedback("YOU WON! 🎉", mainText, "win");
        saveHighScore(attempts * 10);
        triggerConfettiEffect(); // Simple visual effect via CSS class
    } else {
        setFeedback("GAME OVER 💀", `The number was ${secret}. ${mainText}`, "hot");
    }
}

/* --- UI Helpers --- */
function updateDashboard() {
    els.rangeVal.textContent = `${minRange} - ${maxRange}`;
    els.attemptsVal.textContent = attempts;
}

function setFeedback(title, desc, styleClass) {
    els.fbTitle.textContent = title;
    els.fbDesc.textContent = desc;
    els.fbTitle.className = "feedback-title " + styleClass;
}

function triggerShake() {
    els.card.classList.add('animate-shake');
    setTimeout(() => els.card.classList.remove('animate-shake'), 300);
}

function triggerConfettiEffect() {
    // Simple visual pulse for win
    els.card.classList.add('animate-pulse');
    setTimeout(() => els.card.classList.remove('animate-pulse'), 500);
}

// LocalStorage for Best Score (Optional)
function saveHighScore(score) {
    const currentBest = localStorage.getItem('ng_logic_best');
    if (!currentBest || score > parseInt(currentBest)) {
        localStorage.setItem('ng_logic_best', score);
    }
}

/* --- Event Listeners --- */
els.btnGuess.addEventListener('click', handleGuess);
els.btnRestart.addEventListener('click', initGame);

els.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleGuess();
});

// Start on load
window.onload = initGame;
