# Flujo de trabajo

Orden recomendado para construir un flujo. Cada paso es una llamada a `use_figma` (salvo la lectura y la verificación).

## 1. Lectura y diseño del contenido

1. Leer el tablero original con `get_figjam`: secciones, textos y pantallazos (anotar los IDs de las imágenes).
2. Leer el tablero de referencia: colores, fases, carriles y la sección de convenciones.
3. Leer el documento o manual con los cambios. Si el usuario marca partes con un color, esas son las que se integran o cambian.
4. Comparar contra el flujo original y decidir qué decisiones se **eliminan**, se **reemplazan** o se **mueven**. Guardar esa lista para el resumen final.
5. Definir fases (columnas), carriles (actores) y la lista de nodos `[clave, carril, columna, posición, rol, texto]`.

## 2. Estructura (script 1)

- Crear la sección nueva en una zona libre del tablero (por ejemplo, a partir de y = 13000).
- Título, columnas de fase, separadores de carril, encabezados de fase y etiquetas de carril.
- Clonar los pantallazos del original, escalarlos y ponerles una leyenda.
- Dimensionar la sección al final, cuando se conoce el alto total.

## 3. Nodos (script 2)

- Un nodo por entrada de la lista; `name` = clave.
- Calcular tamaño y fuente con las fórmulas de [ajuste-de-texto.md](ajuste-de-texto.md).
- Devolver los nodos que quedaron fuera de lo normal (alto > 196 o fuente < 14) para revisarlos.

## 4. Conectores (script 3)

- Buscar los nodos por nombre y crear cada conector con su estilo (ver [paleta.md](paleta.md)).
- Devolver la lista de conectores con nodos faltantes.
- Etiquetar las ramas de decisión con «Sí» y «No».

## 5. Bloques adicionales

Crear cada proceso auxiliar como una sección aparte con el mismo estilo (por ejemplo, el registro de proveedores).

## 6. Convenciones

Ver [convenciones.md](convenciones.md).

## 7. Verificación

1. Captura de la sección completa para ver la composición.
2. Captura por fase: `columna.screenshot({ scale: 0.3 a 0.5, contentsOnly: false })` renderiza los nodos encima de la columna.
3. Revisar: texto truncado («…»), etiquetas solapadas, flechas que cruzan nodos, magnets incorrectos.
4. Corregir con `connectorStart` / `connectorEnd` o acortando etiquetas.

## 8. Cierre

Resumen corto en español: qué se hizo, que el original quedó intacto, decisiones de contenido, detalles menores pendientes y siguiente paso.
