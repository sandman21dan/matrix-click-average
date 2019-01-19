const matrix = document.getElementById('clickArea');
const outputX = document.getElementById('outputX');
const outputY = document.getElementById('outputY');
const matrixOffset = matrix.getClientRects()[0];
const scaleXMax = matrixOffset.width;
const scaleYMax = matrixOffset.height;

matrix.addEventListener('click', (event) => {
  const percX = percentalize(event.clientX - matrixOffset.left, scaleXMax);
  const percY = percentalize(event.clientY - matrixOffset.top, scaleYMax);

  outputX.innerHTML = percX;
  outputY.innerHTML = percY;

  const clickPointEl = document.querySelector('.click-point').cloneNode(true);
  clickPointEl.style.position = 'absolute';
  clickPointEl.style.left = `${percX}%`;
  clickPointEl.style.top = `${percY}%`;
  matrix.appendChild(clickPointEl);
});

function percentalize (value, max) {
  return value * 100 / max;
}
