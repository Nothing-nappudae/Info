// === TYPEWRITER (Fun Mode) ===
const funIntroText = "Hey there, I'm Sai";
const funSubText = "I build random stuff, play Valorant and chess, and make dumb things work beautifully.";

let i = 0, j = 0;

function typeFunIntro() {
    if (i < funIntroText.length) {
        document.getElementById("funIntro").textContent += funIntroText.charAt(i);
        i++;
        setTimeout(typeFunIntro, 90);
    } else {
        setTimeout(typeFunSub, 300);
    }
}

function typeFunSub() {
    if (j < funSubText.length) {
        document.getElementById("subtext").textContent += funSubText.charAt(j);
        j++;
        setTimeout(typeFunSub, 45);
    }
}

typeFunIntro();


// === HOBBIES TOGGLE ===
document.getElementById("toggleHobbies").addEventListener("click", () => {
    const box = document.getElementById("hobbiesBox");
    box.style.display = box.style.display === "block" ? "none" : "block";
});


// === SERIOUS MODE SWITCH ===
const seriousBtn = document.getElementById("seriousBtn");
const backToFun = document.getElementById("backToFun");
const funMode = document.getElementById("funMode");
const seriousMode = document.getElementById("seriousMode");

seriousBtn.addEventListener("click", () => {
    funMode.style.display = "none";
    seriousMode.style.display = "block";
    document.body.classList.add("serious-mode");
    startSeriousIntro();
});

backToFun.addEventListener("click", () => {
    seriousMode.style.display = "none";
    funMode.style.display = "block";
    document.body.classList.remove("serious-mode");
});


// === TYPEWRITER (Serious Mode) ===
const seriousLines = [
    "Hi, I'm Sai",
    "18 y/o developer passionate about AI, robotics, and computer science."
];

let line = 0, char = 0;

function startSeriousIntro() {
    const el = document.getElementById("seriousIntro");
    el.textContent = "";
    line = 0;
    char = 0;
    typeSeriousLine(el);
}

function typeSeriousLine(el) {
    if (line < seriousLines.length) {
        if (char < seriousLines[line].length) {
            el.textContent += seriousLines[line].charAt(char);
            char++;
            setTimeout(() => typeSeriousLine(el), 70);
        } else {
            el.textContent += "\n";
            line++;
            char = 0;
            setTimeout(() => typeSeriousLine(el), 400);
        }
    }
}


// === CUSTOM GLOWING CURSOR ===
const cursor = document.getElementById("cursor");
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

// smooth lerp for fluid motion
function animateCursor() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(animateCursor);
}
requestAnimationFrame(animateCursor);

document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// hover effects
document.querySelectorAll("button, a, .game").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.style.width = "40px";
        cursor.style.height = "40px";
        cursor.style.background = "radial-gradient(circle, rgba(0,255,255,0.9), transparent 70%)";
    });
    el.addEventListener("mouseleave", () => {
        cursor.style.width = "18px";
        cursor.style.height = "18px";
        cursor.style.background = "radial-gradient(circle, rgba(0,255,255,0.8), transparent 70%)";
    });
});
