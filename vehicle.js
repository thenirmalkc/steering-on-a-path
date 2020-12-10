class Vehicle {

  constructor(x, y) {
    this.mass = 1
    this.max_speed = 4
    this.max_force = 0.1

    this.location = new Vector2D(x, y)

    this.velocity = Vector2D.random()

    // setting vehicle's velocity to positive value
    this.velocity.set_x(Math.abs(this.velocity.x))
    this.velocity.set_y(Math.abs(this.velocity.y))

    // setting vehicle's velocity to max speed
    this.velocity.set_mag(this.max_speed)


    this.acceleration = new Vector2D(0, 0)


  }


  set_mass(mass) {
    this.mass = mass
  }


  // applies force
  apply_force(force) {
    force = force.copy()

    // applying force and changing acceleration
    // acceleration = force / mass
    this.acceleration.add(force.div(this.mass))

  }


  // updates vehicle's velocity and location
  update() {

    // updating velocity by acceleration
    this.velocity.add(this.acceleration)

    // updating location by velocity
    this.location.add(this.velocity)

    // resetting acceleration
    this.acceleration.mult(0)

  }


  // displays vehicle
  display() {

    // calculating 3 points for triangle
    const p2 = this.velocity
      .copy()
      .set_mag(10)
      .add(this.location)

    const p1 = this.velocity
      .copy()
      .set_mag(10)
      .mult(-1)
      .rotate_in_degree(20)
      .add(this.location)

    const p3 = this.velocity
      .copy()
      .set_mag(10)
      .mult(-1)
      .rotate_in_degree(-20)
      .add(this.location)

    noStroke()
    fill(100)
    triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)

  }

}