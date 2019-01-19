const matrix = document.getElementById('clickArea');
const outputX = document.getElementById('outputX');
const outputY = document.getElementById('outputY');
const matrixOffset = matrix.getClientRects()[0];
const scaleXMax = matrixOffset.width;
const scaleYMax = matrixOffset.height;

matrix.addEventListener('click', (event) => {
  outputX.innerHTML = percentalize(event.clientX - matrixOffset.left, scaleXMax);
  outputY.innerHTML = percentalize(event.clientY - matrixOffset.top, scaleYMax);
});

function percentalize (value, max) {
  return value * 100 / max;
}


