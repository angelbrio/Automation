const textOriginal = $json["text"] || "";
const text = textOriginal.toLowerCase().replace(",", ".").trim();
const now = new Date().toISOString();

// 1️⃣ Buscar el importe (euros, euro, eur, €)
const amountMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:€|euros?|eur)?/i);
if (!amountMatch) {
  return [{
    json: {
      PERSONA: "PENDIENTE_REVISAR",
      INFO: textOriginal,
      "FECHA Y HORA": now,
      TOTAL: 0,
    }
  }];
}

const total = parseFloat(amountMatch[1]);
const textWithoutAmount = text.replace(amountMatch[0], "").trim();

// 2️⃣ Lista base de nombres comunes (añade los que quieras)
const nombresComunes = [
  "juan","pedro","luis","manuel","alvaro","carlos","sara",
  "ana","lucia","marta","pablo","javier","alberto","mario","andres","paco"
];

// 3️⃣ Detectar nombres mencionados
let personas = [];
for (const nombre of nombresComunes) {
  const regexNombre = new RegExp(`\\b${nombre}\\b`, "i");
  if (regexNombre.test(textWithoutAmount)) {
    personas.push(nombre.charAt(0).toUpperCase() + nombre.slice(1));
  }
}

// 4️⃣ Si no hay nombres claros, intentar uno suelto
if (personas.length === 0) {
  const words = textWithoutAmount.split(/\s+/).filter(w => w.length > 0);
  const candidato = words[0] || words[words.length - 1];

  if (candidato && /^[a-záéíóúñ]+$/.test(candidato)) {
    personas.push(candidato.charAt(0).toUpperCase() + candidato.slice(1));
  }
}

// Si aún así no hay personas → fila pendiente
if (personas.length === 0) {
  return [{
    json: {
      PERSONA: "PENDIENTE_REVISAR",
      INFO: textOriginal,
      "FECHA Y HORA": now,
      TOTAL: 0,
    }
  }];
}

// 5️⃣ Detectar la info (concepto)
let info = textWithoutAmount;

// quitamos los nombres
for (const p of personas) {
  const regex = new RegExp(`\\b${p.toLowerCase()}\\b`, "gi");
  info = info.replace(regex, "");
}

// quitamos conectores típicos
info = info.replace(/\b(y|entre|de|una|un|la|el|por|para|del|los|las)\b/gi, "");

// quitamos verbos/frases tipo "me debe", "le debo", "he pagado"
info = info.replace(/\b(me|te|le|nos|os)\b/gi, "");
info = info.replace(/\b(debe|deben|debo|debes|debía|debia|pagado|pagué|pague|pagando|pago)\b/gi, "");

// compactamos espacios y recortamos
info = info.replace(/\s+/g, " ").trim();
if (!info) info = "sin especificar";

// 6️⃣ Repartir el importe
let share = total;
if (personas.length > 1) {
  share = Math.round((total / personas.length) * 100) / 100;
}

// 7️⃣ Crear una fila por persona
const items = personas.map(persona => ({
  json: {
    PERSONA: persona,
    INFO: info,
    "FECHA Y HORA": now,
    TOTAL: share,
  }
}));

return items;
