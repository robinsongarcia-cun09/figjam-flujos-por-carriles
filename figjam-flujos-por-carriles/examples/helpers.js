// Funciones de referencia para ejecutar dentro de `use_figma` (FigJam).
// No es un módulo: copiar los fragmentos necesarios en el código de cada llamada.
// Recuerda: `return` es el único canal de salida y los colores van en 0-1.

const h = (r, g, b) => ({ r: r / 255, g: g / 255, b: b / 255 });
const WHITE = h(255, 255, 255);
const DARK = h(0x1e, 0x1e, 0x1e);
const MED = { family: 'Inter', style: 'Medium' };
const BOLD = { family: 'Inter', style: 'Bold' };
await figma.loadFontAsync(MED);
await figma.loadFontAsync(BOLD);

const PITCH = 400;
const NODE_W = 340;

// ---------------------------------------------------------------------------
// Forma con texto dentro de una sección
// ---------------------------------------------------------------------------
function box(section, o) {
  const s = figma.createShapeWithText();
  section.appendChild(s); // primero añadir; luego x/y locales
  s.shapeType = o.type || 'SQUARE'; // SQUARE | ROUNDED_RECTANGLE | DIAMOND
  s.fills = [{ type: 'SOLID', color: o.fill }];
  if (o.stroke) {
    s.strokes = [{ type: 'SOLID', color: o.stroke }];
    s.strokeWeight = o.sw || 4;
  } else {
    s.strokes = [];
  }
  s.text.fontName = o.font || MED;
  s.text.characters = o.text || '';
  s.text.fontSize = o.fs || 14;
  s.text.fills = [{ type: 'SOLID', color: o.tc || DARK }];
  s.resize(o.w, o.h);
  s.x = o.x;
  s.y = o.y;
  if (o.name) s.name = o.name; // name = clave del nodo, para los conectores
  return s;
}

// ---------------------------------------------------------------------------
// Ajuste de texto (ver docs/ajuste-de-texto.md)
// ---------------------------------------------------------------------------
const cpl = (type, w, fs) =>
  type === 'SQUARE'
    ? Math.floor((w - 34) / (fs * 0.52))
    : Math.floor((w - 70) / (fs * 0.53));

function wrap(text, c) {
  let n = 0;
  for (const para of text.split('\n')) {
    let cur = 0;
    let l = 1;
    for (const word of para.split(' ')) {
      const len = word.length;
      if (len > c) {
        if (cur > 0) l++;
        l += Math.floor((len - 1) / c);
        cur = ((len - 1) % c) + 1;
      } else if (cur === 0) cur = len;
      else if (cur + 1 + len <= c) cur += 1 + len;
      else { l++; cur = len; }
    }
    n += l;
  }
  return n;
}

function fit(type, text, maxH) {
  for (const [w, fs] of [[300, 14], [NODE_W, 14], [NODE_W, 13], [NODE_W, 12]]) {
    const lines = wrap(text, cpl(type, w, fs));
    const hh = Math.ceil(lines * fs * 1.25 + (type === 'SQUARE' ? 56 : 80));
    if (hh <= maxH || fs === 12) return { w, fs, h: Math.max(hh, 90) };
  }
}

// ---------------------------------------------------------------------------
// Geometría de fases (ver docs/geometria.md)
// ---------------------------------------------------------------------------
// const PH = [{ n: 7, t: '1. ...' }, { n: 3, t: '2. ...' }];
// let x = 290, c = 0;
// for (const p of PH) { p.x = x; p.w = p.n * PITCH + 40; p.c0 = c; c += p.n; x += p.w + 20; }
// const xc = (col) => {
//   const p = PH.find((q) => col >= q.c0 && col < q.c0 + q.n);
//   return p.x + 20 + (col - p.c0) * PITCH + PITCH / 2;
// };
// const LT = { S: 300, A: 1000 };            // y de inicio de cada carril
// const cy = (lane, slot) => LT[lane] + (slot === 't' ? 130 : slot === 'm' ? 350 : 570);

// ---------------------------------------------------------------------------
// Conectores por nombre (ver docs/paleta.md)
// ---------------------------------------------------------------------------
const ST = {
  main: { c: DARK, w: 4, d: [], arrow: true },
  blue: { c: h(0x00, 0x7a, 0xd2), w: 3, d: [], arrow: true },
  ret: { c: h(0xdc, 0x30, 0x09), w: 3, d: [12, 8], arrow: true },
  note: { c: h(0x8f, 0x8f, 0x8f), w: 2, d: [12, 8], arrow: false },
};

function makeConnector(section, byName, missing, a, b, st = 'main', label, ma = 'RIGHT', mb = 'LEFT') {
  const A = byName[a];
  const B = byName[b];
  if (!A || !B) { missing.push(a + '>' + b); return; }
  const s = ST[st];
  const k = figma.createConnector();
  section.appendChild(k);
  k.connectorStart = { endpointNodeId: A.id, magnet: ma }; // TOP | BOTTOM | LEFT | RIGHT
  k.connectorEnd = { endpointNodeId: B.id, magnet: mb };
  k.connectorLineType = 'ELBOWED';
  k.strokes = [{ type: 'SOLID', color: s.c }];
  k.strokeWeight = s.w;
  k.dashPattern = s.d;
  k.connectorEndStrokeCap = s.arrow ? 'ARROW_LINES' : 'NONE';
  if (label) {
    k.text.fontName = MED; // la fuente va antes que los caracteres
    k.text.characters = label;
    k.text.fontSize = 14;
  }
  k.name = 'cx ' + a + '>' + b;
}

// Uso:
// const byName = {}; for (const ch of section.children) byName[ch.name] = ch;
// const missing = [];
// makeConnector(section, byName, missing, 'inicio', 'form');
// makeConnector(section, byName, missing, 'campos', 'soporte', 'main', 'No', 'BOTTOM', 'TOP');
// return { missing };
