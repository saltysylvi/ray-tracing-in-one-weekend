import {Vec3, Color} from './vec3.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Image

canvas.width = 256;
canvas.height = 256;

// Render

for (let j = 0; j < canvas.height; j++) {
    console.log(`Scanlines remaining: ${canvas.height-j}`);
    for (let i = 0; i < canvas.width; i++) {
        const pixelColor = new Color(i / (canvas.width-1), j / (canvas.height-1), 0);
        pixelColor.writeColor(ctx, i, j);
    }
}

console.log("Done.");
