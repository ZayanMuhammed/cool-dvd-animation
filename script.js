// script.js
const dvd = document.getElementById("dvdLogo");
const container = document.getElementById("container");
const btn = document.getElementById("add")
const rbtn = document.getElementById("bin")


// Position and speed
let posX = 0;
let posY = 0;
let speedX = 2;
let speedY = 2;

function moveDvd() {
    // Max boundaries
    const maxX = container.clientWidth - dvd.clientWidth;
    const maxY = container.clientHeight - dvd.clientHeight;

    // Update position
    posX += speedX;
    posY += speedY;

    // Bounce off edges
    if (posX <= 0 || posX >= maxX) speedX = -speedX;
    if (posY <= 0 || posY >= maxY) speedY = -speedY;

    // Apply position
    dvd.style.left = posX + "px";
    dvd.style.top = posY + "px";

    // Next frame
    requestAnimationFrame(moveDvd);
}

// Start animation
moveDvd();

btn.addEventListener('click', function () {
    const clonedDiv = dvd.cloneNode(true);
    clonedDiv.style.position = "absolute";
    document.body.appendChild(clonedDiv);

    const maxX = container.clientWidth - clonedDiv.clientWidth;
    const maxY = container.clientHeight - clonedDiv.clientHeight;

    // Correct random position
    let posX = Math.floor(Math.random() * maxX);
    let posY = Math.floor(Math.random() * maxY);
    let speedX = 2;
    let speedY = 2;

    function moveClone() {
        const maxX = container.clientWidth - clonedDiv.clientWidth;
        const maxY = container.clientHeight - clonedDiv.clientHeight;

        posX += speedX;
        posY += speedY;

        if (posX <= 0 || posX >= maxX) speedX = -speedX;
        if (posY <= 0 || posY >= maxY) speedY = -speedY;

        clonedDiv.style.left = posX + "px";
        clonedDiv.style.top = posY + "px";

        requestAnimationFrame(moveClone);
    }

    moveClone();

    rbtn.addEventListener('click', function () {
        clonedDiv.remove();
    });
});
