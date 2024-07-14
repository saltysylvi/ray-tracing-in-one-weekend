export {Camera}

import {Vec3, Point3, Color, writeColor} from './vec3.js';
import {Ray} from './ray.js';
import {HitRecord} from './hittable.js';
import {Interval} from './interval.js';

class Camera {

    constructor() {
        this.aspectRatio = 1.0;
        this.imageWidth = 100;
    }

    render(world) {
        this.initialize();

        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = this.imageWidth;
        canvas.height = this.imageHeight;

        for (let j = 0; j < this.imageHeight; j++) {
            console.log(`Scanlines remaining: ${this.imageHeight-j}`);
            for (let i = 0; i < this.imageWidth; i++) {
                const pixelCenter = this.pixel00Loc.add(this.pixelDeltaU.mul(i)).add(this.pixelDeltaV.mul(j));
                const rayDirection = pixelCenter.sub(this.center);
                const r = new Ray(this.center, rayDirection);
        
                const pixelColor = this.rayColor(r, world);
                writeColor(pixelColor, ctx, i, j);
            }
        }
        
        console.log("Done.");
    }

    initialize() {
        this.imageHeight = Math.max(1, Math.floor(this.imageWidth / this.aspectRatio));
        this.center = new Point3(0, 0, 0);

        // Determine viewport dimensions.
        this.focalLength = 1.0;
        this.viewportHeight = 2.0;
        this.viewportWidth = this.viewportHeight * this.imageWidth / this.imageHeight;

        // Calculate the vectors across the horizontal and down the vertical viewport edges.
        this.viewportU = new Vec3(this.viewportWidth, 0, 0);
        this.viewportV = new Vec3(0, -this.viewportHeight, 0);

        // Calculate the horizontal and vertical delta vectors from pixel to pixel.
        this.pixelDeltaU = this.viewportU.div(this.imageWidth);
        this.pixelDeltaV = this.viewportV.div(this.imageHeight);

        // Calculate the location of the upper left pixel.
        this.viewportUpperLeft = this.center.sub(new Vec3(0,0,this.focalLength)).sub(this.viewportU.div(2)).sub(this.viewportV.div(2));
        this.pixel00Loc = this.viewportUpperLeft.add(this.pixelDeltaU.add(this.pixelDeltaV).div(2));
    }

    rayColor(r, world) {
        const rec = new HitRecord();
        if (world.hit(r, new Interval(0, Infinity), rec)) {
            return rec.normal.add(1).div(2);
        }
    
        const unitDirection = r.direction.normalize();
        const a = 0.5 * (unitDirection.y + 1); 
        return (new Color(1, 1, 1)).mul(1 - a).add((new Color(0.5, 0.7, 1)).mul(a));
    }

}
