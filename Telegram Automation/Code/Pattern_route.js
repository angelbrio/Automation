const original = $json["text"] || "";
const text = original;
const parts = text.split(";").map(p => p.trim());
const now = new Date().toISOString();

// Fallback: guardar el texto si el formato no es válido
if (parts.length !== 3) {
  return [{
    json: {
      PERSONA: "PENDIENTE_REVISAR",
      INFO: original,
      TOTAL: 0,
      FECHA_Y_HORA: now,
    }
  }];
}

const [namesPart, concept, amountStr] = parts;
const names = namesPart
  .split(",")
  .map(n => n.trim())
  .filter(n => n.length > 0);

if (names.length === 0) {
  return [{
    json: {
      PERSONA: "PENDIENTE_REVISAR",
      INFO: original,
      TOTAL: 0,
      FECHA_Y_HORA: now,
    }
  }];
}

const total = parseFloat(amountStr.replace(",", "."));
if (isNaN(total)) {
  return [{
    json: {
      PERSONA: "PENDIENTE_REVISAR",
      INFO: original,
      TOTAL: 0,
      FECHA_Y_HORA: now,
    }
  }];
}

const share = Math.round((total / names.length) * 100) / 100;

return names.map(name => ({
  json: {
    PERSONA: name,
    INFO: concept,
    TOTAL: share,
    FECHA_Y_HORA: now
  }
}));
