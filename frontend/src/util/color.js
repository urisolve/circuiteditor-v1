// https://stackoverflow.com/questions/5560248
export function shadeColor(color, percentage) {
  color = color.replace(/^#/, '');

  if (color.length === 3) {
    const [r, g, b] = color;
    color = [r, r, g, g, b, b].join('');
  }

  let [r, g, b] = color.match(/.{2}/g);

  [r, g, b] = [
    parseInt(r, 16) + percentage,
    parseInt(g, 16) + percentage,
    parseInt(b, 16) + percentage,
  ];

  r = Math.max(Math.min(255, r), 0).toString(16);
  g = Math.max(Math.min(255, g), 0).toString(16);
  b = Math.max(Math.min(255, b), 0).toString(16);

  const rr = (r.length < 2 ? '0' : '') + r;
  const gg = (g.length < 2 ? '0' : '') + g;
  const bb = (b.length < 2 ? '0' : '') + b;

  return `#${rr}${gg}${bb}`;
}
