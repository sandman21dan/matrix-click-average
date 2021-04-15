import { MatrixPoint } from './types';

const matrix = document.getElementById('clickArea');
const outputX = document.getElementById('outputX');
const outputY = document.getElementById('outputY');
const matrixOffset = matrix.getClientRects()[0];
const scaleXMax = matrixOffset.width;
const scaleYMax = matrixOffset.height;


const readings: MatrixPoint[] = [];

matrix?.addEventListener('click', (event) => {
  const percX = percentalize(event.clientX - matrixOffset.left, scaleXMax);
  const percY = percentalize(event.clientY - matrixOffset.top, scaleYMax);

  readings.push([percX, percY]);
  renderClick(percX, percY, matrix, 'click-point--fade-out click-point--big click-point--green');
});

function renderClick(x: number, y: number, context: HTMLElement, className: string = '') {
  const clickDot = document.createElement('div');
  clickDot.className = className ? `click-point ${className}` : 'click-point';
  clickDot.style.position = 'absolute';
  clickDot.style.left = `${x}%`;
  clickDot.style.top = `${y}%`;
  context.appendChild(clickDot);
}

function percentalize(value: number, max: number) {
  return value * 100 / max;
}

// Calculates two dimentional array mean for each row
function renderMean(values: MatrixPoint[]) {
  let meanX = 0;
  let meanY = 0;

  values.forEach(reading => {
    meanX += reading[0];
    meanY += reading[1];
  });

  meanX = meanX / values.length;
  meanY = meanY / values.length;

  renderClick(meanX, meanY, matrix, 'click-point--big');
}

function renderMedian(values: MatrixPoint[]) {
  const xReadings = values.map(reading => {
    return reading[0];
  });
  const yReadings = values.map(reading => {
    return reading[1];
  });

  xReadings.sort(sortNumAsc);
  yReadings.sort(sortNumAsc);

  // find middle value
  if (values.length % 2 === 0) {
    const medianX = (xReadings[values.length /2] + xReadings[(values.length /2) - 1]) / 2;
    const medianY = (yReadings[values.length /2] + yReadings[(values.length /2) - 1]) / 2;

    renderClick(medianX, medianY, matrix, 'click-point--big click-point--blue');
  } else {
    const medianX = xReadings[Math.floor(values.length / 2)];
    const medianY = yReadings[Math.floor(values.length / 2)];

    renderClick(medianX, medianY, matrix, 'click-point--big click-point--blue');
  }

  function sortNumAsc(a: number, b: number) {
    return a - b;
  }
}

function clearBoxDots () {
  document.querySelectorAll('.box .click-point').forEach(dot => {
    dot?.parentElement?.removeChild(dot);
  });
}

function renderAll(values: MatrixPoint[]) {
  clearBoxDots();

  renderMean(values);
  renderMedian(values);

  readings.forEach( reading => {
    renderClick(reading[0], reading[1], matrix);
  });
}

function reset () {
  clearBoxDots();
  readings.length = 0;
}

global.readings = readings;
global.renderAll = renderAll;
global.reset = reset;
