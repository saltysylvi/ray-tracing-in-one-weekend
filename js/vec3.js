export {Vec3, Point3, Color, writeColor}

import {Interval} from "./interval.js";

class Vec3 {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    normalize() {
        const l = this.length()
        return new Vec3(this.x / l, this.y / l, this.z / l);
    }

    neg() {
        return new Vec3(-this.x, -this.y, -this.z);
    }

    add(v) {
        if (v instanceof Vec3) {
            return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
        }
        // if scalar
        return new Vec3(this.x + v, this.y + v, this.z + v);
    }

    sub(v) {
        if (v instanceof Vec3) {
            return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
        }
        // if scalar
        return new Vec3(this.x - v, this.y - v, this.z - v);
    }

    mul(v) {
        if (v instanceof Vec3) {
            return new Vec3(this.x * v.x, this.y * v.y, this.z * v.z);
        }
        // if scalar
        return new Vec3(this.x * v, this.y * v, this.z * v);
    }

    div(v) {
        if (v instanceof Vec3) {
            return new Vec3(this.x / v.x, this.y / v.y, this.z / v.z);
        }
        // if scalar
        return new Vec3(this.x / v, this.y / v, this.z / v);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v) {
        return new Vec3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }
}

// class synonym for Vec3, to be thought of as a point instead of an arrow
const Point3 = Vec3;

// class synonym for Vec3, to be thought of rgb color space
const Color = Vec3;

// writes color to canvas with context ctx at pixel (x,y)
function writeColor(color, ctx, x, y) {

    // Translate the [0,1] component values to the byte range [0,255].
    const intensity = new Interval(0.000, 0.999);
    const r = Math.floor(256 * intensity.clamp(color.x));
    const g = Math.floor(256 * intensity.clamp(color.y));
    const b = Math.floor(256 * intensity.clamp(color.z));

    // Write out the pixel color components.
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, y, 1, 1);
}
