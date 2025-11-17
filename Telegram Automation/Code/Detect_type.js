const originalText = $json["message"]["text"] || "";
const text = originalText.toLowerCase();

// 1️⃣ Formato con ';' → ruta PATTERN
if (text.includes(";")) {
  return [{
    json: {
      route: "pattern",
      text: originalText,
    }
  }];
}

// 2️⃣ Contiene número → ruta SIMPLE/FLEXIBLE
else if (/[0-9]/.test(text)) {
  return [{
    json: {
      route: "simple",
      text: originalText,
    }
  }];
}

// 3️⃣ Todo lo demás → ruta IA
else {
  return [{
    json: {
      route: "ai",
      text: originalText,
    }
  }];
}
