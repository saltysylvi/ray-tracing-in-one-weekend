export {Vec3, Color}

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

class Color extends Vec3 {

    constructor(r, g, b) {
        super(r, g, b);
    }

    // writes this color to canvas with context ctx at pixel (x,y)
    writeColor(ctx, x, y) {
        const r = Math.floor(255.999 * this.x);
        const g = Math.floor(255.999 * this.y);
        const b = Math.floor(255.999 * this.z);

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, y, 1, 1);
    }
}
