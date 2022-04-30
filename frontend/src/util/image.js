import { toPng } from 'html-to-image';

export function cropImage(imageUrl, cropSize = {}) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = cropSize.width;
  canvas.height = cropSize.height;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(imageUrl, -cropSize.x, -cropSize.y);

  const croppedImageUrl = canvas.toDataURL();
  return croppedImageUrl;
}

export async function screenshot(element, cropSize) {
  const fullImageUrl = await toPng(element);
  const fullImage = new Image();
  fullImage.src = fullImageUrl;

  return new Promise((resolve, reject) => {
    fullImage.onload = () => resolve(cropImage(fullImage, cropSize));
    fullImage.onerror = () => reject(new Error('Could not take screenshot'));
  });
}
