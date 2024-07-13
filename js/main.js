import {Vec3, Point3, Color, writeColor} from './vec3.js';
import {Ray} from './ray.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function hitSphere(center, radius, r) {
    const oc = center.sub(r.origin);
    const a = r.direction.lengthSquared();
    const b = -2.0 * r.direction.dot(oc);
    const c = oc.lengthSquared() - radius*radius;
    const discriminant = b*b - 4*a*c;
    return discriminant >= 0;
}

function rayColor(r) {
    if (hitSphere(new Point3(0,0,-1), 0.5, r))
        return new Color(1, 0, 0);

    const unitDirection = r.direction.normalize();
    const a = 0.5 * (unitDirection.y + 1); 
    return (new Color(1, 1, 1)).mul(1 - a).add((new Color(0.5, 0.7, 1)).mul(a));
}

// Image

const aspectRatio = 16 / 9;
canvas.width = 400;

// Calculate canvas height and ensure that it's at least 1.
canvas.height = Math.max(1, Math.floor(canvas.width / aspectRatio));

// Camera

const focalLength = 1.0;
const viewportHeight = 2.0;
const viewportWidth = viewportHeight * canvas.width / canvas.height;
const cameraCenter = new Point3(0, 0, 0);

// Calculate the vectors across the horizontal and down the vertical viewport edges.
const viewportU = new Vec3(viewportWidth, 0, 0);
const viewportV = new Vec3(0, -viewportHeight, 0);

// Calculate the horizontal and vertical delta vectors from pixel to pixel.
const pixelDeltaU = viewportU.div(canvas.width);
const pixelDeltaV = viewportV.div(canvas.height);

// Calculate the location of the upper left pixel.
const viewportUpperLeft = cameraCenter.sub(new Vec3(0, 0, focalLength)).sub(viewportU.div(2)).sub(viewportV.div(2));
const pixel00Loc = viewportUpperLeft.add(pixelDeltaU.add(pixelDeltaV).div(2));

// Render

for (let j = 0; j < canvas.height; j++) {
    console.log(`Scanlines remaining: ${canvas.height-j}`);
    for (let i = 0; i < canvas.width; i++) {
        const pixelCenter = pixel00Loc.add(pixelDeltaU.mul(i)).add(pixelDeltaV.mul(j));
        const rayDirection = pixelCenter.sub(cameraCenter);
        const r = new Ray(cameraCenter, rayDirection);

        const pixelColor = rayColor(r);
        writeColor(pixelColor, ctx, i, j);
    }
}

console.log("Done.");
