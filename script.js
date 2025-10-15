const socket = io();
const container = document.getElementById("container");
const playerCount = document.getElementById("player-count");
const me = document.getElementById("dvdplayer");
const dvd = document.getElementById("dvdLogo");
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
    el.src = `dvds/${getRandomInt(7)}.png`;
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

const others = {};
let x = 100, y = 100, mx = 0, my = 0;
const speed = 0.08;

window.addEventListener("click", function () {
    changeDvdImage(me);
})

socket.on("online", c => playerCount.textContent = "Players: " + c);

socket.on("init", (all) => {
    for (let id in all) if (id !== socket.id) addPlayer(id, all[id]);
});

socket.on("newPlayer", d => addPlayer(d.id, d));
socket.on("update", d => movePlayer(d));
socket.on("remove", id => removePlayer(id));

function addPlayer(id, pos) {
    const el = document.createElement("img");
    el.src = `dvds/${Math.floor(Math.random() * 7)}.png`;
    el.style = "position:absolute;width:80px;height:80px;";
    container.appendChild(el);
    el.style.left = pos.x + "px";
    el.style.top = pos.y + "px";
    others[id] = el;
}

function movePlayer(d) {
    if (others[d.id]) {
        others[d.id].style.left = d.x + "px";
        others[d.id].style.top = d.y + "px";
    }
}

function removePlayer(id) {
    if (others[id]) {
        others[id].remove();
        delete others[id];
    }
}

document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });

function loop() {
    x += (mx - x) * speed;
    y += (my - y) * speed;
    me.style.left = x + "px";
    me.style.top = y + "px";
    socket.emit("move", { x, y });
    requestAnimationFrame(loop);
}
loop();
