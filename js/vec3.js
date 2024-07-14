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

    static random(min, max) {
        min = min ?? 0;
        max = max ?? 1;
        return (new Vec3(Math.random(), Math.random(), Math.random())).add(min).mul(max-min);
    }

    static randomInUnitSphere() {
        while (true) {
            const p = Vec3.random(-1, 1);
            if (p.lengthSquared() < 1)
                return p;
        }
    }

    static randomUnitVector() {
        return Vec3.randomInUnitSphere().normalize();
    }

    static randomOnHemisphere(normal) {
        const onUnitSphere = Vec3.randomUnitVector();
        if (onUnitSphere.dot(normal) > 0) // In the same hemisphere as the normal
            return onUnitSphere;
        else
            return onUnitSphere.neg();
    }
}

// class synonym for Vec3, to be thought of as a point instead of an arrow
const Point3 = Vec3;

// class synonym for Vec3, to be thought of rgb color space
const Color = Vec3;

function linearToGamma(linearComponent) {
    if (linearComponent > 0)
        return Math.sqrt(linearComponent);
    return 0;
}

// writes color to canvas with context ctx at pixel (x,y)
function writeColor(color, ctx, x, y) {
    // Apply a linear to gamma transform for gamma 2
    const r = linearToGamma(color.x);
    const g = linearToGamma(color.y);
    const b = linearToGamma(color.z);

    // Translate the [0,1] component values to the byte range [0,255].
    const intensity = new Interval(0.000, 0.999);
    const rbyte = Math.floor(256 * intensity.clamp(r));
    const gbyte = Math.floor(256 * intensity.clamp(g));
    const bbyte = Math.floor(256 * intensity.clamp(b));

    // Write out the pixel color components.
    ctx.fillStyle = `rgb(${rbyte},${gbyte},${bbyte})`;
    ctx.fillRect(x, y, 1, 1);
}
