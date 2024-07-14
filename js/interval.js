export {Interval}

class Interval {
    
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }

    size() {
        return this.max - this.min;
    }

    contains(x) {
        return this.min <= x && x <= this.max;
    }

    surrounds(x) {
        return this.min < x && x < this.max;
    }

    clamp(x) {
        if (x < this.min) return this.min;
        if (x > this.max) return this.max;
        return x;
    }

    static empty = new Interval(Infinity, -Infinity);
    static universe = new Interval(-Infinity, Infinity);

}