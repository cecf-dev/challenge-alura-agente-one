# Guía de Estándares de Traducción — MangaTech AI

## 1. Principios de Traducción

### 1.1 Filosofía
La traducción en MangaTech AI sigue el principio de **"fidelidad dinámica"**: mantener el significado y la intención original del autor mientras se adapta el texto para que suene natural en español latinoamericano.

### 1.2 Idioma Objetivo
- **Variante principal**: Español latinoamericano neutro
- **Evitar**: Regionalismos extremos de un solo país
- **Tú vs. Usted**: Usar "tú" para personajes jóvenes/cercanos, "usted" para situaciones formales
- **Pronombres**: Respetar los pronombres de personajes no binarios del original

## 2. Tratamiento de Elementos Culturales

### 2.1 Onomatopeyas
Las onomatopeyas japonesas (擬音語/擬態語) se manejan así:
- **Sonidos de acción** (ドン, バン): Traducir al equivalente en español (¡BOM!, ¡BANG!)
- **Onomatopeyas ambientales** (ザーザー, シーン): Mantener en japonés con nota al pie la primera vez
- **Efectos emocionales** (ドキドキ): Adaptar al contexto (¡TUM TUM! para latidos)

### 2.2 Honoríficos Japoneses
| Honorífico | Tratamiento |
|:---|:---|
| -san | Omitir o usar "señor/señora" según contexto |
| -kun | Omitir, mantener tono informal |
| -chan | Omitir, usar diminutivos si aplica |
| -sama | Traducir como "señor/señora" o "maestro/maestra" |
| -sensei | Mantener como "sensei" o traducir como "maestro/profesor" |
| -senpai | Mantener como "senpai" (término ya conocido por la audiencia) |

### 2.3 Comida y Objetos Culturales
- **Comida conocida**: Traducir (例: ラーメン → ramen, 寿司 → sushi)
- **Comida poco conocida**: Mantener nombre original con breve descripción entre paréntesis
- **Objetos culturales**: Mantener y agregar nota la primera vez (例: 浴衣 → yukata)

## 3. Estilo y Formato

### 3.1 Globos de Texto
- **Tamaño de fuente**: Máximo 2 líneas por globo; si el texto es largo, reducir tamaño de fuente proporcionalmente.
- **Fuente estándar**: Wild Words para diálogos, Badaboom para gritos/efectos
- **Alineación**: Centrado horizontal y vertical dentro del globo

### 3.2 Convenciones Tipográficas
- **Pensamientos**: En cursiva (*"Esto no puede ser verdad..."*)
- **Gritos**: En MAYÚSCULAS y negrita (**¡CUIDADO!**)
- **Susurros**: En tamaño menor con fuente cursiva
- **Narración**: En recuadros con fondo semitransparente

### 3.3 Longitud del Texto
- El texto traducido no debe exceder el 120% de la longitud del original.
- Si es necesario, reformular para acortar sin perder significado.
- Priorizar la legibilidad sobre la literalidad.

## 4. Control de Calidad

### 4.1 Checklist de QA
Antes de marcar un capítulo como completo, verificar:
- [ ] Coherencia de nombres de personajes en toda la serie
- [ ] Correcta ortografía y gramática
- [ ] Los globos no tienen texto cortado o desbordado
- [ ] Las onomatopeyas mantienen el estilo visual del original
- [ ] No hay páginas faltantes o desordenadas
- [ ] El texto es legible en pantallas móviles

### 4.2 Niveles de Revisión
1. **Revisión automática**: MangaLLM verifica coherencia y gramática
2. **Revisión de traductor**: El traductor asignado revisa la traducción de IA
3. **Revisión de editor**: Un editor senior hace la revisión final
4. **QA visual**: El equipo de diseño verifica la integración visual

## 5. Glosario de Términos Frecuentes

| Término Japonés | Traducción Estándar | Notas |
|:---|:---|:---|
| 漫画 (manga) | manga | No traducir |
| 少年 (shōnen) | shōnen | Género: público joven masculino |
| 少女 (shōjo) | shōjo | Género: público joven femenino |
| 青年 (seinen) | seinen | Género: público adulto masculino |
| 女性 (josei) | josei | Género: público adulto femenino |
| 忍者 (ninja) | ninja | No traducir |
| 侍 (samurai) | samurái | Usar con acento |
| 気 (ki/chi) | ki | Energía vital |
| 術 (jutsu) | jutsu | Técnica (en contexto de artes marciales) |
