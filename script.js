const board = document.querySelector('.board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.querySelector('.status');
const restartButton = document.querySelector('.restart-btn');
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

let currentPlayer = 'x';
let gameActive = true;

const loveQuotes = [
    "Every move brings us closer together 💕",
    "You make my heart skip a beat 💓",
    "Together is our favorite place to be 🏡",
    "You're my perfect player two 🎮",
    "Our love story is my favorite game 📖",
    "You're the missing piece to my puzzle 🧩",
    "Every moment with you is magical ✨",
    "You're my favorite adventure 🌈",
    "Our love is pixel perfect 💝",
    "You make my heart glow 💫"
];

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    document.querySelector('.floating-hearts').appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
}

function updateLoveQuote() {
    const quoteElement = document.querySelector('.love-quote');
    const randomQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
    quoteElement.textContent = randomQuote;
}

// Start floating hearts
setInterval(createFloatingHeart, 2000);

// Initial quote
updateLoveQuote();

const winningMessages = [
    "Baby Dorling and Kammo's love prevails! 👑",
    "Another castle conquered together! 🏰",
    "The princess is won! 🌟",
    "Game over with love! 🍄"
];

const romanticDares = [
    "Give your partner a sweet forehead kiss 💋",
    "Write a tiny love note and hide it in their pocket 💌",
    "Give them a 30-second shoulder massage with love 💆‍♀️",
    "Tell them your favorite memory together 💭",
    "Give them three genuine compliments 💝",
    "Do a slow dance together to your favorite song 💃",
    "Make up a silly love poem on the spot 📝",
    "Give them the tightest, warmest hug 🤗",
    "Feed them their favorite snack 🍫",
    "Whisper something sweet in their ear 💖",
    "Create a heart shape with your hands and blow a kiss 💕",
    "Give them butterfly kisses (fluttering your eyelashes against their cheek) 🦋",
    "Tell them what made you fall in love with them 😍",
    "Make their favorite drink with extra love 🍹",
    "Give them a piggyback ride around the room 🏃",
    "Draw a tiny heart on their palm ✌️",
    "Sing a few lines from their favorite love song 🎤",
    "Do your best impression of when you first met 😊",
    "Take a cute selfie together with a funny face 🤭",
    "Give them a sweet nickname and use it for the next hour 💞",
    "Do the 'Lady and the Tramp' spaghetti scene with any snack 🍝",
    "Slow dance to no music for 30 seconds 💑",
    "Write 'I Love You' on their back with your finger ✏️",
    "Make up a 30-second story about your future together 🌟",
    "Give them your best compliment in a funny accent 🎙",
    "Do your silliest dance move to make them laugh 🕺",
    "Close your eyes and describe their face from memory 😊",
    "Give them a gentle nose boop and say something cute 👃",
    "Create a tiny love coupon for them on the spot 🎁",
    "Tell them a secret you've never told anyone else 🤲"
];

function handleCellClick(e) {
    // Create hearts on click
    for(let i = 0; i < 3; i++) {
        setTimeout(createFloatingHeart, i * 200);
    }
    // Update love quote on each move
    updateLoveQuote();
    const cell = e.target;
    if (cell.classList.contains('x') || cell.classList.contains('o') || !gameActive) return;

    placeMark(cell, currentPlayer);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        updateStatus();
    }
}

function placeMark(cell, player) {
    cell.classList.add(player);
}

function checkWin(player) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(player);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

// Love Graffiti Animation
class LoveParticle {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.size = Math.random() * 25 + 10; // Larger size
        
        // Spread particles in all directions
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
        
        this.gravity = 0.05; // Reduced gravity for slower fall
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
        this.opacity = 1;
        this.symbol = ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)];
        this.fadeRate = 0.005 + Math.random() * 0.005; // Randomized fade rate
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.rotation += this.rotationSpeed;
        this.opacity -= this.fadeRate;

        // Bounce off edges
        if (this.x < 0 || this.x > this.canvas.width) {
            this.speedX *= -0.8;
        }
        if (this.y < 0) {
            this.speedY *= -0.8;
            this.y = 0;
        }
        if (this.y > this.canvas.height) {
            this.speedY *= -0.6;
            this.y = this.canvas.height;
            this.speedX *= 0.95; // Friction
        }

        return this.opacity > 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.symbol, 0, 0);
        ctx.restore();
    }
}

function createLoveGraffiti() {
    const canvas = document.getElementById('loveGraffiti');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles from multiple spawn points
    const numParticles = 150; // More particles
    const spawnPoints = [
        { x: canvas.width / 2, y: canvas.height / 2 }, // Center
        { x: 0, y: 0 }, // Top-left
        { x: canvas.width, y: 0 }, // Top-right
        { x: 0, y: canvas.height }, // Bottom-left
        { x: canvas.width, y: canvas.height }, // Bottom-right
    ];

    for (let i = 0; i < numParticles; i++) {
        const spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
        particles.push(new LoveParticle(
            spawnPoint.x + (Math.random() - 0.5) * 100,
            spawnPoint.y + (Math.random() - 0.5) * 100,
            canvas
        ));
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(particle => {
            const alive = particle.update();
            if (alive) particle.draw(ctx);
            return alive;
        });

        if (particles.length > 0) {
            animationId = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        status.textContent = "It's a lovely draw! Both get a dare! 💝";
    } else {
        const randomMessage = winningMessages[Math.floor(Math.random() * winningMessages.length)];
        status.textContent = randomMessage;
        createLoveGraffiti(); // Create love graffiti on win
        
        // Add winning animation to the winning combination
        const winningCombo = WINNING_COMBINATIONS.find(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentPlayer);
            });
        });
        
        winningCombo.forEach(index => {
            cells[index].classList.add('winner');
        });
    }
    
    // Show romantic dare
    setTimeout(() => {
        const randomDare = romanticDares[Math.floor(Math.random() * romanticDares.length)];
        const loser = currentPlayer === 'x' ? 'Kammo' : 'Baby Dorling';
        status.innerHTML = `<div class="dare-message">
            ${draw ? 'Both players get a dare!' : `${loser}'s dare:`}<br>
            ${randomDare}
        </div>`;
    }, 2000);
}

function updateStatus() {
    status.textContent = `${currentPlayer === 'x' ? 'Baby Dorling' : 'Kammo'}'s turn 💕`;
}

function restartGame() {
    currentPlayer = 'x';
    gameActive = true;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'winner');
    });
    updateStatus();
}

// Prevent double tap zoom on iOS
document.addEventListener('touchend', function(event) {
    if (event.target.classList.contains('cell') || event.target.classList.contains('restart-btn')) {
        event.preventDefault();
    }
}, false);

// Handle both touch and click events
function addMultiEventListener(element, events, handler) {
    events.forEach(event => element.addEventListener(event, handler, { passive: false }));
}

// Event Listeners
cells.forEach(cell => {
    addMultiEventListener(cell, ['click', 'touchend'], function(e) {
        e.preventDefault();
        handleCellClick(e);
    });
});

addMultiEventListener(restartButton, ['click', 'touchend'], function(e) {
    e.preventDefault();
    restartGame();
});

// Initialize game
updateStatus();
