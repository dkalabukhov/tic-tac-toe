import { useEffect, useRef } from 'react';
import styles from './WinningLine.module.scss';

export function WinningLine({ winningCoordinates, fieldRef }) {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!winningCoordinates) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const field = fieldRef.current;
    const anyCell = field.querySelector('div[data-cell-id]');

    if (!field || !anyCell) return;

    canvas.width = field.offsetWidth;
    canvas.height = field.offsetHeight;

    const ctx = canvas.getContext('2d');
    const cellSize = anyCell.offsetWidth;
    const startX = cellSize * winningCoordinates.at(0).col + cellSize / 2;
    const startY = cellSize * winningCoordinates.at(0).row + cellSize / 2;
    const endX = cellSize * winningCoordinates.at(-1).col + cellSize / 2;
    const endY = cellSize * winningCoordinates.at(-1).row + cellSize / 2;

    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }

    let progress = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentX = startX + (endX - startX) * progress;
      const currentY = startY + (endY - startY) * progress;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(currentX, currentY);
      ctx.strokeStyle = '#8B0000';
      ctx.lineWidth = cellSize * 0.08;
      ctx.lineCap = 'round';
      ctx.stroke();

      progress += 0.02;

      if (progress < 1) {
        animationIdRef.current = requestAnimationFrame(draw);
      } else {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = cellSize * 0.08;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    };

    draw();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [winningCoordinates, fieldRef]);

  return (
    winningCoordinates && (
      <canvas ref={canvasRef} className={styles.winningLine}></canvas>
    )
  );
}
