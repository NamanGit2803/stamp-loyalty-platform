"use client";

export const generateStyledQR = async (qrBase64, shopName) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Exact Canva template size
  const width = 1545;
  const height = 2000;

  canvas.width = width;
  canvas.height = height;

  /* ------------------ 1. Load Canva Template ------------------ */
  const template = new Image();
  template.src = "/qr-template.png"; 
  await new Promise((res) => (template.onload = res));

  ctx.drawImage(template, 0, 0, width, height);

  /* ------------------ 2. Draw Shop Name ------------------ */
  ctx.font = "600 70px 'Nunito', sans-serif";
  ctx.fillStyle = "#404040";
  ctx.textAlign = "center";

  // Perfect position for shop name
  ctx.fillText(shopName, width / 2, 860);

  /* ------------------ 3. Load QR Code ------------------ */
  const qr = new Image();
  qr.src = qrBase64;
  await new Promise((res) => (qr.onload = res));

  /* ------------------ 4. Draw QR Code ------------------ */
  const qrX = 515;
  const qrY = 985;
  const qrSize = 510;

  ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);

  /* ------------------ 5. Return Output ------------------ */
  return canvas.toDataURL("image/png");
};
