# Sección de convenciones

Leyenda al estilo del flujo de referencia. Va como una sección aparte, debajo del flujo principal.

## Estructura

1. **Título**: barra turquesa (#5ad8cc, borde #369e94), texto «CONVENCIONES», fuente 40 en negrita.
2. **Muestras en dos columnas**, una por cada rol de nodo:
   - Muestra de 110 × 80 con la forma, relleno y borde del rol.
   - Etiqueta de 1280 × 80 al lado (blanco, borde #d9d9d9, fuente 22).
   - Paso de fila 110 y de columna 1440.
3. **Bloque CARRILES y FASES**: qué representa cada fila y qué significa el encabezado negro frente al naranja (fase nueva incorporada del manual).
4. **Bloque FLECHAS**: negra = flujo principal; azul = automatización o comunicación con sistemas externos; roja punteada = devolución, corrección o reenvío; gris punteada = nota, sin flecha.
5. **Nota de origen**: «Actualizado según <nombre del manual>» y de dónde provienen los pantallazos.

## Orden de las muestras

| Columna izquierda | Columna derecha |
|---|---|
| Inicio / estado exitoso | Paso funcional o pantalla |
| Decisión / validación | Botón o acción |
| Documento, HU o dato | Alerta, rechazo o excepción |
| Nota | Acción o estado automático |
| Sistema externo / integración | Regla o requisito |
| Pendiente o dependencia abierta | Fin del flujo |

## Reglas

- Una muestra por cada rol que aparece en el flujo; si un rol no se usa, no se incluye.
- La forma de la muestra debe ser la misma que la del nodo (rombo para decisión, etc.).
- No incluir bloques de autoría, equipo ni roles de personas que el usuario no haya indicado.
