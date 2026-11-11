let balls = [];

function setup() {
  document.body.style.margin = '0';
  document.body.style.overflow = 'hidden';
  createCanvas(windowWidth, windowHeight);
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

    if (hitWall && balls.length < 800 && b.size > 8) {
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

  // Ball-to-ball collision - swap speeds + change color
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      let b1 = balls[i];
      let b2 = balls[j];
      let d = dist(b1.x, b1.y, b2.x, b2.y);
      if (d < (b1.size + b2.size) / 2 && d > 0) {
        let tempVx = b1.vx, tempVy = b1.vy;
        b1.vx = b2.vx; b1.vy = b2.vy;
        b2.vx = tempVx; b2.vy = tempVy;
        b1.r = random(100, 255); b1.g = random(100, 255); b1.b = random(100, 255);
      }
    }
  }
}
function mousePressed() {
  // click to go fullscreen
  let fs = fullscreen();
  fullscreen(!fs);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
