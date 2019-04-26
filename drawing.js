const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Enumerator for the pen's drawing state
const PEN_STATE = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
});

// We track the pen's drawing state so we know when to let the user draw
let penState = PEN_STATE.INACTIVE;

/**
 * Deactivates the drawing pen.
 * @param {any} event The pointer event.
 */
const handlePointerUp = (event) => {
  penState = PEN_STATE.INACTIVE;
  console.log(penState);
};

/**
 * Activates the drawing pen.
 * @param {any} event The pointer event.
 */
const handlePointerDown = (event) => {
  penState = PEN_STATE.ACTIVE;
  console.log(penState);
};

/**
 * Allows the user to draw when dragging on the canvas.
 * @param {any} event The pointer event.
 */
const handlePointerMove = (event) => {
  if (penState === PEN_STATE.ACTIVE) {
    console.log('drawing!');
  }
};

canvas.addEventListener('pointerup', handlePointerUp);
canvas.addEventListener('pointerdown', handlePointerDown);
canvas.addEventListener('pointermove', handlePointerMove);
