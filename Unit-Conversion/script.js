//  Active mode trackers 
let tMode = 'cf';
let wMode = 'kglb';
let dMode = 'kmmi';

//  Conversion configs 

const tempModes = {
  cf: {
    from: 'Celsius (°C)',
    to:   'Fahrenheit (°F)',
    formula: '°F = (°C × 9/5) + 32',
    convert: v => (v * 9 / 5) + 32,
    result:  (i, o) => `${i}°C = ${o}°F`
  },
  fc: {
    from: 'Fahrenheit (°F)',
    to:   'Celsius (°C)',
    formula: '°C = (°F − 32) × 5/9',
    convert: v => (v - 32) * 5 / 9,
    result:  (i, o) => `${i}°F = ${o}°C`
  },
  ck: {
    from: 'Celsius (°C)',
    to:   'Kelvin (K)',
    formula: 'K = °C + 273.15',
    convert: v => v + 273.15,
    result:  (i, o) => `${i}°C = ${o} K`
  },
  kc: {
    from: 'Kelvin (K)',
    to:   'Celsius (°C)',
    formula: '°C = K − 273.15',
    convert: v => v - 273.15,
    result:  (i, o) => `${i} K = ${o}°C`
  }
};

const weightModes = {
  kglb: {
    from: 'Kilograms (kg)',
    to:   'Pounds (lb)',
    formula: 'lb = kg × 2.20462',
    convert: v => v * 2.20462,
    result:  (i, o) => `${i} kg = ${o} lb`
  },
  lbkg: {
    from: 'Pounds (lb)',
    to:   'Kilograms (kg)',
    formula: 'kg = lb ÷ 2.20462',
    convert: v => v / 2.20462,
    result:  (i, o) => `${i} lb = ${o} kg`
  },
  goz: {
    from: 'Grams (g)',
    to:   'Ounces (oz)',
    formula: 'oz = g ÷ 28.3495',
    convert: v => v / 28.3495,
    result:  (i, o) => `${i} g = ${o} oz`
  },
  ozg: {
    from: 'Ounces (oz)',
    to:   'Grams (g)',
    formula: 'g = oz × 28.3495',
    convert: v => v * 28.3495,
    result:  (i, o) => `${i} oz = ${o} g`
  }
};

const distModes = {
  kmmi: {
    from: 'Kilometers (km)',
    to:   'Miles (mi)',
    formula: 'mi = km ÷ 1.60934',
    convert: v => v / 1.60934,
    result:  (i, o) => `${i} km = ${o} mi`
  },
  mikm: {
    from: 'Miles (mi)',
    to:   'Kilometers (km)',
    formula: 'km = mi × 1.60934',
    convert: v => v * 1.60934,
    result:  (i, o) => `${i} mi = ${o} km`
  },
  mft: {
    from: 'Meters (m)',
    to:   'Feet (ft)',
    formula: 'ft = m × 3.28084',
    convert: v => v * 3.28084,
    result:  (i, o) => `${i} m = ${o} ft`
  },
  ftm: {
    from: 'Feet (ft)',
    to:   'Meters (m)',
    formula: 'm = ft ÷ 3.28084',
    convert: v => v / 3.28084,
    result:  (i, o) => `${i} ft = ${o} m`
  }
};

//  Helpers 

//Flash animation on the output field
function flashEl(el) {
  el.classList.remove('result-flash');
  void el.offsetWidth; // force reflow
  el.classList.add('result-flash');
}

// Round a number to at most `places` significant decimal digits, removing trailing zeros.
 
function round(value) {
  return Number(value.toPrecision(8));
}

// Apply mode change 
function setActiveModeBtn(ids, activeId) {
  ids.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.toggle('active', id === activeId);
  });
}

//  Tab switching 

function switchTab(type) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelector(`.tab[data-type="${type}"]`)?.classList.add('active');

  document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
  document.querySelector(`.panel[data-type="${type}"]`)?.classList.add('active');
}

document.querySelectorAll('input[type="number"]')
.forEach(input => {

    input.addEventListener('keydown', e => {

        if (e.key === 'Enter') {
            e.target.blur();
        }

    });

});

//  Temperature 

function setTempMode(mode) {
  tMode = mode;
  const cfg = tempModes[mode];
  document.getElementById('tlbl1').textContent    = cfg.from;
  document.getElementById('tlbl2').textContent    = cfg.to;
  document.getElementById('t-formula').textContent = cfg.formula;
  document.getElementById('t-plain').textContent  = 'Enter a value above to see the result.';
  document.getElementById('t-from').value         = '';
  document.getElementById('t-to').value           = '';

  setActiveModeBtn(['btn-cf', 'btn-fc', 'btn-ck', 'btn-kc'], 'btn-' + mode);
}

function convertTemp() {
  const input  = document.getElementById('t-from');
  const output = document.getElementById('t-to');
  const plain  = document.getElementById('t-plain');
  const v      = parseFloat(input.value);

  if (isNaN(v)) {
    output.value  = '';
    plain.textContent = 'Enter a value above to see the result.';
    return;
  }

  const r = round(tempModes[tMode].convert(v));
  output.value      = r;
  plain.textContent = tempModes[tMode].result(v, r);
  flashEl(output);
}

function swapTemp() {
    const result = document.getElementById('t-to').value;
    if (!result) return;
  const swapMap = { cf: 'fc', fc: 'cf', ck: 'kc', kc: 'ck' };
  const prevResult = document.getElementById('t-to').value;
  setTempMode(swapMap[tMode]);
  document.getElementById('t-from').value = prevResult;
  convertTemp();
}

//  Weight 

function setWeightMode(mode) {
  wMode = mode;
  const cfg = weightModes[mode];
  document.getElementById('wlbl1').textContent    = cfg.from;
  document.getElementById('wlbl2').textContent    = cfg.to;
  document.getElementById('w-formula').textContent = cfg.formula;
  document.getElementById('w-plain').textContent  = 'Enter a value above to see the result.';
  document.getElementById('w-from').value         = '';
  document.getElementById('w-to').value           = '';

  setActiveModeBtn(['btn-kglb', 'btn-lbkg', 'btn-goz', 'btn-ozg'], 'btn-' + mode);
}

function convertWeight() {
  const input  = document.getElementById('w-from');
  const output = document.getElementById('w-to');
  const plain  = document.getElementById('w-plain');
  const v      = parseFloat(input.value);

  if (isNaN(v)) {
    output.value  = '';
    plain.textContent = 'Enter a value above to see the result.';
    return;
  }

  const r = round(weightModes[wMode].convert(v));
  output.value      = r;
  plain.textContent = weightModes[wMode].result(v, r);
  flashEl(output);
}

function swapWeight() {
    const result =
        document.getElementById('w-to').value;
    if (!result) return;
  const swapMap = { kglb: 'lbkg', lbkg: 'kglb', goz: 'ozg', ozg: 'goz' };
  const prevResult = document.getElementById('w-to').value;
  setWeightMode(swapMap[wMode]);
  document.getElementById('w-from').value = prevResult;
  convertWeight();
}

//  Distance 

function setDistMode(mode) {
  dMode = mode;
  const cfg = distModes[mode];
  document.getElementById('dlbl1').textContent    = cfg.from;
  document.getElementById('dlbl2').textContent    = cfg.to;
  document.getElementById('d-formula').textContent = cfg.formula;
  document.getElementById('d-plain').textContent  = 'Enter a value above to see the result.';
  document.getElementById('d-from').value         = '';
  document.getElementById('d-to').value           = '';

  setActiveModeBtn(['btn-kmmi', 'btn-mikm', 'btn-mft', 'btn-ftm'], 'btn-' + mode);
}

function convertDist() {
  const input  = document.getElementById('d-from');
  const output = document.getElementById('d-to');
  const plain  = document.getElementById('d-plain');
  const v      = parseFloat(input.value);

  if (isNaN(v)) {
    output.value  = '';
    plain.textContent = 'Enter a value above to see the result.';
    return;
  }

  const r = round(distModes[dMode].convert(v));
  output.value      = r;
  plain.textContent = distModes[dMode].result(v, r);
  flashEl(output);
}

function swapDist() {
    const result =
        document.getElementById('d-to').value;
    if (!result) return;
  const swapMap = { kmmi: 'mikm', mikm: 'kmmi', mft: 'ftm', ftm: 'mft' };
  const prevResult = document.getElementById('d-to').value;
  setDistMode(swapMap[dMode]);
  document.getElementById('d-from').value = prevResult;
  convertDist();
}

setTempMode('cf');
setWeightMode('kglb');
setDistMode('kmmi');