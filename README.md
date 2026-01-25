# IFAP - NUEVA WEB DE CAMBIOS

Sitio web moderno para el Instituto de Formacion Archivistica del Peru (IFAP). Incluye portada, secciones informativas, formulario conectado a Google Sheets, menu movil, popup promocional y boton flotante de WhatsApp.

## Demo local
Abre `index.html` en tu navegador.

## Estructura del proyecto
```
assets/
  css/
    styles.css
  js/
    script.js
  images/
    hero.jpg
    imagen1.jpeg
    whatsappicono.png
index.html
```

## Funcionalidades principales
- Diseno premium y totalmente responsivo.
- Menu movil tipo hamburguesa.
- Efectos hover en tarjetas e imagenes.
- Popup promocional con imagen del primer taller.
- Formulario conectado a Google Sheets.
- Boton flotante de WhatsApp con animacion.

## Formulario a Google Sheets
El formulario envia los datos a un Google Sheet usando Apps Script (Web App).

### Campos enviados
- nombre
- correo
- telefono
- evento
- comentarios

### Apps Script (Web App)
En tu Google Sheet:
1) **Extensiones -> Apps Script**
2) Pega este codigo:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Respuestas");
  const data = e.parameter; // funciona con FormData

  sheet.appendRow([
    new Date(),
    data.nombre || "",
    data.correo || "",
    data.telefono || "",
    data.evento || "",
    data.comentarios || ""
  ]);

  return ContentService.createTextOutput("ok");
}
```

3) Guarda
4) **Implementar -> Nueva implementacion -> Web app**
   - Ejecutar como: Tu
   - Acceso: Cualquiera
5) Copia la URL del Web App

### Configurar la URL en el proyecto
En `assets/js/script.js`, cambia:
```javascript
const WEBAPP_URL = "TU_URL_AQUI";
```

## WhatsApp
El boton flotante de WhatsApp esta configurado con este mensaje:
"Quisiera mayor informacion sobre el taller por favor"

Para cambiar el numero o el texto, edita este enlace en `index.html`:
```
https://wa.me/51947872207?text=Quisiera%20mayor%20informaci%C3%B3n%20sobre%20el%20taller%20por%20favor
```

## Popup promocional
El popup se abre al cargar la web y muestra `hero.jpg` con un llamado a la accion.
Puedes editar el contenido en `index.html` buscando:
```
<div class="promo-modal" id="promo-modal">
```

## Notas
- Si pruebas el formulario desde `file://`, no veras respuesta del servidor (CORS). El envio se realiza igual.
- Para pruebas reales, es recomendable publicar el sitio (GitHub Pages, Netlify, etc.).

## Creditos
Proyecto web IFAP - 2026
