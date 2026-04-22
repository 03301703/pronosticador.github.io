# Pronosticador - PWA para GitHub Pages

Sistema de pronostico de flores "El Trigal" desplegado como Progressive Web App en GitHub Pages.

## Caracteristicas

- 100% Funcional - Todas las funcionalidades del HTML original
- Offline - Funciona sin internet (Service Worker)
- Instalable - Se instala como app nativa en movil/desktop
- Rapido - Caching inteligente de recursos
- Sin dependencias de servidor - Solo HTML, CSS, JavaScript

## Como usar

### Localmente
```bash
python -m http.server 8000
```

Luego abre: http://localhost:8000

### En GitHub Pages

1. Fork este repositorio
2. Activa GitHub Pages en Settings → Pages
3. Selecciona rama `main` y carpeta `/root`
4. Tu app estara en: https://tu-usuario.github.io/pronosticador/

## Estructura

```
pronosticador_pwa/
├── index.html          # App completa (340KB)
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker (offline)
├── README.md          # Este archivo
└── .gitignore         # Git ignore
```

## Instalacion como App

### En Movil (Android/iOS)

1. Abre en navegador
2. Menu → "Instalar app" o "Agregar a pantalla de inicio"
3. Listo! Funciona como app nativa

### En Desktop (Windows/Mac/Linux)

1. Abre en Chrome/Edge
2. Haz clic en el icono de instalacion en la barra de direcciones
3. Listo! Se instala como app de escritorio

## Funcionalidades

### Procesar Siembras (XLSX)
- Carga archivos Excel
- Calcula Per, Pronostico, fechas de corte
- Muestra resultados en tabla

### Datos Embebidos
- 100+ variedades de flores
- Parametros completos
- Aprovechamientos por color

### Historial
- Resumen por variedad
- Graficos de donuts
- Comparativas

### Descargas
- CSV
- Excel
- Datos persistentes con localStorage

## Tecnologias

- HTML5 - Estructura y layout
- CSS3 - Estilos modernos y responsive
- JavaScript vanilla - Sin frameworks
- Service Worker - Funcionalidad offline
- LocalStorage/IndexedDB - Persistencia

## Responsivo

Funciona perfectamente en:
- Movil (iPhone, Android)
- Tablet (iPad, etc)
- Desktop (Windows, Mac, Linux)
- Todos los navegadores modernos

## Datos Offline

La app guarda automaticamente:
- Sesiones de trabajo
- Archivos procesados
- Configuracion de filtros
- Ajustes manuales

Todo se sincroniza entre pestanas y se mantiene entre sesiones.

## Privacidad

- Todo es local
- No se envian datos a servidores
- No hay tracking
- No hay publicidad
- 100% privado

## Rendimiento

- Carga instantanea (cache)
- Graficos fluidos
- Tablas responsivas
- Bajo consumo de bateria

## Reportar Issues

Si encuentras algun problema:
1. Abre el navegador DevTools (F12)
2. Ve a Console
3. Copia el error
4. Abre un issue en GitHub

## Licencia

Uso privado para "Flores El Trigal"

---

Version: 2.0 PWA
Ultima actualizacion: 2026
Estado: Produccion

Hecho para El Trigal
