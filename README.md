# Servicio de Impresión 3D — IES Canarias Cabrera Pinto

Sistema interno de gestión de solicitudes de impresión 3D desarrollado y mantenido por alumnos voluntarios del IES Canarias Cabrera Pinto.

El objetivo del proyecto es ofrecer a alumnos y profesores una forma sencilla y organizada de solicitar impresiones 3D utilizando las impresoras disponibles en el centro.

---

# Índice

- [Descripción](#descripción)
- [Objetivos](#objetivos)
- [Arquitectura](#arquitectura)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Infraestructura](#infraestructura)
- [Funcionamiento](#funcionamiento)
- [Google Forms](#google-forms)
- [Google Sheets](#google-sheets)
- [Dashboard](#dashboard)
- [Apps Script](#apps-script)
- [Triggers](#triggers)
- [Normas internas](#normas-internas)
- [Marketing y difusión](#marketing-y-difusión)
- [Posibles mejoras futuras](#posibles-mejoras-futuras)
- [Guía para futuros voluntarios](#guía-para-futuros-voluntarios)
- [Backup](#backup)
- [Créditos](#créditos)
- [Nota final](#nota-final)

---

# Descripción

Este proyecto permite gestionar solicitudes de impresión 3D mediante:

- Google Forms
- Google Sheets
- Google Apps Script

El sistema:

- recibe solicitudes
- almacena información
- genera IDs automáticos
- manda correos automáticos
- organiza estados
- permite gestionar impresiones manualmente

---

# Objetivos

## Objetivos técnicos

- Facilitar solicitudes de impresión 3D
- Centralizar la gestión de pedidos
- Automatizar procesos básicos
- Mantener un sistema simple y robusto

---

## Objetivos educativos

- Aprender automatización
- Aprender gestión de proyectos
- Aprender mantenimiento de sistemas
- Aprender trabajo colaborativo
- Promover fabricación digital en el centro

---

# Arquitectura

```text
Google Forms
↓
Google Sheets
↓
Apps Script
↓
Emails automáticos
↓
Gestión manual de impresión
```

---

# Tecnologías utilizadas

| Herramienta | Uso |
|---|---|
| Google Forms | Formularios |
| Google Sheets | Base de datos |
| Google Apps Script | Automatización |
| GitHub | Versionado y documentación |
| Canva | Carteles y marketing |
| Impresoras 3D | Producción |

---

# Infraestructura

## Impresoras disponibles

Actualmente:

- Prusa
- Ender
- Otra impresora adicional

> Actualizar esta sección si cambia el hardware.

---

# Funcionamiento

## 1. Solicitud

El usuario rellena el formulario con:

- nombre
- curso
- proyecto
- material
- color
- archivo STL/OBJ/3MF

---

## 2. Registro automático

Google Forms añade automáticamente la respuesta a:

```text
Respuestas de formulario 1
```

---

## 3. ID automático

Google Sheets genera automáticamente IDs:

```text
3D-001
3D-002
3D-003
```

mediante:

```excel
=ARRAYFORMULA(SI(D3:D="";"";"3D-"&TEXTO(FILA(D3:D)-2;"000")))
```

---

## 4. Correo automático

Apps Script manda automáticamente:

- confirmación de recepción
- aviso de impresión lista

---

## 5. Revisión manual

Los voluntarios:

- revisan modelos
- hacen slicing
- estiman costes
- preparan impresión

---

## 6. Impresión

La impresión se realiza manualmente.

---

## 7. Entrega

Cuando el estado cambia a:

```text
Listo
```

Apps Script puede enviar automáticamente:

```text
Tu impresión está lista.
```

---

# Google Forms

## El formulario incluye

- datos personales
- subida de archivos
- material
- color
- tamaño
- observaciones

---

## Recomendaciones

- Mantener preguntas claras
- Mantener el formulario simple
- No añadir demasiados campos innecesarios

---

# Google Sheets

## Hoja principal

```text
Respuestas de formulario 1
```

⚠️ IMPORTANTE:

Esta hoja actúa como:

- base de datos
- sistema de tickets
- backend

NO modificar fórmulas automáticas sin entenderlas.

---

# Dashboard

## Hoja

```text
DASHBOARD
```

Usada para:

- métricas
- visualización
- seguimiento

---

# Métricas recomendadas

| Métrica | Fórmula |
|---|---|
| Total pedidos | `=CONTARA('Respuestas de formulario 1'!B3:B)` |
| Pendientes | `=CONTAR.SI(C:C;"Pendiente")` |
| Imprimiendo | `=CONTAR.SI(C:C;"Imprimiendo")` |
| Listos | `=CONTAR.SI(C:C;"Listo")` |

---

# Apps Script

## Archivos recomendados

### `confirmationEmails.gs`

Correo automático:

```text
Solicitud recibida
```

---

### `readyEmails.gs`

Correo automático:

```text
Tu impresión está lista
```

---

### `utils.gs`

Funciones auxiliares.

---

### `config.gs`

Variables globales:

```javascript
const SPREADSHEET_ID = "XXXX";
```

---

# Triggers

Configurados desde:

```text
Apps Script → Activadores
```

---

# Triggers recomendados

## Confirmación automática

Evento:

```text
Al enviar formulario
```

---

## Correos de recogida

Evento:

```text
Cada 5 minutos
```

---

# Organización recomendada

## Mantener separado

### RAW DATA

```text
Respuestas de formulario 1
```

### DASHBOARD

```text
DASHBOARD
```

---

# Normas internas

## Recomendaciones de impresión

- Máximo recomendado: 250g
- Tiempo máximo recomendado: 15h
- Material estándar: PLA

---

## Costes

Actualmente:

- 1€ mínimo por impresión
- + coste por gramo (actualmente 0.03€/gramo)

Objetivo:

- cubrir filamento
- mantenimiento
- reparaciones

NO es generar beneficio.

---

# Marketing y difusión

## Métodos actuales

- carteles físicos
- pantalla de entrada
- demostraciones

---

## Recomendaciones

El mejor marketing suele ser:

- piezas físicas visibles
- alumnos mostrando proyectos
- impresoras funcionando

---

# Posibles mejoras futuras

- Dashboard avanzado
- Integración Discord/Teams
- Sistema de cuotas
- Estadísticas automáticas
- Página web institucional
- Gestión de inventario
- Reserva de impresoras

---

# Guía para futuros voluntarios

## IMPORTANTE

Mantener el sistema SIMPLE.

NO añadir:

- automatizaciones innecesarias
- demasiados estados
- complejidad excesiva

---

## Prioridades reales

- fiabilidad
- claridad
- mantenimiento fácil
- documentación

---

## Antes de modificar algo

Comprobar:

- Apps Script
- triggers
- fórmulas
- dependencias

---

## NO hacer

- borrar columnas usadas por scripts
- modificar nombres de columnas
- eliminar fórmulas automáticas
- romper validaciones

---

# Backup

Recomendado:

- exportar Sheets periódicamente
- guardar Apps Script en GitHub

---

# Créditos

Proyecto desarrollado y mantenido por alumnos voluntarios del:

# IES Canarias Cabrera Pinto
# @p0us3nt

---

# Nota final

Si estás leyendo esto en el futuro:

Por favor:

- documenta cambios
- ayuda a los nuevos voluntarios
- y mantén el proyecto vivo 😄

---

