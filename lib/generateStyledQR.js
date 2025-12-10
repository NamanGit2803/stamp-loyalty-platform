"use client";

export const generateStyledQR = async (qr) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const size = 800;
  canvas.width = size;
  canvas.height = size;

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  // Load QR image
  const basicQR = new Image();
  basicQR.src = qr;

  await new Promise((res) => (basicQR.onload = res));

  // Padding + frame
  const padding = 60;
  const boxSize = size - padding * 2;

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#1a73e8";
  ctx.lineWidth = 15;

  ctx.beginPath();
  ctx.roundRect(padding, padding, boxSize, boxSize, 40);
  ctx.fill();
  ctx.stroke();

  // Draw QR
  ctx.drawImage(
    basicQR,
    padding + 40,
    padding + 40,
    boxSize - 80,
    boxSize - 80
  );

  // Footer text
  ctx.fillStyle = "#1a73e8";
  ctx.font = "bold 42px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Scan to Earn Rewards", size / 2, size - 40);

  return canvas.toDataURL("image/png");
};
