const width = 800
const height = 540
let temps

let offset = new Vector2D(0, height / 2)


// Algorithm

// 1) Find the vehicle's future location
// 2) If vehicle's future location is on the path ??
// Yes -> Do nothing
// No  ->
// 3) Find the projection to the path
// 4) And move a bit further from projection on the path


// vehicle
let vehicles = []


// path
let path_radius = 25
let path = new Vector2D(1, 0)

// pointing the path towards positive direction
path.set_x(Math.abs(path.x))
path.set_y(Math.abs(path.y))

// setting the length of path
path.set_mag(width)



function setup() {
	const canvas = createCanvas(width, height)
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2)
	background(240)
}


function draw() {
  // frameRate(1)
  background(240)

  // path
  temp = Vector2D.add(offset, path)
  stroke(0)
  line(offset.x, offset.y, temp.x, temp.y)

  noStroke()
  fill(0, 40)
  rect(offset.x, offset.y - path_radius, width - 1, path_radius * 2)


  // vehicle
  for(let i = 0; i < vehicles.length; i ++) {

    vehicles[i].display()

    const temp_velocity = vehicles[i].velocity.copy()
      .set_mag(50)
    const future_location = Vector2D.add(vehicles[i].location, temp_velocity)
    const projection = Vector2D.projection(future_location, path)
      .add(offset)
    const target = path.copy()
      .set_mag(50)
      .add(projection)


    // displaying lines
    stroke(100)
    line(vehicles[i].location.x, vehicles[i].location.y, future_location.x, future_location.y)
    line(future_location.x, future_location.y, projection.x, projection.y)

    // displaying projection
    noStroke()
    fill(100)
    circle(projection.x, projection.y, 4)

    // displaying target
    noStroke()
    fill(255, 0, 0)
    circle(target.x, target.y, 4)


    const distance = calc_distance(future_location, path)
    if(distance > path_radius) {
      vehicles[i].apply_force(calc_steering_force(target, vehicles[i]))
    }

    vehicles[i].update()

    // checking if vehicle is out of canvas or not
    check_edges(vehicles[i])
  }
}


// calculates steering force between vehicle and target on path
function calc_steering_force(target, vehicle) {

  const desired_vel = Vector2D.sub(target, vehicle.location)
    .set_mag(vehicle.max_speed)

  const steering_force = Vector2D.sub(desired_vel, vehicle.velocity)
    .limit(vehicle.max_force)

  return steering_force
}

// calculates distance between vehicle and path
function calc_distance(future_location, path) {
  const projection = Vector2D.projection(future_location, path)
  const distance_vector = Vector2D.sub(projection, future_location)

  return Vector2D.add(offset, distance_vector).mag()
}


// checks if vehicle is out of canvas
function check_edges(vehicle) {
  if(vehicle.location.x < 0) vehicle.location.x = width - 1
  else if(vehicle.location.x > width - 1) vehicle.location.x = 0
  else if(vehicle.location.y < 0) vehicle.location.y = height - 1
  else if(vehicle.location.y > height - 1) vehicle.location.y = 0

}


// creates vehicle on mouse pressed
function mousePressed() {
  if(mouseX < 0 || mouseY < 0 || mouseX > width - 1 || mouseY > height - 1) return

  vehicles.push(new Vehicle(mouseX, mouseY))
}


// creates vehicle on mouse dragged
function mouseDragged() {
  if(mouseX < 0 || mouseY < 0 || mouseX > width - 1 || mouseY > height - 1) return

  vehicles.push(new Vehicle(mouseX, mouseY))
}