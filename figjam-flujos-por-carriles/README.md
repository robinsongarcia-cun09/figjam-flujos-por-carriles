# figjam-flujos-por-carriles

Skill para que un agente de IA construya o actualice **flujos de proceso en FigJam** con la misma estructura, colores y convenciones: fases en columnas, carriles por actor, fila de pantallazos, conectores con estilo por tipo y una sección de convenciones.

Nació al actualizar un flujo de compras y proveedores de Odoo a partir de un manual de usuario, tomando como referencia el estilo de otro tablero. Todo lo aprendido (paleta, medidas, fórmulas para que el texto quepa, errores comunes) quedó documentado aquí para repetirlo sin empezar de cero.

## Qué hace

Dado un tablero FigJam original, un documento con los cambios y un tablero de referencia de estilo, el agente:

1. Lee el tablero original y el de referencia.
2. Crea una **sección nueva** (el original no se toca) con título, fases, carriles y pantallazos clonados.
3. Crea los nodos por rol (inicio, paso, decisión, botón, automático, alerta, nota…) con el texto ajustado al tamaño.
4. Conecta los nodos por nombre con flechas de estilo según su tipo.
5. Genera bloques adicionales y la sección **CONVENCIONES**.
6. Verifica visualmente y corrige.

## Requisitos

- Un agente de IA con acceso al **Figma MCP** (herramientas `create_session`, `use_figma`, `get_figjam`, `get_screenshot`).
- Los skills oficiales de Figma `figma-use` y `figma-use-figjam` (o su equivalente servido por el MCP).
- Un tablero FigJam donde el usuario tenga permiso de edición.

Sin el Figma MCP el archivo sirve como especificación de diseño, pero la IA no podrá dibujar el tablero.

## Instalación

### Claude Code

```bash
git clone https://github.com/<tu-usuario>/figjam-flujos-por-carriles.git
mkdir -p ~/.claude/skills
cp -r figjam-flujos-por-carriles/skills/figjam-flujos-por-carriles ~/.claude/skills/
```

Para un solo proyecto, copia la carpeta a `.claude/skills/` dentro del repositorio del proyecto.

### Claude (claude.ai)

Comprime la carpeta `skills/figjam-flujos-por-carriles` en un `.zip` y súbela en *Configuración > Capacidades > Skills*.

### Otras IA (ChatGPT, Gemini, etc.)

Pega el contenido de `skills/figjam-flujos-por-carriles/SKILL.md` como instrucciones del sistema o del proyecto, o adjúntalo al inicio de la conversación. Si el agente tiene el Figma MCP conectado, funciona igual.

## Uso

Ejemplo de petición:

> Actualiza este flujo `<URL del tablero>`: integra las partes moradas según `<manual>`. Toma los colores y las segmentaciones de `<URL de referencia>` y genera las convenciones.

Hay más ejemplos en [`examples/prompts.md`](examples/prompts.md).

## Estructura del repositorio

```
.
├── README.md
├── LICENSE
├── CHANGELOG.md
├── skills/
│   └── figjam-flujos-por-carriles/
│       └── SKILL.md            # la skill (instrucciones para la IA)
├── docs/
│   ├── flujo-de-trabajo.md     # paso a paso detallado
│   ├── paleta.md               # colores por rol y por tipo de flecha
│   ├── geometria.md            # columnas, carriles y posiciones
│   ├── ajuste-de-texto.md      # fórmulas calibradas para evitar truncamiento
│   ├── convenciones.md         # cómo se arma la sección de convenciones
│   └── solucion-de-problemas.md
└── examples/
    ├── prompts.md              # ejemplos de peticiones
    └── helpers.js              # funciones de referencia para use_figma
```

## Documentación

| Documento | Contenido |
|---|---|
| [flujo-de-trabajo](docs/flujo-de-trabajo.md) | Orden de los scripts y de la verificación |
| [paleta](docs/paleta.md) | Colores de nodos, encabezados y conectores |
| [geometria](docs/geometria.md) | Medidas de columnas, carriles y pantallazos |
| [ajuste-de-texto](docs/ajuste-de-texto.md) | Cómo calcular el tamaño de cada nodo |
| [convenciones](docs/convenciones.md) | Estructura de la leyenda |
| [solucion-de-problemas](docs/solucion-de-problemas.md) | Errores conocidos y su arreglo |

## Personalización

La paleta y las medidas provienen de un tablero de referencia concreto. Para otro estilo, cambia los valores de `docs/paleta.md` y de la sección 2 de `SKILL.md`; el resto del método no cambia.

## Licencia

MIT. Consulta [LICENSE](LICENSE).
