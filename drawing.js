const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

// Enumerator for the pen's drawing state
const PEN_STATE = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
});

// We track the pen's drawing state so we know when to let the user draw
let penState = PEN_STATE.INACTIVE;

/**
 * Draws on the canvas.
 * @param {number} x The x coordinate on the canvas.
 * @param {number} y The y coordinate on the canvas.
 */
const draw = (x, y) => {
  const radius = 10;
  const startAngle = 0;
  const endAngle = 2 * Math.PI;
  context.fillStyle = 'black';
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
