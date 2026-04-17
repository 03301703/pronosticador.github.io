# 🌸 PER Campo - PWA para GitHub Pages

Carpeta lista para desplegar como Progressive Web App (PWA) en GitHub Pages.

## Contenido

```
pwa/
├── index.html          Aplicación web (copia de Pronosticador.html)
├── manifest.json       Metadatos PWA
├── sw.js              Service Worker (caché offline)
└── icons/
    ├── icon-192.png    Ícono 192x192 (app mobile)
    └── icon-512.png    Ícono 512x512 (pantalla de inicio)
```

## Características

✅ **Funciona 100% Offline** — Una vez cargada, la app funciona sin internet (cachea XLSX, localforage, fuentes)
✅ **Instalable en móvil** — Botón "Añadir a pantalla de inicio" aparece automáticamente
✅ **Datos sincronizados** — Todo se guarda en IndexedDB (localforage) localmente
✅ **Sin backend** — Toda la lógica en el navegador

---

## 🚀 Instalación en GitHub Pages (5 min)

### 1. Crear un repo GitHub

```bash
# Opción A: Crear nuevo repo desde web (GitHub.com)
# Nombre sugerido: "flores-el-trigal-per" o "per-campo"

# Opción B: Desde línea de comandos
git init per-campo
cd per-campo
git remote add origin https://github.com/tu-usuario/per-campo.git
```

### 2. Copiar archivos PWA

```bash
# Copiar TODO el contenido de esta carpeta 'pwa/' a la raíz del repo
# (o en rama gh-pages)
cp -r pwa/* .
```

Estructura final en el repo:
```
tu-repo/
├── index.html
├── manifest.json
├── sw.js
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

### 3. Subir a GitHub

```bash
git add .
git commit -m "feat: PWA deployment"
git branch -M main
git push -u origin main
```

### 4. Activar GitHub Pages

1. Ir a **Settings → Pages**
2. Source: `Deploy from a branch`
3. Branch: `main`, Folder: `/ (root)`
4. Click "Save"

Esperando 1-2 minutos, tu app estará en:
```
https://tu-usuario.github.io/per-campo/
```

---

## 📱 Usar en Móvil

### Android (Chrome)
1. Abrir la URL en Chrome móvil
2. Menú ⋮ → **"Instalar app"** o **"Añadir a pantalla de inicio"**
3. ¡Listo! Abre desde la pantalla de inicio como app nativa

### iOS (Safari)
1. Abrir la URL en Safari móvil
2. Compartir → **"Añadir a pantalla de inicio"**
3. Nombre: "PER Campo"
4. ¡Listo!

---

## 🔍 Verificar PWA (Desarrollo Local)

### Opción 1: Con servidor local

```bash
# Si tienes 'http-server' instalado
npx http-server pwa/

# O con Python
python -m http.server 8000 --directory pwa/

# Luego abrir: http://localhost:8000
```

### Opción 2: En Chrome DevTools

1. Abrir la app en Chrome
2. F12 → **Application**
3. Verificar:
   - ✓ **Manifest** sin errores
   - ✓ **Service Workers** → activado
   - ✓ **Cache Storage** → recursos cacheados

### Opción 3: Lighthouse

1. F12 → **Lighthouse**
2. Click "Generate report"
3. PWA score debería ser **≥ 90**

---

## 🔄 Service Worker (Caché Offline)

El archivo `sw.js` implementa:

- **Precaché** al instalar: HTML + CDN (XLSX, localforage, Google Fonts)
- **Network-first para HTML**: intenta red, fallback a cache
- **Cache-first para CDN**: usa cache primero, red como respaldo
- **Auto-actualización**: detecta cambios del HTML y actualiza

Cuando cambies la app, incrementa `CACHE_NAME` en `sw.js`:
```javascript
const CACHE_NAME = 'per-campo-v2'  // v1 → v2
```

Los usuarios verán la actualización en el próximo refresh.

---

## 🎨 Personalizar Íconos

Los íconos actuales son azul `#1a4a8c` + dorado `#c9a84c`.

Para cambiarlos:

### Opción 1: Regenerar con canvas (recomendado)

```bash
npm install canvas
node generate-icons.js
```

Edita `generate-icons.js` para cambiar colores/diseño.

### Opción 2: Reemplazar manualmente

1. Crear PNG 192×192 y 512×512
2. Copiar a `pwa/icons/icon-192.png` y `icon-512.png`
3. El `manifest.json` ya apunta a estos archivos

---

## 📋 Cambios en index.html vs Pronosticador.html

Solo se agregaron **4 líneas**:

```html
<!-- En <head> -->
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#1a4a8c">
<link rel="apple-touch-icon" href="icons/icon-192.png">

<!-- Antes de </body> -->
<script>
  if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('./sw.js')
</script>
```

Sin cambios en la lógica de la app — es 100% compatible.

---

## 🌐 URLs Útiles

- **Repo GitHub**: `https://github.com/tu-usuario/per-campo`
- **PWA Live**: `https://tu-usuario.github.io/per-campo/`
- **Manifest**: `https://tu-usuario.github.io/per-campo/manifest.json`

---

## ❓ Troubleshooting

| Problema | Solución |
|----------|----------|
| Service Worker no se registra | Asegúrate de usar HTTPS (GitHub Pages lo usa automáticamente) |
| App no instala en móvil | Abre Developer Tools → Application → Manifest, verifica sin errores |
| Los datos no persisten | Verifica Application → Cache Storage, debería tener recursos cacheados |
| Cambios no aparecen | Borra cache del Service Worker: DevTools → Application → Clear storage |

---

## 📄 Licencia

Igual a `Pronosticador.html`

---

**¡Lista para usar!** 🚀

Cualquier duda o mejora, abre un issue en GitHub.
