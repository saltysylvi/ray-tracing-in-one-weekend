"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 256;
canvas.height = 256;

// draw a pixel at (x,y) with color (r,g,b)
function drawPixel(x, y, r, g, b) {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, y, 1, 1);
}

for (let j = 0; j < canvas.height; j++) {
    console.log(`Scanlines remaining: ${canvas.height-j}`);
    for (let i = 0; i < canvas.width; i++) {
        let r = i / (canvas.width-1);
        let g = j / (canvas.height-1);
        let b = 0;

        let ir = Math.floor(255.999 * r);
        let ig = Math.floor(255.999 * g);
        let ib = Math.floor(255.999 * b);

        drawPixel(i, j, ir, ig, ib);
    }
}

console.log("Done.");
