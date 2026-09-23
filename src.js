const http = require('node:http');

function totalGastos(gastos) {
  if (!Array.isArray(gastos) || gastos.some(n => !Number.isFinite(n) || n < 0)) {
    throw new TypeError('Los gastos deben ser números positivos');
  }
  return gastos.reduce((total, gasto) => total + gasto, 0);
}

function responder(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.url === '/salud') {
    res.end(JSON.stringify({ estado: 'ok' }));
  } else if (req.url === '/') {
    res.end(JSON.stringify({ proyecto: 'Control de gastos', total: totalGastos([120, 80, 50]) }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
}

if (require.main === module) {
  const puerto = Number(process.env.PORT) || 3000;
  http.createServer(responder).listen(puerto, '0.0.0.0', () => console.log(`Servidor en puerto ${puerto}`));
}
module.exports = { totalGastos, responder };
