const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

// Enumerator for the pen's drawing state
const PEN_STATE = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
});

// Larger values will change the fill colour at a slower rate
const COLOUR_RATE = 1000;

// Larger values will change the brush size at a slower rate
const SIZE_RATE = 500;

// We track the pen's drawing state so we know when to let the user draw
let penState = PEN_STATE.INACTIVE;

// Keep a global timestamp to track of draw start time
let drawStartTime;

/**
 * Returns a number radius for the drawing brush size based on a periodic cycle of time.
 */
const getBrushSizeFromTime = () => {
  if (!drawStartTime) {
    return 10;
  }
  const t = Date.now() - drawStartTime;
  const radius = 10 + 5 * Math.sin(t / SIZE_RATE);
  return radius;
};

/**
 * Returns an HTML colour string based on a periodic cycle of time.
 */
const getFillStyleFromTime = () => {
  if (!drawStartTime) {
    return 'hsl(0deg, 50%, 50%)';
  }
  const t = Date.now() - drawStartTime;
  const colourAngle = 360 * Math.sin(t / COLOUR_RATE);
  return `hsl(${colourAngle}deg, 50%, 50%)`;
};

/**
 * Draws on the canvas.
 * @param {number} x The x coordinate on the canvas.
 * @param {number} y The y coordinate on the canvas.
 */
const draw = (x, y) => {
  const radius = getBrushSizeFromTime();
  const startAngle = 0;
  const endAngle = 2 * Math.PI;
  context.fillStyle = getFillStyleFromTime();
  context.beginPath();
  context.arc(x, y, radius, startAngle, endAngle, true);
  context.fill();
};

/**
 * Deactivates the drawing pen.
 * @param {any} event The pointer event.
 */
const handlePointerUp = (event) => {
  penState = PEN_STATE.INACTIVE;
};

/**
 * Activates the drawing pen.
 * @param {any} event The pointer event.
 */
const handlePointerDown = (event) => {
  penState = PEN_STATE.ACTIVE;
  drawStartTime = Date.now();
  draw(event.clientX, event.clientY);
};

/**
 * Allows the user to draw when dragging on the canvas.
 * @param {any} event The pointer event.
 */
const handlePointerMove = (event) => {
  if (penState === PEN_STATE.ACTIVE) {
    draw(event.clientX, event.clientY);
  }
};

canvas.addEventListener('pointerup', handlePointerUp);
canvas.addEventListener('pointerdown', handlePointerDown);
canvas.addEventListener('pointermove', handlePointerMove);
canvas.addEventListener('pointerleave', handlePointerUp);
