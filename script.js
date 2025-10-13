// script.js
const dvd = document.getElementById("dvdLogo");
const container = document.getElementById("container");
const btn = document.getElementById("add");
const rbtn = document.getElementById("bin");

let posX = 0;
let posY = 0;
let speedX = 2;
let speedY = 2;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function changeDvdImage(el) {
    el.src = `dvds/${getRandomInt(8)}.png`;
}

function moveDvd() {
    const maxX = container.clientWidth - dvd.clientWidth;
    const maxY = container.clientHeight - dvd.clientHeight;

    posX += speedX;
    posY += speedY;

    if (posX <= 0 || posX >= maxX) {
        speedX = -speedX;
        changeDvdImage(dvd);
    }

    if (posY <= 0 || posY >= maxY) {
        speedY = -speedY;
        changeDvdImage(dvd);
    }

    dvd.style.left = posX + "px";
    dvd.style.top = posY + "px";

    requestAnimationFrame(moveDvd);
}

moveDvd();

// Store all clones
const clones = [];

btn.addEventListener("click", function () {
    const clone = dvd.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = Math.random() * (container.clientWidth - 100) + "px";
    clone.style.top = Math.random() * (container.clientHeight - 100) + "px";
    container.appendChild(clone);
    clones.push(clone);

    let posX = Math.random() * 200;
    let posY = Math.random() * 200;
    let speedX = 2 + Math.random() * 2;
    let speedY = 2 + Math.random() * 2;

    function moveClone() {
        const maxX = container.clientWidth - clone.clientWidth;
        const maxY = container.clientHeight - clone.clientHeight;

        posX += speedX;
        posY += speedY;

        if (posX <= 0 || posX >= maxX) {
            speedX = -speedX;
            changeDvdImage(clone);
        }

        if (posY <= 0 || posY >= maxY) {
            speedY = -speedY;
            changeDvdImage(clone);
        }

        clone.style.left = posX + "px";
        clone.style.top = posY + "px";

        requestAnimationFrame(moveClone);
    }

    moveClone();
});

rbtn.addEventListener("click", function () {
    clones.forEach(c => c.remove());
    clones.length = 0; // clear array
});
