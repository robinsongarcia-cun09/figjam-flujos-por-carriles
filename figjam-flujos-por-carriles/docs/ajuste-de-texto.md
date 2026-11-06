# Ajuste de texto

En FigJam, el texto de una `ShapeWithText` que no cabe se **trunca con «…»** y la forma no crece sola. Hay que calcular el tamaño antes de crear el nodo.

## Fórmulas calibradas

Medidas con formas de prueba en FigJam, fuente Inter Medium.

**Redondeado** (`ROUNDED_RECTANGLE`): tiene un margen interno grande.

```
caracteresPorLinea = floor((ancho - 70) / (fuente * 0.53))
alto               = ceil(lineas * fuente * 1.25 + 80)
```

**Cuadrado** (`SQUARE`):

```
caracteresPorLinea = floor((ancho - 34) / (fuente * 0.52))
alto               = ceil(lineas * fuente * 1.25 + 56)
```

Referencias: un redondeado de 300 px a fuente 14 admite unos 31 caracteres por línea (340 px, unos 36); un cuadrado de 300 px, unos 38.

## Procedimiento

1. Contar las líneas con un ajuste por palabras sobre `caracteresPorLinea` (las palabras más largas que una línea se parten).
2. Probar en orden los pares `(ancho, fuente)`: `(300, 14)`, `(340, 14)`, `(340, 13)`, `(340, 12)`.
3. Quedarse con el primero cuyo alto sea ≤ 196; si ninguno cumple, usar `(340, 12)`.
4. Alto mínimo 90.

## Tamaños fijos

- Rombos: 320 × 210, fuente 14 (unos 45 caracteres en 4 líneas).
- Inicio: 220 × 110, fuente 24.
- «FIN»: 160 × 90, fuente 24.

## Qué no hacer

- **No medir con un `TextNode` auxiliar** (`measurer.height`): devolvió siempre alturas pequeñas y todos los nodos quedaron con el alto mínimo y texto cortado.
- No dejar textos largos en rombos: pasa de ~45 caracteres, mover el detalle a un nodo contiguo o a una nota.

## Buenas prácticas de redacción

- Texto literal del manual, corto.
- Más de ~160 caracteres: partirlo en dos nodos o mover parte a una nota.
- Botones entre corchetes, como en la interfaz: `[Enviar]`, `[Confirmar OC]`.
- Estados entre comillas simples: `'Recepción pendiente'`.

Ver la implementación en [`examples/helpers.js`](../examples/helpers.js).
