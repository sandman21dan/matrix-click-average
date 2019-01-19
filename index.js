const matrix = document.getElementById('clickArea');
const outputX = document.getElementById('outputX');
const outputY = document.getElementById('outputY');
const matrixOffset = matrix.getClientRects()[0];
const scaleXMax = matrixOffset.width;
const scaleYMax = matrixOffset.height;
const readings = [];

matrix.addEventListener('click', (event) => {
  const percX = percentalize(event.clientX - matrixOffset.left, scaleXMax);
  const percY = percentalize(event.clientY - matrixOffset.top, scaleYMax);

  readings.push([percX, percY]);
  renderClick(percX, percY, matrix);
});

function renderClick (x, y, context, className) {
  const clickDot = document.createElement('div');
  clickDot.className = `click-point ${className}`;
  clickDot.style.position = 'absolute';
  clickDot.style.left = `${x}%`;
  clickDot.style.top = `${y}%`;
  context.appendChild(clickDot);
}

function percentalize (value, max) {
  return value * 100 / max;
}

// Calculates two dimentional array mean for each row
function renderMean (values) {
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

function renderMedian (values) {
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
    console.log(xReadings[values.length /2], xReadings[(values.length /2) - 1]);
    const medianX = (xReadings[values.length /2] + xReadings[(values.length /2) - 1]) / 2;
    const medianY = (yReadings[values.length /2] + yReadings[(values.length /2) - 1]) / 2;

    renderClick(medianX, medianY, matrix, 'click-point--big click-point--blue');
  } else {
    const medianX = xReadings[Math.floor(values.length / 2)];
    const medianY = yReadings[Math.floor(values.length / 2)];

    renderClick(medianX, medianY, matrix, 'click-point--big click-point--blue');
  }

  function sortNumAsc(a, b) {
    return a - b;
  }
}
