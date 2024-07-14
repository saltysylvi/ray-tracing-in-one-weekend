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

    static empty = new Interval(Infinity, -Infinity);
    static universe = new Interval(-Infinity, Infinity);

}