export function drawRoundedSquare(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  borderRadius: number,
  borderWidth: number,
  borderColor: string,
) {
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth;
  ctx.beginPath();
  ctx.moveTo(x + borderRadius, y);
  ctx.arcTo(x + width, y, x + width, y + height, borderRadius);
  ctx.arcTo(x + width, y + height, x, y + height, borderRadius);
  ctx.arcTo(x, y + height, x, y, borderRadius);
  ctx.arcTo(x, y, x + width, y, borderRadius);
  ctx.closePath();
  ctx.stroke();
}

export function drawSquare(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  borderWidth: number,
  borderColor: string,
) {
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x, y + height);
  ctx.closePath();
  ctx.stroke();
}

export function drawRoundedLeftSquare(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  borderRadius: number,
  borderWidth: number,
  borderColor: string,
) {
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth;
  ctx.beginPath();
  ctx.moveTo(x + borderRadius, y);
  ctx.arcTo(x, y, x, y + height, borderRadius);
  ctx.lineTo(x, y + height - borderRadius);
  ctx.arcTo(x, y + height, x + borderRadius, y + height, borderRadius);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x + width, y);
  ctx.closePath();
  ctx.stroke();
}

export function drawRoundedRightSquare(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  borderRadius: number,
  borderWidth: number,
  borderColor: string,
) {
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width - borderRadius, y);
  ctx.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
  ctx.lineTo(x + width, y + height - borderRadius);
  ctx.arcTo(
    x + width,
    y + height,
    x + width - borderRadius,
    y + height,
    borderRadius,
  );
  ctx.lineTo(x, y + height);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();
}

export async function drawImage(
  ctx: CanvasRenderingContext2D,
  src: string,
  dx: number,
  dy: number,
  width: number,
  height: number,
): Promise<void> {
  const image = new Image();

  image.src = src;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      // Specify the target width and height
      const targetWidth = width; // Change this to your desired width
      const targetHeight = height; // Change this to your desired height

      // Calculate the scaling factors to cover the specified width and height
      const scaleX = targetWidth / image.width;
      const scaleY = targetHeight / image.height;

      // Choose the larger scaling factor to cover both width and height
      const scale = Math.max(scaleX, scaleY);

      // Calculate the destination width and height based on the scale
      const dWidth = image.width * scale;
      const dHeight = image.height * scale;

      // Draw the image with the calculated parameters
      ctx.drawImage(image, dx, dy, dWidth, dHeight);

      resolve();
    };

    image.onerror = () => {
      reject();
    };
  });
}

export function rotateCanvas(ctx: CanvasRenderingContext2D, angle: number) {
  ctx.rotate((angle * Math.PI) / 180);
}
