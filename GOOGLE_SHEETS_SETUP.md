# Conectar AcademiaForm a Google Sheets

El formulario `AcademiaForm.vue` envía los datos a `server/api/academia-form.post.ts`, que reenvía la información a un **Google Apps Script Web App**. Sigue estos pasos una única vez:

## 1. Crea la Google Sheet

Crea una hoja de cálculo nueva y añade estos encabezados en la primera fila:

```
Fecha | Nombre | Apellido | Teléfono | Duda
```

## 2. Añade el Apps Script

En la Sheet, ve a **Extensiones → Apps Script** y pega este código:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.firstName || '',
    data.lastName || '',
    data.phone || '',
    data.message || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Publica como Web App

1. **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. "Ejecutar como": tu cuenta.
4. "Quién tiene acceso": **Cualquier usuario**.
5. Copia la URL que te da (termina en `/exec`).

## 4. Configura la variable de entorno

Copia `.env.example` a `.env` y pega la URL:

```
NUXT_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_ID/exec
```

Reinicia el servidor de desarrollo (`npm run dev`) para que Nuxt recoja la variable.

## 5. Prueba

Rellena el formulario en `/academia` (sección debajo del FAQ) y comprueba que aparece una fila nueva en la Sheet.

> Nota: cada vez que edites el script en Apps Script tienes que crear una **nueva implementación** (o gestionar versiones) para que los cambios se apliquen a la URL publicada.
