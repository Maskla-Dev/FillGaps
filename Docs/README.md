# Contenido

1. [FillGaps](#fillgaps)
2. [Contenido](#contenido)
3. [Alcance](#alcance)
4. [Arquitectura](#arquitectura)
5. [Mapa de características](#mapa-de-caracteristicas)

# FillGaps

FillGaps es un solución integral destinada a asegurar la dirección administrativa de los asuntos adyacentes a las
actividades propias específicas de preservación, colección,
interpretación, investigación, difusión y exhibición históricas, culturales y de identidad que son patrimonio material e
inmaterial al servicio de la sociedad de un Museo.
FillGaps es el sistema de software que necesita un Museo para la gestión administrativa y datos de su personal.

# Alcance

Con FillGaps puede tener el registro de personas que laboran en un Museo, lo cual permite su identificación por medio de
un sistema de cómputo. Además FillGaps permite integrar un Repositorio de Datos e Información de la
cual puede seleccionar aquella que desea para configurar y publicar en el Sitio Oficial del Museo, como Historia del
Museo, investigación y educación, información de visitas y grupos, salas, aulas, auditorios, tienda de recuerdos y
regalos,
horarios de servicios, información sobre boletos de acceso, ubicación del Museo, recomendaciones y medidas de seguridad
y protección de nuestro personal y visitantes, plano del museo, directorio, datos de contacto.

La plantilla de empleados que trabajan en un museo es multidisciplinar: curadores, restauradores, catalogadores, guías,
personal administrativo y de vigilancia.
FillGaps, le permite almacenar, agregar, recuperar, buscar o en su caso eliminar, información del personal que labora en
el museo, desde sus datos personales hasta sus datos biométricos e imágenes que pueden ser empleados con fines
particulares.

# Arquitectura

FillGaps sigue una arquitectura basada en servicios, de esta manera se dota al sistema de resiliencia a fallos y a
actividades de mantenimiento o escalabilidad. La principal motivación de esta arquitectura es la independencia de las
actividades del museo, por ejemplo, los curadores y restauradores no requieren conocer que sucede en el área
administrativa para realizar sus actividades, y por ende, las necesidades de disponibilidad del sistema para ambas áreas
son diferentes. De este
modo, el sistema puede expandirse casi al mismo ritmo que la expansión del museo.

Los servicios son divididos en dominios, cada dominio cuenta con conjunto de
características ([ver mapa de características](#mapa-de-caracteristicas)) que atienden.

| Dominio                       | Descripción                                                                |
|-------------------------------|----------------------------------------------------------------------------|
| [Comunicación](#comunicacion) | Servicios que permiten la comunicación entre empleados.                    |
| [Operatividad](#operatividad) | Servicios asociados a las tareas operativas del museo.                     |
| Preservación                  | Servicios asociados a las tareas de preservación.                          |
| Vigilancia                    | Servicios asociados a las tareas de vigilancia.                            |
| Difusión                      | Servicios asociados a las tareas de difusión.                              |
| Administración                | Servicios asociados a las tareas administrativas de personal.              |
| Investigación                 | Servicios asociados a las tareas de investigación.                         |
| Colección                     | Servicios asociados a las tareas relacionadas a la manipulación del museo. |
| Ventas                        | Servicios asociados a las tareas de venta de productos.                    |
| Mantenimiento                 | Servicios asociados a las tareas de mantenimiento.                         |
| Presentación                  | Servicio que permite la presentación del museo al público (sitio web).     |
| Gestión                       | Servicios asociados a las tareas de gestión de personal.                   |

## Comunicacion

El dominio de comunicación se encarga de proveer los servicios necesarios para la comunicación entre empleados. Este
dominio satisface los siguientes apartados:

- [Chat](#chat)
- [Planificación](#planificador-y-solicitud-de-tareas)

### Chat

El chat permite la comunicación fluida entre empleados, ya sea de manera personal o en grupos. Implementa
comunicación entre cliente-servidor de baja latencia y alta disponibilidad,
además de la posibilidad de activar mecanismos de notificación. Cualquier empleado del museo utiliza este servicio, solo
algunas funcionalidades están restringidas a los encargados. La información en los chats es persistente, por lo que la
eliminación total de un canal y su contenido, cuando esta
acción ocurre, en realidad se archiva la información. Por lo que es necesario proveer herramientas para la recuperación
de la información. El análisis de flujo de datos en el chat de manera global también es importante.

| Código | Requisito                                          | Descripción                                                                                                                                                                                                                               | UT   |
|--------|----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------|
| C001   | **Gestión de canales de comunicación**             | Se requieren canales para cada sección del museo y uno general. Así mismo, es posible crear otros canales para grupos de trabajo o actividades específicas, estos canales pueden ser eliminados comodificados (en metadatos).             | 3064 |
| C002   | **Envío de mensajes**                              | Cualquier empleado puede comunicarse con otro, basta con seleccionar un empleado que esté laborando en el museo y enviar un mensaje con alguno de los siguientes contenidos: <del>voz</del>, <del>video</del>, texto, imágenes y archivos | 3040 |
| C003   | **Estadísticas de uso de chat**                    | El encargado de sistemas informáticos puede obtener estadísticas del uso del servicio de chat. A través de opciones de filtrado se pueden visualizar la información y gráficos.                                                           |      |
| C004   | **Visualización y recuperación de chat archivado** | El encargado de sistemas informáticos puede recuperar la información archivada                                                                                                                                                            |      |

### Planificador de actividades, evaluaciones y recepción de reportes

Permite que la coordinación entre empleados sea fluida, ayudando a liberar la carga del chat al ser más directo y
especifico en la comunicación.

| Código | Requisito                                                       | Descripción                                                                                                                                                                       | UTs |
|--------|-----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| C005   | **Solicitud de tareas**                                         | Cualquier encargado planifica tareas con sus empleados, desde tareas específicas del cargo hasta capacitaciones.                                                                  |     |
| C006   | **Reporte de tareas**                                           | El empleado atiende las tareas planificadas por los encargados y genera un reporte                                                                                                |
| C007   | **Creador peticiones**                                          | De la misma forma que un encargado puede realizar tareas, entre encargados del área pueden crear peticiones de actividades a realizar.                                            |     |
| C008   | **Reportes del patrimonio cultural**                            | Cualquier empleado puede reportar anomalias del patrimonio cultural del recinto                                                                                                   |     |
| C009   | **Estadísticas e histórico de tareas generadas**                | Los encargados pueden visualizar actividades realizadas en el pasado y obtener estadísticas con facilidades de filtrado                                                           |     |
| C010   | **Estadísticas e hitórico de reportes del patrimonio cultural** | El encargado de los conservadores y restauradores pueden visualiza actividades reportes realizados en el pasado y obtener estadísticas en base a ello con facilidades de filtrado |     |
| C011   | **Evaluaciones del personal**                                   | Cualquier encargado puede generar evaluaciones del personal de su área y calificarlo. En este sentido, el empleado atiende la evaluación.                                         |     |
| C012   | **Estadísticas e histórico de evaluaciones**                    | El encargado puede visualizar las evaluaciones del pasado y obtener estadísticas con facilidades de filtrado                                                                      |     |

## Operatividad

El dominio de la operatividad engloba actividades relacionadas a la disponibilidad del museo y la calidad de servicio.
En su mayoría involucra solo al personal operativo y taquillas, aunque la coordinación con otros encargados es
necesaria. Este dominio satisface los siguientes apartados:

- Rotación empleados
- Disponibilidad del museo
- Ventas
- 

# Mapa de caracteristicas

El mapa de características es el recurso utilizado para abstraer las necesidades del sistema según los actores que hacen
uso de él.

![Mapa de características](Support%20images/mapa_caracteristicas.png)