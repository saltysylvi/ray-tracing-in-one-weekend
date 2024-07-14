import {Point3} from './vec3.js';
import {Sphere, HittableList} from './hittable.js';
import {Camera} from './camera.js';

const world = new HittableList();
world.add(new Sphere(new Point3(0, 0, -1), 0.5));
world.add(new Sphere(new Point3(0, -100.5, -1), 100));

const cam = new Camera();
cam.aspectRatio = 16/9;
cam.imageWidth = 400;
cam.samplesPerPixel = 100;
cam.render(world);
