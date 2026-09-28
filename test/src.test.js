const test = require('node:test');
const assert = require('node:assert/strict');
const { totalGastos, responder } = require('../src');

test('suma tres gastos', () => assert.equal(totalGastos([120, 80, 50]), 250));
test('devuelve cero si no hay gastos', () => assert.equal(totalGastos([]), 0));
test('rechaza valores negativos', () => assert.throws(() => totalGastos([-1]), TypeError));
test('responde en la ruta de salud', () => {
  let salida = '';
  const res = { setHeader() {}, end(s) { salida = s; }, statusCode: 200 };
  responder({ url: '/salud' }, res);
  assert.deepEqual(JSON.parse(salida), { estado: 'ok' });
});
