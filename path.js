class Path {

    constructor(radius) {
        this.radius = radius;
        this.points = [];
    }

    add(x1, y1, x2, y2) {
        this.points.push(new Vec2(x1, y1));
        this.points.push(new Vec2(x2, y2));
    }

    display() {
        strokeWeight(this.radius * 2);
        stroke(color(220));
        for (let i = 0; i < this.points.length - 1; i ++) {
            line(
                this.points[i].x, this.points[i].y,
                this.points[i + 1].x, this.points[i + 1].y
            );
        }

        strokeWeight(2);
        stroke(color(200));
        for (let i = 0; i < this.points.length - 1; i ++) {
            line(
                this.points[i].x, this.points[i].y,
                this.points[i + 1].x, this.points[i + 1].y
            );
        }
    }

}