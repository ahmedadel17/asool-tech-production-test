// Convert hex to HSL
function hexToHSL(H: string): [number, number, number] {
  let r = 0, g = 0, b = 0;
  if (H.length === 4) {
    r = parseInt("0x" + H[1] + H[1], 16);
    g = parseInt("0x" + H[2] + H[2], 16);
    b = parseInt("0x" + H[3] + H[3], 16);
  } else if (H.length === 7) {
    r = parseInt("0x" + H[1] + H[2], 16);
    g = parseInt("0x" + H[3] + H[4], 16);
    b = parseInt("0x" + H[5] + H[6], 16);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  let h = 0, s = 0, l = (cmax + cmin) / 2;

  if (delta !== 0) {
    h = cmax === r ? ((g - b) / delta) % 6 :
      cmax === g ? (b - r) / delta + 2 :
        (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

// Generate palette using HSL
function hsl(h: number, s: number, l: number): string {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function generatePalette(h: number, s: number, l: number) {
  // For lighter shades, maintain or slightly increase saturation to avoid pale colors
  // 200 should be very close to 500 (base color)
  return {
    50: hsl(h, Math.min(s * 0.9, 100), Math.min(l + 45, 95)),
    100: hsl(h, Math.min(s * 0.95, 100), Math.min(l + 35, 90)),
    200: hsl(h, Math.min(s * 1.0, 100), Math.min(l + 5, 85)), // Very close to base color
    300: hsl(h, Math.min(s * 1.0, 100), Math.min(l + 3, 75)), // Very close to base color
    400: hsl(h, Math.min(s * 1.0, 100), Math.min(l + 2, 65)), // Very close to base color
    500: hsl(h, s, l), // Base color
    600: hsl(h, Math.min(s * 1.0, 100), Math.max(l - 2, 5)),
    700: hsl(h, Math.min(s * 0.95, 100), Math.max(l - 15, 5)),
    800: hsl(h, Math.min(s * 0.9, 100), Math.max(l - 25, 3)),
    900: hsl(h, Math.min(s * 0.85, 100), Math.max(l - 35, 2)),
  };
}

// Accept hex and generate palette
export function generatePaletteFromHex(hex: string) {
  const [h, s, l] = hexToHSL(hex);
  return generatePalette(h, s, l);
}

