
function sendConfirmationEmail(e) {

  // Seguridad
  if (!e || !e.response) {
    throw new Error(
      "Este script debe ejecutarse desde un trigger del formulario"
    );
  }

  // Respuestas del formulario
  const responses = e.response.getItemResponses();

  // Convertir respuestas en objeto
  const data = {};

  responses.forEach(response => {

    const question =
      response.getItem().getTitle();

    const answer =
      response.getResponse();

    data[question] = answer;

  });

  // Datos
  const nombre =
    data["Nombre:"] || "";

  const email =
    data["Prestanos tu correo corporativo:"] || "";

  const proyecto =
    data["Nombre de tu proyecto:"] || "";

  const material =
    data["Material:"] || "";

  const color =
    data["Color"] || "";

  // Spreadsheet
  const spreadsheet = SpreadsheetApp.openById(
    "1nznb89nvIQs4udS55P4iFw-iswo69q4fYe5Ux0i2_Dc"
  );

  const sheet = spreadsheet.getSheetByName(
    "Respuestas de formulario 1"
  );

  // Última fila
  const row = sheet.getLastRow();

  // Headers
  const headers = sheet
    .getRange(2,1,1,sheet.getLastColumn())
    .getValues()[0];

  // Buscar ID PEDIDO
  const pedidoCol =
    headers.indexOf("ID PEDIDO") + 1;

  const pedidoId =
    sheet.getRange(row, pedidoCol).getValue();

  // Validación email
  if (!email) {
    throw new Error("Email vacío");
  }

  // HTML
  const html = `
<div style="margin:0;padding:0;background:#f3f6fb;font-family:system-ui,sans-serif;">

  <div style="max-width:650px;margin:40px auto;background:white;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);">

    <div style="background:linear-gradient(135deg,#003b7a,#2563eb);padding:40px 30px;text-align:center;">

      <img
        src="https://raw.githubusercontent.com/Yannedugo/Servicio-Impresion-3D-Cabrera-assets/refs/heads/main/Logo_del_IES_Cabrera_Pinto.png"
        style="max-width:90px;margin-bottom:20px;"
      >

      <h1 style="margin:0;color:white;font-size:32px;font-weight:800;">
        Servicio de Impresión 3D
      </h1>

      <p style="margin-top:10px;color:rgba(255,255,255,0.85);font-size:16px;">
        IES Canarias Cabrera Pinto
      </p>

    </div>

    <div style="padding:40px 35px;color:#202124;">

      <p style="font-size:18px;">
        Hola <strong>${nombre}</strong>,
      </p>

      <p style="line-height:1.7;color:#5f6368;font-size:16px;">
        Hemos recibido correctamente tu solicitud de impresión 3D.
      </p>

      <div style="background:#eef4ff;border-left:6px solid #2563eb;padding:22px;border-radius:14px;margin:35px 0;">

        <p style="margin:0;color:#5f6368;font-size:14px;">
          Número de pedido:
        </p>

        <h2 style="margin:10px 0 0;color:#2563eb;font-size:34px;">
          ${pedidoId}
        </h2>

      </div>

      <table style="width:100%;border-collapse:collapse;margin-top:20px;">

        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #e8eaed;color:#5f6368;">
            Proyecto
          </td>

          <td style="padding:14px 0;border-bottom:1px solid #e8eaed;text-align:right;">
            <strong>${proyecto}</strong>
          </td>
        </tr>

        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #e8eaed;color:#5f6368;">
            Material
          </td>

          <td style="padding:14px 0;border-bottom:1px solid #e8eaed;text-align:right;">
            <strong>${material}</strong>
          </td>
        </tr>

        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #e8eaed;color:#5f6368;">
            Color
          </td>

          <td style="padding:14px 0;border-bottom:1px solid #e8eaed;text-align:right;">
            <strong>${color}</strong>
          </td>
        </tr>

      </table>

    </div>

  </div>

</div>
`;

  // Enviar correo
  MailApp.sendEmail({
    to: email,
    subject: "Solicitud recibida - " + pedidoId,
    htmlBody: html
  });

}
