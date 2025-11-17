// Extrae el JSON desde la estructura del nodo "Message a model"
try {
  // 1. Navegamos hasta el texto con el JSON
  const text = $json.output[0].content[0].text;

  // 2. Intentamos parsearlo
  const parsed = JSON.parse(text);

  // 3. Devolvemos el objeto ya fusionado con el original
  return [{ ...$json, ...parsed }];
} catch (error) {
  // Si algo falla, devolvemos una salida de fallback
  return [{
    ...$json,
    categoria_secundaria: "NO_CLASIFICADO",
    parse_error: error.message
  }];
}
