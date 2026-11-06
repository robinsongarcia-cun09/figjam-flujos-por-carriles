# Solución de problemas

## El texto aparece cortado con «…»

**Causa:** la forma es más pequeña que el texto.
**Solución:** recalcular con las fórmulas de [ajuste-de-texto.md](ajuste-de-texto.md). Si los nodos quedaron muy apretados, aumentar el paso de columna (400) o mover detalle a una nota. No usar un `TextNode` auxiliar para medir.

## La descarga de capturas da 403

**Causa:** el proxy del entorno bloquea el host de Figma desde el shell.
**Solución:** no rodear el bloqueo. Pedir la captura con `enableBase64Response: true` en `get_screenshot`, o ejecutar `nodo.screenshot({ scale, contentsOnly: false })` dentro de `use_figma`, que devuelve la imagen inline.

## `get_screenshot` de una columna sale vacía

**Causa:** sin `contentsOnly: false` o sin pasar por `use_figma`, solo se renderiza la forma de fondo.
**Solución:** usar `nodo.screenshot({ scale: 0.3 a 0.5, contentsOnly: false })` en `use_figma` sobre la columna de fase para ver nodos y conectores encima.

## `screenshot` con `format` o `constraint` falla

**Causa:** el entorno no admite esas opciones y devuelve `undefined`.
**Solución:** llamar solo con `{ scale, contentsOnly }`.

## Error al fijar el texto de un conector

**Causa:** no se había definido la fuente.
**Solución:** asignar `conector.text.fontName` (y cargar la fuente) antes de `conector.text.characters`.

## Los hijos de la sección aparecen en otro lugar

**Causa:** coordenadas locales mal aplicadas.
**Solución:** añadir primero el nodo con `section.appendChild(nodo)` y después fijar `x` e `y` relativos a la sección.

## Una flecha cruza nodos o entra por un lado raro

**Causa:** magnet por defecto (`RIGHT → LEFT`) inadecuado para ese par.
**Solución:** cambiar `magnet` de inicio y fin. Reglas útiles:
- Mismo columna, nodo de abajo: `BOTTOM → TOP`.
- Devolución a un nodo anterior: `LEFT → BOTTOM` o `LEFT → TOP`.
- Mismo carril, dos conexiones entre los mismos nodos: una con `RIGHT → LEFT` y otra con `BOTTOM → BOTTOM`.

Al corregir por nombre, comprobar la dirección: el nodo de destino puede estar en un carril superior o inferior al esperado.

## La etiqueta de una flecha tapa el texto de un nodo

**Causa:** etiqueta larga sobre un tramo corto.
**Solución:** acortar la etiqueta (por ejemplo, «Un proveedor» en vez de «Un proveedor para toda la requisición») y dejar el detalle en el nodo.

## Faltan nodos al crear conectores

**Causa:** nombre distinto entre la lista de nodos y la de conectores.
**Solución:** devolver siempre la lista de conectores omitidos (`missing`) y corregir los nombres.

## Fuentes

Para Inter, el estilo se llama `Semi Bold` y `Extra Bold` (con espacio), no `SemiBold`. Cargar con `figma.loadFontAsync` antes de editar texto.
