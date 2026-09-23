// Reasons database
const reasons = [
    {
        heading: "🌸 Your Smile ✨😊",
        text: "Your smile is literally my favorite thing ever 😭💗. No matter how tired, annoyed, or bored I am, one smile from you and suddenly everything feels better 🌸☀️.",
        emoji: "🌟",
        gif: "gif1.gif"
    },
    {
        heading: "🎙️ Your Voice Notes 💕😭",
        text: "Those random voice notes, the 'Ariii Teraaa!!' 😭🎀, and that adorable accent literally make my day every single time 💌✨. I could listen to them for hours and still want more 😭💖.",
        emoji: "💗",
        gif: "gif2.gif"
    },
    {
        heading: "💥 Our Chaos Together 🤏😝",
        text: "I love how we can go from having the sweetest conversation ever 🥺💗 to absolute nonsense and rage-baiting each other 💥🤏😝 within five minutes. You're my favorite person to be silly with 😭🎀.",
        emoji: "💕",
        gif: "gif1.gif"
    },
    {
        heading: "🌎 You Make Life Better 💫💖",
        text: "You make ordinary days feel special 🌸💫. Talking to you, laughing with you, and just having you in my life feels like one of the best things that has ever happened to me 🫶🥹💖.",
        emoji: "🌟",
        gif: "gif2.gif"
    },
    {
        heading: "🫂 You're Simply You, my 'Iris' 🎀💗",
        text: "Not because you're perfect 💕, not because of anything special you do 💫, but simply because you're you 🥹💖. Your kindness, your laugh, your little habits, and everything that makes you 'Antara' is more than enough for me 😭🫶🌷.",
        emoji: "💝",
        gif: "gif1.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';

    const text = document.createElement('div');
    text.className = 'reason-text';

    text.innerHTML = `
        <h2 style="margin-bottom:15px; font-size:1.8rem;">
            ${reason.heading}
        </h2>
        <p>${reason.emoji} ${reason.text}</p>
    `;

    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;

    card.appendChild(text);
    card.appendChild(gifOverlay);

    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);

        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;

        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');

                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html';
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);

    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });

    displayNewReason();
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];

    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];

    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';

    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);