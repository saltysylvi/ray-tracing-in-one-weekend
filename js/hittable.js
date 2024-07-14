export {HitRecord, Sphere, HittableList}

import {Interval} from './interval.js'

// stores a point, a normal vector, a t (along ray) recording a hit, and a bool that's true if ray is outside the object
class HitRecord {

    constructor(p, normal, t, frontFace) {
        this.p = p;
        this.normal = normal;
        this.t = t;
        this.frontFace = frontFace;
    }

    setFaceNormal(r, outwardNormal) {
        // Sets the hit record normal vector
        // NOTE: the parameter `outwardNormal` is assumed to have unit length

        this.frontFace = r.direction.dot(outwardNormal) < 0;
        this.normal = this.frontFace ? outwardNormal : -outwardNormal;
    }

}

class Sphere {

    constructor(center, radius) {
        this.center = center;
        this.radius = Math.max(0, radius);
    }

    hit(r, tInterval, rec) {
        const oc = this.center.sub(r.origin);
        const a = r.direction.lengthSquared();
        const h = r.direction.dot(oc);
        const c = oc.lengthSquared() - this.radius*this.radius;

        const discriminant = h*h - a*c;
        if (discriminant < 0)
            return false;

        const sqrtd = Math.sqrt(discriminant);

        // Find the nearest root that lies in the acceptable range
        let root = (h - sqrtd) / a;
        if (!tInterval.surrounds(root)) {
            root = (h + sqrtd) / a;
            if (!tInterval.surrounds(root))
                return false;
        }

        rec.t = root;
        rec.p = r.at(rec.t);
        const outwardNormal = rec.p.sub(this.center).div(this.radius);
        rec.setFaceNormal(r, outwardNormal);

        return true;
    }

}

class HittableList {

    constructor(objects) {
        this.objects = objects || [];
    }

    add(object) {
        this.objects.push(object);
    }

    clear() {
        this.objects = [];
    }

    hit(r, tInterval, rec) {
        const tempRec = new HitRecord();
        let hitAnything = false;
        let closestSoFar = tInterval.max;
        
        for (const object of this.objects) {
            if (object.hit(r, new Interval(tInterval.min, closestSoFar), tempRec)) {
                hitAnything = true;
                closestSoFar = tempRec.t;
                // overwrite rec's fields with tempRec's
                rec.p = tempRec.p;
                rec.normal = tempRec.normal;
                rec.t = tempRec.t;
                rec.frontFace = tempRec.frontFace;
            }
        }

        return hitAnything;
    }

}



