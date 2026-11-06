# Paleta

Valores tomados del flujo de referencia. En el API de Figma los colores van en rango 0–1 (`hex / 255`).

## Estructura

| Elemento | Relleno | Borde | Texto |
|---|---|---|---|
| Barra de título | #66d575 | #3e9b4b | oscuro, fuente 60 |
| Encabezado de fase | #1e1e1e | #b3b3b3 | blanco, negrita 24 |
| Encabezado de fase nueva | #ff9e42 | #eb7500 | blanco, 24 |
| Fondo de columna | #f9f9f9 | #d9d9d9 | |
| Fondo de columna de fase nueva | #fff7f0 | #ffc943 | |
| Etiqueta de carril | #d9d9d9 | #b3b3b3 | oscuro, 20–22 |
| Etiqueta de carril automático | #ffe0c2 | #ff9e42 | oscuro, 20–22 |
| Separador de carril | #d9d9d9 | | |
| Título de convenciones | #5ad8cc | #369e94 | oscuro, 30–40 |

## Nodos por rol

| Rol | Forma | Relleno | Borde | Texto |
|---|---|---|---|---|
| Inicio o éxito | Redondeado | #66d575 | #3e9b4b | oscuro |
| Paso funcional o pantalla | Redondeado | #c2e5ff | #3dadff | oscuro |
| Decisión | Rombo | #874fff | #5427b4 | blanco |
| Botón o acción | Redondeado | #3dadff | #007ad2 | blanco |
| Documento o dato | Cuadrado | #ffffff | #b3b3b3 | oscuro |
| Alerta, rechazo o excepción | Cuadrado | #ffcdc2 | #ff7556 | oscuro |
| Nota | Cuadrado | #ffecbd | #ffc943 | oscuro |
| Automático del sistema | Redondeado | #ffe0c2 | #ff9e42 | oscuro |
| Sistema externo | Redondeado | #c6faf6 | #5ad8cc | oscuro |
| Regla o requisito | Cuadrado | #cdf4d3 | #66d575 | oscuro |
| Pendiente o dependencia | Cuadrado | #ffc2ec | #f849c1 | oscuro |
| Fin | Redondeado | #ff7556 | #dc3009 | blanco |

Borde de nodos: `strokeWeight` 4.

## Conectores

Todos con `connectorLineType = 'ELBOWED'`.

| Tipo | Color | Grosor | Trazo | Flecha |
|---|---|---|---|---|
| Flujo principal | #1e1e1e | 4 | continuo | sí |
| Automatización o sistemas externos | #007ad2 | 3 | continuo | sí |
| Devolución, corrección o reenvío | #dc3009 | 3 | punteado `[12, 8]` | sí |
| Nota o referencia | #8f8f8f | 2 | punteado `[12, 8]` | no |

`connectorEndStrokeCap`: `'ARROW_LINES'` con flecha, `'NONE'` sin ella.

## Cambiar de estilo

Si el tablero de referencia es otro, extrae sus colores con `get_figjam` o inspeccionando los nodos y reemplaza estas tablas y la sección 2 de `SKILL.md`. El resto del método no cambia.
