let balls = [];

function setup() {
  createCanvas(600, 400);
  balls.push({
    x: width / 2, y: height / 2,
    vx: random(-3, 3), vy: random(-3, 3),
    size: 40,
    r: random(100, 255), g: random(100, 255), b: random(100, 255)
  });
  background(20, 20, 30);
}

function draw() {
  background(20, 20, 30, 25);

  // Move + wall split
  for (let i = balls.length - 1; i >= 0; i--) {
    let b = balls[i];
    b.x += b.vx;
    b.y += b.vy;

    let hitWall = false;
    if (b.x < 0 || b.x > width) { b.vx *= -1; hitWall = true; }
    if (b.y < 0 || b.y > height) { b.vy *= -1; hitWall = true; }

    if (hitWall && balls.length < 80 && b.size > 8) {
      balls.splice(i, 1);
      for (let j = 0; j < 2; j++) {
        balls.push({
          x: b.x, y: b.y,
          vx: b.vx + random(-2, 2),
          vy: b.vy + random(-2, 2),
          size: b.size * 0.7,
          r: random(100, 255), g: random(100, 255), b: random(100, 255)
        });
      }
    } else {
      fill(b.r, b.g, b.b);
      noStroke();
      circle(b.x, b.y, b.size);
    }
  }
