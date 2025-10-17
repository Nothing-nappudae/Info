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


// === Custom Cursor ===
(() => {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    // Make sure it's a direct child of <body>
    if (cursor.parentElement !== document.body) {
        document.body.appendChild(cursor);
    }

    // Move cursor with perfect alignment
    window.addEventListener("pointermove", (e) => {
        cursor.style.opacity = "1";
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }, { passive: true });

    // Hide cursor when mouse leaves window
    window.addEventListener("pointerleave", () => {
        cursor.style.opacity = "0";
    });
})();

// === Smooth-fade animated favicon ===
// Requirements: images/icon1.png & images/icon2.png (32x32 recommended)
(() => {
    const icons = ["images/icon1.png", "images/icon2.png"];
    const swapInterval = 2500;   // total time each icon is shown (ms)
    const fadeDuration = 800;    // crossfade time (ms)

    const link = document.querySelector("link[rel='icon']") || (() => {
        const l = document.createElement("link");
        l.rel = "icon";
        document.head.appendChild(l);
        return l;
    })();

    // preload images
    const imgs = icons.map(src => {
        const img = new Image();
        img.crossOrigin = "anonymous"; // harmless if same-origin; helps if remote
        img.src = src;
        return img;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const SIZE = 32; // favicon size
    canvas.width = SIZE;
    canvas.height = SIZE;

    let idx = 0;
    let startTime = performance.now();
    let phase = "hold"; // "hold" or "fade"

    function drawFavicon(a, b, t) {
        // t in [0..1] = blend factor
        ctx.clearRect(0, 0, SIZE, SIZE);
        // draw A at opacity (1 - t)
        ctx.globalAlpha = 1 - t;
        ctx.drawImage(a, 0, 0, SIZE, SIZE);
        // draw B at opacity t
        ctx.globalAlpha = t;
        ctx.drawImage(b, 0, 0, SIZE, SIZE);
        ctx.globalAlpha = 1;
        link.href = canvas.toDataURL("image/png");
    }

    function tick(now) {
        // if images not ready yet, keep trying
        if (!imgs[0].complete || !imgs[1].complete) {
            requestAnimationFrame(tick);
            return;
        }

        const elapsed = now - startTime;

        if (phase === "hold") {
            // show current icon without blending
            drawFavicon(imgs[idx], imgs[idx], 0);
            if (elapsed >= swapInterval - fadeDuration) {
                // start fading to next icon
                phase = "fade";
                startTime = now;
            }
        } else {
            // crossfade
            const t = Math.min(1, (now - startTime) / fadeDuration);
            const next = (idx + 1) % imgs.length;
            drawFavicon(imgs[idx], imgs[next], t);
            if (t >= 1) {
                // switch to next icon and hold again
                idx = next;
                phase = "hold";
                startTime = now;
            }
        }

        requestAnimationFrame(tick);
    }

    // initial icon (in case nothing is set)
    imgs[0].addEventListener("load", () => {
        drawFavicon(imgs[0], imgs[0], 0);
    });

    requestAnimationFrame(tick);
})();
// Toggle "More Info" for any project card (works for many cards)
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".more-info-btn");
    if (!btn) return;

    const card = btn.closest(".project");
    if (!card) return;

    const info = card.querySelector(".more-info");
    if (!info) return;

    const isOpen = info.classList.toggle("open");
    btn.textContent = isOpen ? "Less Info" : "More Info";
});
