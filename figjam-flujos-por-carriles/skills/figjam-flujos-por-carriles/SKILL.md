---
name: figjam-flujos-por-carriles
description: Construir o actualizar flujos de proceso en FigJam (Figma MCP) con fases en columnas, carriles por actor, pantallazos, conectores y convenciones, con la paleta del flujo de referencia.
---

# Flujos de proceso en FigJam por fases y carriles

Usar cuando el usuario pida crear o actualizar un flujo en un tablero FigJam (figma.com/board/...), integrar cambios de un manual o documento, tomar colores y segmentación de otro tablero y generar convenciones. Responder en español.

## 0. Preparación
1. Extraer `fileKey` de la URL del tablero. Llamar `create_session` y reutilizar el `sessionId` en todas las llamadas.
2. Cargar los skills `figma-use` y `figma-use-figjam` y pasar `skillNames "figma-use,figma-use-figjam"` en cada `use_figma`.
3. Leer el tablero original con `get_figjam` (estructura y textos) y el de referencia (paleta, fases, carriles, convenciones). Si el usuario marca partes con un color (p. ej. moradas), esas son las que se integran o cambian.
4. Si `get_screenshot` devuelve URL y la descarga con curl da 403 (proxy), NO rodear el bloqueo. Usar `enableBase64Response:true` o `node.screenshot({scale, contentsOnly:false})` dentro de `use_figma` (devuelve la imagen inline).
5. Crear lista de tareas (estructura, nodos, conectores, bloques extra, convenciones, verificación).

## 1. Reglas de `use_figma` en FigJam
- `return` es el único canal de salida; `console.log` no se devuelve. Devolver IDs creados.
- Colores en rango 0–1 (hex/255). Cargar fuentes (Inter Medium y Bold) antes de editar texto.
- Los hijos de una sección usan coordenadas locales; primero `section.appendChild(nodo)` y luego x/y.
- `figma.createShapeWithText()` con `shapeType` SQUARE, ROUNDED_RECTANGLE o DIAMOND. Fijar siempre relleno, borde (`strokeWeight` 4) y color de texto. Poner `.name` = clave del nodo para cablear conectores por nombre.
- `figma.createConnector()`: `connectorStart/End = {endpointNodeId, magnet}` (TOP, BOTTOM, LEFT, RIGHT), `connectorLineType='ELBOWED'`, `strokes`, `dashPattern`, `connectorEndStrokeCap='ARROW_LINES'` (o 'NONE' para notas). Para etiquetas fijar antes `connector.text.fontName`.
- `node.clone()` copia imágenes del tablero original; `rescale(s)` las escala. Usar así los pantallazos.
- No modificar el contenido original: construir el flujo nuevo en una sección aparte debajo (p. ej. y=13000) para que el usuario borre lo viejo después.

## 2. Paleta (tomada del flujo de referencia; sustituir si el de referencia cambia)
- Barra de título: verde #66d575 / borde #3e9b4b, fuente 60.
- Encabezado de fase: negro #1e1e1e / borde #b3b3b3, texto blanco en negrita 24. Fase nueva: naranja #ff9e42 / #eb7500.
- Fondo de columna: #f9f9f9 / #d9d9d9 (fase nueva: #fff7f0 / #ffc943). Etiqueta de carril: #d9d9d9 / #b3b3b3, fuente 20–22 (carril automático: #ffe0c2 / #ff9e42).
- Roles de nodo (relleno / borde / forma):
  - inicio o éxito: #66d575 / #3e9b4b, redondeado.
  - paso funcional: #c2e5ff / #3dadff, redondeado.
  - decisión: #874fff / #5427b4, texto blanco, rombo.
  - botón o acción: #3dadff / #007ad2, texto blanco, redondeado.
  - documento o dato: blanco / #b3b3b3, cuadrado.
  - alerta o rechazo: #ffcdc2 / #ff7556, cuadrado.
  - nota: #ffecbd / #ffc943, cuadrado.
  - automático del sistema: #ffe0c2 / #ff9e42, redondeado.
  - sistema externo: #c6faf6 / #5ad8cc, redondeado.
  - regla o requisito: #cdf4d3 / #66d575, cuadrado.
  - pendiente: #ffc2ec / #f849c1, cuadrado.
  - fin: #ff7556 / #dc3009, texto blanco, redondeado.
- Conectores, todos ELBOWED: negro #1e1e1e w4 (flujo principal); azul #007ad2 w3 (automatización o sistemas externos); rojo #dc3009 punteado [12,8] w3 (devolución, corrección, reenvío); gris #8f8f8f punteado w2 sin flecha (nota).

## 3. Geometría
- Paso de columna PITCH=400; ancho de nodo máx. 340 (deja 60 px para flechas). Ancho de fase = n·400+40; centro de columna = inicioFase+20+(col−c0)·400+200. Fases separadas 20 px, la primera en x=290.
- Título y=0 h=150; encabezados y=170 h=110; columnas desde y=300.
- Carriles (altura): actores 700 cada uno; carril del sistema automático 460; carril final PANTALLAZOS con altura calculada. Separadores de 8 px en #d9d9d9. Etiquetas de carril x=20 w=250.
- Posición dentro de un carril: centros en +130 (arriba), +350 (medio), +570 (abajo); carril automático +230.
- Un nodo por columna y posición; las ramas (No, devolver) van en la posición de abajo o arriba de la misma columna.
- Pantallazos: altura 320, leyenda debajo (cuadrado blanco, fuente 14); repartir por fase y pasar a otra fila si no caben.

## 4. Ajuste del texto (calibrado; el texto que no cabe se trunca con «…»)
- Redondeado: caracteres por línea ≈ (w−70)/(fs·0.53); alto = líneas·fs·1.25+80.
- Cuadrado: caracteres por línea ≈ (w−34)/(fs·0.52); alto = líneas·fs·1.25+56.
- Probar [[300,14],[340,14],[340,13],[340,12]] (ancho, fuente) y tomar la primera combinación con alto ≤196. Mínimo 90.
- Tamaños fijos: rombos 320×210 fuente 14 (≈45 caracteres en 4 líneas); inicio 220×110 fuente 24; «FIN» 160×90 fuente 24.
- NO medir con un TextNode auxiliar (devuelve alturas pequeñas e inservibles).
- Cada texto de nodo debe ser corto y literal del manual; si pasa de ~160 caracteres, partirlo o moverlo a una nota.

## 5. Flujo de trabajo
1. Mapear el contenido nuevo (manual) contra el flujo original: qué decisiones se eliminan, se reemplazan o se mueven. Anotarlo para informarlo al final.
2. Script 1: sección, título, columnas, separadores, encabezados, carriles y pantallazos clonados con leyendas.
3. Script 2: todos los nodos, con lista `[clave, carril, columna, posición, rol, texto]`.
4. Script 3: conectores buscando nodos por nombre; devolver la lista de faltantes. Etiquetar las ramas de decisión («Sí», «No»). Las devoluciones salen LEFT→BOTTOM o LEFT→TOP.
5. Bloques adicionales (p. ej. registro de proveedores) como sección aparte con el mismo estilo.
6. Sección CONVENCIONES (modelo del flujo de referencia): título turquesa #5ad8cc / #369e94 fuente 30–40; pares muestra 110×80 + etiqueta 1280×80 en dos columnas, uno por rol de nodo; bloques de texto para CARRILES, FASES y FLECHAS; nota con la fuente del manual. No inventar bloques de autoría ni roles.
7. Verificar: capturar la sección completa y luego cada columna (`columna.screenshot({scale:0.3–0.5,contentsOnly:false})` renderiza los nodos encima). Buscar texto truncado, etiquetas solapadas, flechas que cruzan nodos o magnets incorrectos y corregirlos (`connectorStart/End`, acortar etiquetas).

## 6. Cierre
Responder en español, breve: qué se hizo, que el original quedó intacto, decisiones de contenido (qué decisiones se quitaron, reemplazaron o movieron), detalles menores pendientes y el siguiente paso (revisar y borrar secciones antiguas).
