// Web Worker para procesar datos en segundo plano sin bloquear la UI

function normalizarTexto(t) {
  if (!t) return "";
  let s = String(t)
    .toLowerCase()
    .trim()
    .replace(/ñ/g, "n")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[*°º]/g, "")
    .replace(/\s+/g, " ");
  if (s.includes("lake forest")) {
    s = s.replace("lake forest", "lake forrest");
  }
  return s;
}

function sumarDias(fechaStr, dias) {
  if (!fechaStr) return ""
  let p = String(fechaStr).split('-')
  if (p.length !== 3) return ""
  let f = new Date(parseInt(p[0]), parseInt(p[1]) - 1, parseInt(p[2]), 12, 0, 0)
  if (isNaN(f)) return ""
  dias = parseFloat(dias) || 0
  f.setDate(f.getDate() + dias)
  return f.getFullYear() + '-' + String(f.getMonth() + 1).padStart(2, '0') + '-' + String(f.getDate()).padStart(2, '0')
}

function formatearFecha(valor) {
  if (!valor) return ""
  if (typeof valor === "number") {
    let f = { y: 1900 + Math.floor(valor / 365.25), m: 1 + Math.floor((valor % 365.25) / 30.44), d: Math.floor((valor % 365.25) % 30.44) };
    return `${f.y}-${String(f.m).padStart(2, '0')}-${String(f.d).padStart(2, '0')}`;
  }
  let p = String(valor).split('-')
  if (p.length === 3 && !isNaN(parseInt(p[0]))) {
    let d = new Date(parseInt(p[0]), parseInt(p[1]) - 1, parseInt(p[2]), 12, 0, 0)
    if (!isNaN(d)) return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
  }
  let d = new Date(valor);
  if (isNaN(d)) return String(valor);
  return d.toISOString().split("T")[0]
}

function procesarDatos(siembrasData, PARAMETROS_DATA, APROVECHAMIENTOS_DATA) {
  // Crear mapas para búsqueda rápida
  let mapaAprov = {}
  APROVECHAMIENTOS_DATA.forEach(r => {
    let key = normalizarTexto(r.nom_flor) + "|" + normalizarTexto(r.producto);
    mapaAprov[key] = { aprovechamiento: r.aprovechamiento || 0, flor_color: r.flor_color || "" }
  })

  let mapaParam = {}
  PARAMETROS_DATA.forEach(r => {
    let key = normalizarTexto(r.nom_flor) + "|" + normalizarTexto(r.producto);
    if (!mapaParam[key]) mapaParam[key] = { cv: r.cv || 0, cp: r.cp || 0, ct: r.ct || 0, curva: r.curva || [] }
  })

  // Procesar datos
  let resultadoFinal = siembrasData.map(r => {
    let key = normalizarTexto(r.nom_flor) + "|" + normalizarTexto(r.producto)
    let ap = mapaAprov[key] || { aprovechamiento: 0, flor_color: "" }
    let param = mapaParam[key] || { cv: 0, cp: 0, ct: 0, curva: [] }
    let plantas = parseFloat((r.plantas || "0").toString().replace(/,/g, "")) || 0
    let aprove = ap.aprovechamiento || 0
    let fechaBase = formatearFecha(r.fecha)
    let cv = parseFloat(param.cv) || 0, cp = parseFloat(param.cp) || 0, ct = cv + cp
    let p_real = 100
    return {
      ...r, cv, cp, ct,
      fecha_ini_corte: sumarDias(fechaBase, cv),
      fecha_fin_corte: sumarDias(fechaBase, ct - 1),
      flor_color: ap.flor_color,
      fecha: fechaBase,
      aprovechamiento: aprove,
      plantas,
      per4_real: p_real,
      per4_real_modificado: false,
      curva: param.curva,
      per4: (p_real / 100) * plantas * aprove,
      observaciones: r.observaciones || "",
      pronostico_MJ: plantas * aprove,
      orig_cv: cv,
      orig_aprov: aprove,
      adj_cv: cv,
      adj_aprov: aprove
    }
  })

  // Calcular total_variedad optimizado O(n)
  let totalPorVariedad = {}
  resultadoFinal.forEach(r => {
    let key = normalizarTexto(r.nom_flor)
    if (!totalPorVariedad[key]) totalPorVariedad[key] = 0
    totalPorVariedad[key] += (r.per4 || 0)
  })
  resultadoFinal.forEach(r => {
    r.total_variedad = totalPorVariedad[normalizarTexto(r.nom_flor)] || 0
  })

  return resultadoFinal
}

function detectarDuplicados(resultadoFinal) {
  let mapa = {}
  let grupos = []

  resultadoFinal.forEach((r, idx) => {
    let k = normalizarTexto(r.bloque || '') + '|' + normalizarTexto(r.nom_flor || '') + '|' + normalizarTexto(r.cm || '') + '|' + normalizarTexto(r.plantas || '')
    if (!mapa[k]) mapa[k] = []
    mapa[k].push(idx)
  })

  Object.entries(mapa).forEach(([k, indices]) => {
    if (indices.length > 1) {
      grupos.push({
        key: k,
        indices: indices,
        registros: indices.map(i => resultadoFinal[i])
      })
    }
  })

  return grupos
}

// Escuchar mensajes de la app principal
self.onmessage = function(event) {
  const { tipo, siembrasData, PARAMETROS_DATA, APROVECHAMIENTOS_DATA } = event.data

  try {
    if (tipo === 'procesar') {
      const resultadoFinal = procesarDatos(siembrasData, PARAMETROS_DATA, APROVECHAMIENTOS_DATA)
      const duplicados = detectarDuplicados(resultadoFinal)

      // Enviar resultados de vuelta
      self.postMessage({
        exitoso: true,
        resultadoFinal: resultadoFinal,
        duplicados: duplicados
      })
    }
  } catch (error) {
    self.postMessage({
      exitoso: false,
      error: error.message
    })
  }
}
