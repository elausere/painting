
const container = document.querySelector("section");
let params = { width: 500, height: 500 };

const two = new Two(params);
two.appendTo(container);

const shapes = [];

// configure for animation
const loopDuration = 480;
const aDelay = 0.0025;

const numberOfShapes = 25;

for (let i = 0; i < numberOfShapes; i++) {
  const size = 20;

  const sx = size / 2 + i * size;
  const sy = 250;
  const sr = 0;

  const ex = randomNumber(50, 450);
  const ey = randomNumber(50, 450);
  const er = randomNumber(-1 * fullRotation * 2, fullRotation * 2);

  const shape = two.makeCircle(sx, sy, size, size);
  shape.fill = "#ffffff";
  shape.rotation = sr;
  shape.noStroke();

  shape.data = {
    sx: sx,
    sy: sy,
    sr: sr,
    ex: ex,
    ey: ey,
    er: er
  };

  shapes.push(shape);
}

two.bind("update", function (frameCount) {
  const currentFrame = frameCount % loopDuration;
  const t = currentFrame / loopDuration;

  const aDelay = 0.0025;

  shapes.forEach((shape, i) => {
    const aStart = (numberOfShapes - i) * aDelay;
    const aEnd = i * aDelay;

    if (t <= 0.5) {
      u = mapAndClamp(t, 0 + aStart, 0.5 - aEnd, 0, 1);
    } else {
      u = mapAndClamp(t, 0.5 + aStart, 1 - aEnd, 1, 0);
    }

    let cu = easeInOutCubic(u);

    const x = mapAndClamp(cu, 0, 1, shape.data.sx, shape.data.ex);
    const y = mapAndClamp(cu, 0, 1, shape.data.sy, shape.data.ey);
    const r = mapAndClamp(cu, 0, 1, shape.data.sr, shape.data.er);

    shape.translation.x = x;
    shape.translation.y = y;
    shape.rotation = r;
  });
});

let currentColor = 0;
let backgroundColors = ["#ffffff", "#ffffff", "#ffffff", "#ffffff"];
let shapeColors = ["#ffffff", "#ffffff", "#ffffff", "#ffffff"];

document.addEventListener("click", function () {
  currentColor = currentColor + 1;
  currentColor = currentColor % shapeColors.length;

  shapes.forEach((shape) => {
    shape.fill = shapeColors[currentColor];
  });

  const bodyTag = document.querySelector("body");
  bodyTag.style.backgroundColor = backgroundColors[currentColor];
});
 
// // Get Background Color
const randomColor = "#"+((1<<24)*Math.random()|0).toString(16); 

document.documentElement.style.setProperty('--main-bg-color', randomColor);

two.play();
