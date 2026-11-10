function setup() {
  createCanvas(600, 400);
  background(20, 20, 30);
}

function draw() {
  // trail effect - slightly transparent background
  fill(40, 40, 60, 40);
  rect(0, 0, width, height);
  
  // circle follows your mouse
  fill(mouseX, 250, 255 - mouseY);
  noStroke();
  circle(mouseX, mouseY, 60);
  
  // little sparkles
  fill(255, 255, 100);
  circle(mouseX + random(-30, 30), mouseY + random(-30, 30), 5);
}
