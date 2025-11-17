// 1️⃣ Sacar el texto devuelto por el nodo "Message a model"
// Intentamos varias rutas según el formato nuevo de OpenAI

let raw =
  $json.text ||
  ($json.output && $json.output[0] && $json.output[0].content &&
   $json.output[0].content[0] && $json.output[0].content[0].text) ||
  "";

// Guardamos también este texto por si necesitamos fallback
const rawForInfo = raw || "Respuesta vacía de la IA";

let jsonString = (raw || "").trim();

// 2️⃣ Limpiar posibles ```json ... ``` de la respuesta
if (jsonString.startsWith("```")) {
  jsonString = jsonString
    .replace(/^```[a-zA-Z]*\n?/, "") // quitar ```json o ``` + salto
    .replace(/```$/, "")             // quitar ``` final
    .trim();
}

// 3️⃣ Intentar parsear el JSON de la IA
let data = null;

try {
  data = JSON.parse(jsonString);
} catch (e) {
  // Si falla el parseo, dejamos data = null y caeremos al fallback
}

// 4️⃣ Preparar timestamp
const now = new Date().toISOString();

// 5️⃣ Si no hay data o no hay deudas → FALLO CONTROLADO
if (!data || !Array.isArray(data.deudas) || data.deudas.length === 0) {
  return [{
    json: {
      PERSONA: "PENDIENTE_REVISAR",
      INFO: rawForInfo,
      "FECHA Y HORA": now,
      TOTAL: 0,
    }
  }];
}

// 6️⃣ Hay deudas → devolvemos UNA FILA POR CADA DEUDA
return data.deudas.map(d => ({
  json: {
    PERSONA: d.persona || "PENDIENTE_REVISAR",
    INFO: d.info || rawForInfo,
    "FECHA Y HORA": now,
    TOTAL: (typeof d.total === "number" ? d.total : 0),
  }
}));

