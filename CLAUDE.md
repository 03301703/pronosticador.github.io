# CLAUDE.md — Pronosticador Flores El Trigal

## Qué es este proyecto

PWA (Progressive Web App) para gestionar y pronosticar la producción de flores en **Flores El Trigal**. Desplegada en GitHub Pages, funciona tanto online como offline.

**URL producción:** https://03301703.github.io/pronosticador.github.io/

## Stack

- **Frontend:** HTML5 + CSS3 + JavaScript vanilla (sin frameworks). Todo en un solo archivo `index.html` (~340KB).
- **Backend/nube:** [Supabase](https://supabase.com) para sincronización entre dispositivos.
  - URL: `https://gddbpieasfecfwnrnpnp.supabase.co`
  - Key pública (publishable): `sb_publishable_4jaCsZWgaGDPFi4U1AM1gw_2qcLKLls`
- **Offline:** Service Worker (`sw.js`) + LocalStorage + IndexedDB.
- **PWA:** `manifest.json` con `short_name: Pronosticador`, tema azul `#1a4a8c`.

## Estructura de archivos

```
/
├── index.html      # Toda la app (HTML + CSS + JS en un solo archivo)
├── manifest.json   # Configuración PWA
├── sw.js           # Service Worker para modo offline
└── README.md       # Documentación de uso
```

## Funcionalidades principales

| Módulo | Descripción |
|---|---|
| Procesar Siembras | Carga Excel (.xlsx), calcula Per, Pronóstico y fechas de corte |
| Plan Finca | Carga y gestiona el plan de siembra semanal |
| Historial | Resumen por variedad, gráficos de donuts, comparativas |
| Descargas | Exporta a CSV y Excel |
| Sincronización | Comparte sesión entre dispositivos vía Supabase |

## Cómo correr localmente

```bash
python -m http.server 8000
# Luego abrir http://localhost:8000
```

## Flujo de trabajo con Git

El repositorio está en GitHub: `https://github.com/03301703/pronosticador.github.io`

```bash
git add .
git commit -m "descripción del cambio"
git push origin main
```

GitHub Pages publica automáticamente desde `main`.

## Notas importantes

- **No usar frameworks:** La app es intencionalmente vanilla JS para simplicidad y compatibilidad.
- **Archivo único:** `index.html` contiene todo el HTML, CSS y JS. Es grande (~340KB) pero es el diseño elegido.
- **Supabase key es pública:** La key en el código es `publishable` (no secreta), diseñada para uso en frontend.
- **Datos de flores embebidos:** Más de 100 variedades con parámetros de producción hardcodeados en el JS.
- **Uso privado:** Solo para Flores El Trigal, no es un producto público.

## Historial de cambios relevantes

| Fecha | Cambio |
|---|---|
| 2026 | Conectar app con Supabase (nube compartida) |
| 2026 | Conversión a PWA con Service Worker |
| 2026 | Versión inicial |

---

*Mantenido por el equipo de APS Trigal. Contacto: maria.montoya@floreseltrigal.com*
