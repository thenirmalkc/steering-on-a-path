let DEBUG = false;

const width = 640;
const height = 480;

let vehicles = [];
let path = new Path(25);


function setup() {
    const canvas = createCanvas(width, height);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);

    path.add(100,  75, 540,  75);
    path.add(540,  75, 540, 405);
    path.add(540, 405, 100, 405);
    path.add(100, 405, 100,  75);
}


function draw() {
    background(255);

    strokeWeight(2);
    stroke(color(200));
    noFill();
    rect(0, 0, width, height);

    path.display();

    for (let i = 0; i < vehicles.length; i ++) {
        let target = GetTarget(vehicles[i]);
        
        if (target) {
            let sf = vehicles[i].calc_SteeringForce(target);
            vehicles[i].applyForce(sf);
        }

        vehicles[i].update();
        vehicles[i].display();
    }
}


function mousePressed() {
    if (mouseX < 0 || mouseY < 0 || mouseX >= width || mouseY >= height)
        return;

    if (vehicles.length < 20)
        vehicles.push(new Vehicle(mouseX, mouseY));
}


function GetTarget(vehicle) {
    let minDist = Infinity;
    let vec1, vec2, vel, fPos, proj, dist;
    let origin;
    let FPos, Proj, dir;
    let target;

    for (let i = 0; i < path.points.length - 1; i ++) {
        vec1 = Vec2.sub(vehicle.pos, path.points[i]); // Position vector
        vec2 = Vec2.sub(path.points[i + 1], path.points[i]); // Path vector
        vel = vehicle.vel.copy();
        vel.setMag(vehicle.fov);

        // Calculating future position
        fPos = Vec2.add(vec1, vel);

        // Calculating future position's projection on path
        proj = fPos.proj(vec2);

        if (proj.mag() > vec2.mag())
            continue;

        // Calculating perpendicular distance between future position and projection on path
        dist = Vec2.dist(fPos, proj);

        if (dist < minDist) {
            origin = path.points[i];
            FPos = fPos;
            Proj = proj;

            dir = vec2.copy();
            dir.setMag(vehicle.fov);
            target = Vec2.add(proj, dir);

            minDist = dist;
        }
    }

    target.add(origin);
    
    if (DEBUG) {
        FPos.add(origin);
        Proj.add(origin);

        strokeWeight(1);
        stroke(color(0, 0, 255));
        line(vehicle.pos.x, vehicle.pos.y, FPos.x, FPos.y);
        line(FPos.x, FPos.y, Proj.x, Proj.y);

        noStroke();
        fill(color(255, 0, 0));
        circle(target.x, target.y, 6);
    }

    if (minDist > path.radius)
        return target;
    else
        return null;
}