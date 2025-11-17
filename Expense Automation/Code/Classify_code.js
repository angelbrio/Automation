// 0. Texto completo del correo (usamos snippet de Gmail)
const text = $json.snippet || "";

// 1. Sacar nombre del establecimiento del texto
let establecimiento = "";
let match = text.match(/por parte de (.+?) con la tarjeta/i);
if (!match) match = text.match(/en (.+?)\./i);
if (match) establecimiento = match[1].toUpperCase().trim();

// 2. Obtener fecha del email
let fechaRaw = $json.internalDate;
let fecha = fechaRaw ? new Date(parseInt(fechaRaw, 10)) : new Date();

// 3. Día y hora
const diaSemana = fecha.getDay();         // 0=Domingo ... 5=Viernes
const hora = fecha.getHours();
const esViernes = diaSemana === 5;

// ---------------------------------------------
// LISTAS DE PALABRAS CLAVE
// ---------------------------------------------

const est = establecimiento.toUpperCase();

const contiene = (arr) => arr.some(p => est.includes(p));

// OCIO — bares, ocio nocturno
const palabrasOcio = [" BAR ", "BAR-", "PUB", "DISCO", "CLUB", "COPAS"];

// COMIDA — restaurantes y fast food
const palabrasComida = [
  "RESTAURANTE", "CAFETERIA", "CAFETERÍA", "BURGER",
  "PIZZA", "MCDONALD", "KFC", "TACO BELL"
];

// DEPORTE — gimnasios, ropa deportiva
const palabrasDeporte = [
  "GYM", "GIMNASIO", "FITNESS", "CROSSFIT", "BASIC-FIT",
  "MCFIT", "DECATHLON", "NIKE", "ADIDAS", "INTERSPORT", "SPORT"
];

// ---------------------------------------------
// 4. REGLAS DE CLASIFICACIÓN
// ---------------------------------------------
let categoria = null;

// PRIORIDAD 0: APPLE → MENSUAL
if (est.includes("APPLE")) {
  categoria = "MENSUAL";

// PRIORIDAD 1: Viernes después de las 21 → OCIO
} else if (esViernes && hora >= 21) {
  categoria = "OCIO";

// PRIORIDAD 2: CUALQUIER DÍA → 23:00 a 06:00 → OCIO
} else if (hora >= 23 || hora < 6) {
  categoria = "OCIO";

// PRIORIDAD 3: ESTANCO → OCIO
} else if (est.includes("ESTANCO")) {
  categoria = "OCIO";

// PRIORIDAD 4: BOLT / TAXI → OCIO
} else if (est.includes("BOLT") || est.includes("TAXI")) {
  categoria = "OCIO";

// PRIORIDAD 5: MERCADONA viernes >= 14 → OCIO
} else if (est.includes("MERCADONA") && esViernes && hora >= 14) {
  categoria = "OCIO";

// PRIORIDAD 6: OCIO por palabras de bares
} else if (contiene(palabrasOcio)) {
  categoria = "OCIO";

// PRIORIDAD 7: COMIDA por palabras clave
} else if (contiene(palabrasComida)) {
  categoria = "COMIDA";

// PRIORIDAD 8: DEPORTE por palabras clave
} else if (contiene(palabrasDeporte)) {
  categoria = "DEPORTE";

// PRIORIDAD 9: METRO DE MADRID → MENSUAL
} else if (est.includes("METRO DE MADRID")) {
  categoria = "MENSUAL";

// PRIORIDAD 10: SPOTIFY → MENSUAL
} else if (est.includes("SPOTIFY")) {
  categoria = "MENSUAL";

// PRIORIDAD 11: OPENAI / CHATGPT → MENSUAL
} else if (est.includes("OPENAI") || est.includes("CHATGPT")) {
  categoria = "MENSUAL";

// DEFAULT → NO CLASIFICADO → se manda a GPT
} else {
  categoria = "NO_CLASIFICADO";
}

// ---------------------------------------------
// 5. IMPORTE (11.99 EUR, 23 EUR, etc.)
// ---------------------------------------------
let importe = 0;
const matchDecimal = text.match(/(\d+[.,]\d{2})\s*EUR/i);
const matchEntero  = text.match(/(\d+)\s*EUR/i);

if (matchDecimal) importe = parseFloat(matchDecimal[1].replace(",", "."));
else if (matchEntero) importe = parseFloat(matchEntero[1]);

// ---------------------------------------------
// 6. Fecha formateada para Google Sheets
// ---------------------------------------------
const fechaISO = fecha.toISOString().split("T")[0];

// ---------------------------------------------
// 7. OUTPUT
// ---------------------------------------------
return [{
  ...$json,
  establecimiento,
  establecimiento_normalizado: establecimiento,
  categoria,
  hora,
  esViernes,
  fechaISO,
  importe
}];
