class Vehicle {

    constructor(x, y) {
        this.fov = 50 + Math.floor(Math.random() * 50) + 1;
        this.pos = new Vec2(x, y); // Location
        this.vel = new Vec2(Math.random() * 2 - 1, Math.random() * 2 - 1); // Velocity
        this.acc = new Vec2(0, 0); // Acceleration

        this.mass = 1;
        this.maxSpeed = 2;
        this.maxForce = 0.1;

        this.vel.setMag(this.maxSpeed);
    }

    calc_SteeringForce(target) {
        let desV = Vec2.sub(target, this.pos); // Desired velocity
        
        if (desV.x == 0 && desV.y == 0)
            return new Vec2(0, 0);

        desV.setMag(this.maxSpeed);

        let sf = Vec2.sub(desV, this.vel); // Steering force
        sf.limit(this.maxForce);

        return sf;
    }

    applyForce(force) {
        // Force = Mass * Acceleration
        force = force.copy();
        this.acc.add(force.div(this.mass));
    }

    update() {
        this.vel.add(this.acc);
        this.vel.setMag(this.maxSpeed);
        this.pos.add(this.vel);

        // Reset acceleration
        this.acc.mult(0);
    }

    display() {
        let dir = this.vel.copy();
        
        if (dir.x == 0 && dir.y == 0)
            dir.set(0, -1);

        dir.setMag(10);

        let p2 = dir.copy().add(this.pos);
        let p1 = dir.copy().mult(-1).rotate( 0.3).add(this.pos);
        let p3 = dir.copy().mult(-1).rotate(-0.3).add(this.pos);

        noStroke();
        fill(color(40));
        triangle(
            p1.x, p1.y,
            p2.x, p2.y,
            p3.x, p3.y
        );
    }
    
}