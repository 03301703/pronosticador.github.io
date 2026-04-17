# 🚀 Guía de Deployment a GitHub Pages

**Tiempo estimado: 5 minutos**

---

## Paso 1: Crear Repositorio en GitHub

1. Ir a https://github.com/new
2. **Repository name**: `flores-el-trigal-per` (o nombre de tu preferencia)
3. **Description**: "Pronosticador de corte - PER Campo (PWA)"
4. **Visibilidad**: Public
5. ✅ **Create repository**

Copiar la URL: `https://github.com/tu-usuario/flores-el-trigal-per.git`

---

## Paso 2: Clonar el Repo Localmente

```bash
# Abrir terminal/cmd y ejecutar:
git clone https://github.com/tu-usuario/flores-el-trigal-per.git
cd flores-el-trigal-per
```

---

## Paso 3: Copiar Archivos PWA

### Opción A: Windows (CMD)
```cmd
xcopy /E /Y "C:\Users\mjmon\Downloads\pronosticador\pwa\*" .
```

### Opción B: PowerShell
```powershell
Copy-Item -Path "C:\Users\mjmon\Downloads\pronosticador\pwa\*" -Destination . -Recurse -Force
```

### Opción C: Bash/Git Bash
```bash
cp -r ~/Downloads/pronosticador/pwa/* .
```

---

## Paso 4: Verificar Archivos

Ejecuta en la terminal:
```bash
ls -la
```

Deberías ver:
```
index.html        ← Aplicación web
manifest.json     ← Configuración PWA
sw.js            ← Service Worker
README.md        ← Este archivo
icons/           ← Carpeta con íconos
  icon-192.png
  icon-512.png
```

---

## Paso 5: Subir a GitHub

```bash
git add .
git commit -m "feat: Initial PWA deployment"
git push -u origin main
```

Verifica en GitHub que los archivos se subieron:
https://github.com/tu-usuario/flores-el-trigal-per

---

## Paso 6: Activar GitHub Pages

1. En GitHub, ir a **Settings** (⚙️)
2. Menú izquierdo → **Pages**
3. **Source**: "Deploy from a branch"
4. **Branch**: `main`
5. **Folder**: `/ (root)`
6. ✅ **Save**

Esperar 1-2 minutos...

---

## Paso 7: ¡Listo! 🎉

Tu app estará en vivo en:

```
https://tu-usuario.github.io/flores-el-trigal-per/
```

---

## ✅ Verificación Final

### En Escritorio (Chrome)

1. Abrir: https://tu-usuario.github.io/flores-el-trigal-per/
2. Presionar F12 (Developer Tools)
3. **Application** → **Manifest**
   - ✓ Sin errores
4. **Service Workers**
   - ✓ Status: "activated and running"
5. **Cache Storage** → `per-campo-v1`
   - ✓ Ver archivos cacheados

### En Móvil (Android - Chrome)

1. Abrir en Chrome móvil
2. Menú ⋮ (tres puntos)
3. **Instalar app** o **Añadir a pantalla de inicio**
4. ¡Listo! Aparecerá como app

### En Móvil (iPhone - Safari)

1. Abrir en Safari móvil
2. Compartir (cuadro con flecha)
3. **Añadir a pantalla de inicio**
4. ¡Listo! Aparecerá como app

---

## 🔄 Futuros Cambios

Si necesitas actualizar la app:

```bash
# 1. Hacer cambios locales en la carpeta
# 2. Subir a GitHub
git add .
git commit -m "Update: descripción del cambio"
git push

# 3. Para cachés más frescos, incrementar versión en sw.js:
# const CACHE_NAME = 'per-campo-v2'  // v1 → v2
# 4. Los usuarios verán cambios en el próximo refresh
```

---

## 🆘 Troubleshooting

| Problema | Solución |
|----------|----------|
| No aparece el botón "Instalar app" | Abre con Chrome/Edge en móvil, no Safari |
| Los datos desaparecen al cerrar | Abre con HTTPS, GitHub Pages usa HTTPS ✓ |
| Service Worker no funciona | Abre DevTools → Application → Clear storage → refresh |
| Cambios no aparecen | Ctrl+Shift+Delete caché del navegador |

---

## 📚 Más Información

- **Manifest**: `manifest.json` tiene toda la configuración PWA
- **Service Worker**: `sw.js` gestiona la caché offline
- **README**: `README.md` tiene documentación completa

---

**¡Deployment completado!** 🚀

Cualquier duda, abre un issue en GitHub.
