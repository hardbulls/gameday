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
