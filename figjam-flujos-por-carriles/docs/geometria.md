# Geometría

Todas las coordenadas de los hijos son **locales a la sección**.

## Columnas y fases

- Paso de columna: `PITCH = 400`.
- Ancho máximo de nodo: 340 (quedan 60 px para las flechas entre columnas).
- Una fase con `n` columnas mide `n · 400 + 40` de ancho.
- La primera fase empieza en `x = 290`; cada siguiente en `x anterior + ancho + 20`.
- Centro de la columna `col` dentro de su fase: `inicioFase + 20 + (col − c0) · 400 + 200`, con `c0` la primera columna de esa fase.

## Verticales

| Elemento | y | Alto |
|---|---|---|
| Título | 0 | 150 |
| Encabezados de fase | 170 | 110 |
| Columnas | 300 | hasta el final |

## Carriles

| Carril | Alto |
|---|---|
| Cada actor | 700 |
| Sistema automático | 460 |
| Pantallazos | calculado |

- Etiquetas de carril: `x = 20`, ancho 250, alto del carril menos 10.
- Separadores: alto 8, color #d9d9d9, a `y = inicioCarril − 4`.

## Posición dentro de un carril

Centros verticales a partir del inicio del carril:

| Posición | Offset |
|---|---|
| Arriba (`t`) | +130 |
| Medio (`m`) | +350 |
| Abajo (`b`) | +570 |
| Carril automático | +230 |

Una columna admite un nodo por posición. Las ramas «No» o de devolución van arriba o abajo de la misma columna.

## Pantallazos

- Altura 320; si la imagen original es más alta, `rescale` con factor `320 / alto`.
- Leyenda debajo: cuadrado blanco, borde #b3b3b3, fuente 14, ancho `max(ancho imagen, 300)` y alto 72 a 112 según el texto.
- Separación entre imágenes: 30 a 40 px; si no caben en el ancho de su fase, pasan a otra fila.
- Alto de la fila: `320 + 8 + alto leyenda + 36`.
- Alto del carril de pantallazos: `30 + filas · altoFila + 10`.

## Tamaños fijos de nodos

| Nodo | Tamaño | Fuente |
|---|---|---|
| Decisión (rombo) | 320 × 210 | 14 |
| Inicio | 220 × 110 | 24 |
| «FIN» | 160 × 90 | 24 |
