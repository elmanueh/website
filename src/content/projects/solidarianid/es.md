---
title: 'SolidarianID'
description: 'Plataforma de voluntariado para descubrir comunidades, impulsar causas y participar en acciones solidarias. Combina una aplicación web con un panel de administración y un backend de microservicios coordinados mediante eventos.'
tags:
  - 'Next.js'
  - 'NestJS'
  - 'Apache Kafka'
  - 'Microservicios'
---

## Conectar personas y causas solidarias

SolidarianID es un proyecto académico que desarrollamos en un equipo de cinco personas durante el Máster en Ingeniería del Software de la Universidad de Murcia. Parte de un caso de estudio para la asociación «Voluntarios Sin Fronteras»: crear una plataforma donde descubrir iniciativas solidarias, organizar comunidades y coordinar la participación de sus integrantes.

El reto era conectar el interés por una causa con formas concretas de colaborar. Para ello, la plataforma reúne la búsqueda de iniciativas, las propuestas de sus miembros, los objetivos que se quieren alcanzar y los eventos en los que participar. Una aplicación de administración permite revisar las propuestas y consultar la actividad del sistema.

La identidad digital da nombre al proyecto. Cada persona dispone de un identificador propio que la vincula con su perfil, las comunidades a las que pertenece y su participación en causas y acciones.

<figure>

![Pantalla de exploración de SolidarianID con búsqueda por nombre, ordenación y tarjetas de comunidades solidarias.](../../../assets/projects/solidarianid/explore.png)

<figcaption>Exploración de comunidades con búsqueda, ordenación y acceso a sus iniciativas.</figcaption>
</figure>

## De una comunidad a una acción

La actividad se organiza en tres niveles: una **comunidad** reúne a personas con intereses comunes, una **causa** plantea una iniciativa y una **acción** concreta cómo llevarla a cabo. Las causas se vinculan con los Objetivos de Desarrollo Sostenible (ODS), que también sirven para filtrar la exploración.

<ol class="case-study-flow" aria-label="Organización de una iniciativa solidaria">
  <li><strong>Comunidad</strong><span>Personas e intereses comunes</span></li>
  <li><strong>Causa</strong><span>Iniciativa vinculada a los ODS</span></li>
  <li><strong>Acción</strong><span>Proyecto concreto de colaboración</span></li>
  <li><strong>Objetivos y eventos</strong><span>Metas y actividades en las que participar</span></li>
</ol>

Por ejemplo, una comunidad dedicada a la educación puede promover una causa para mejorar el acceso al material escolar. Una de sus acciones sería organizar una recogida, con el objetivo de reunir 200 cuadernos y un evento para entregarlos. Este ejemplo ilustra cómo el modelo relaciona una intención general con una meta cuantificable y una actividad con fecha y lugar.

Desde la aplicación, una persona puede buscar iniciativas, unirse a comunidades y seguir causas. Sus favoritos reúnen esas relaciones para volver a ellas. En las acciones puede registrar aportaciones a los objetivos e inscribirse en eventos; las aportaciones se expresan como cantidades que contribuyen al avance de una meta.

<figure>

![Detalle de una acción solidaria con su descripción, el resumen de objetivos y eventos y el progreso de un objetivo de recaudación.](../../../assets/projects/solidarianid/action-detail.png)

<figcaption>Detalle de una acción con sus objetivos, eventos y el avance de las aportaciones registradas.</figcaption>
</figure>

## Proponer y revisar iniciativas

La creación de comunidades, causas y acciones pasa por un **flujo de solicitudes y aprobación**. El backend comprueba los permisos antes de admitir una propuesta; por ejemplo, proponer causas o acciones en una comunidad requiere ser su creador o administrador.

Este recorrido conecta la aplicación de usuario con el panel administrativo:

<div class="case-study-steps">

1. **Propuesta:** la persona envía una solicitud y el servicio de comunidades la guarda como pendiente.
2. **Revisión:** el servicio publica un evento en Kafka y administración incorpora la propuesta a su panel.
3. **Decisión:** un administrador acepta o rechaza la solicitud, indicando un motivo en caso de rechazo.
4. **Publicación y aviso:** la decisión vuelve mediante Kafka al servicio de comunidades, que actualiza la solicitud, crea la iniciativa si se ha aprobado y genera la notificación para el solicitante.

</div>

<figure>

![Panel administrativo de solicitudes de comunidades con sus causas propuestas, los ODS asociados y los botones para validar o rechazar.](../../../assets/projects/solidarianid/admin-requests.png)

<figcaption>Revisión de solicitudes de comunidades y sus causas antes de aprobar su publicación.</figcaption>
</figure>

La persona puede consultar el estado de sus propuestas en «Mis solicitudes». Las suscripciones GraphQL permiten recibir cambios mientras la aplicación está abierta y las notificaciones push pueden avisar a través del navegador, según sus permisos y compatibilidad.

Como cada componente procesa los eventos por separado, la decisión puede tardar un pequeño intervalo en aparecer en la aplicación. Este comportamiento responde a la **consistencia eventual**: los servicios actualizan sus datos a medida que reciben los cambios.

## Dos microservicios y una aplicación de administración

**Next.js y React resuelven la experiencia de usuario; NestJS organiza el backend.** El backend principal se divide en dos microservicios, usuarios y comunidades. Causas, acciones y eventos forman parte del servicio de comunidades. Administración reúne su backend y sus vistas web en una aplicación independiente.

<div class="case-study-table">

| Componente              | Responsabilidad                                                            |
| ----------------------- | -------------------------------------------------------------------------- |
| Aplicación de usuario   | Registro, perfil, exploración, participación y seguimiento de solicitudes. |
| Servicio de usuarios    | Identidad, autenticación, perfiles y preferencias.                         |
| Servicio de comunidades | Comunidades, causas, acciones, objetivos, eventos y solicitudes.           |
| Administración          | Revisión de propuestas, consulta de usuarios, métricas e informes.         |

</div>

Nginx actúa como pasarela de entrada: dirige las peticiones al servicio correspondiente, expone el acceso a GraphQL y permite las conexiones WebSocket. El backend se organiza en un monorepo con bibliotecas compartidas para contratos, seguridad, mensajería y conceptos de dominio.

La comunicación combina varios mecanismos según la operación. **REST y GraphQL** atienden las consultas y operaciones de la aplicación; **Kafka** distribuye eventos de negocio, como los cambios de usuario o las decisiones sobre solicitudes; y **gRPC** permite que administración consulte estadísticas al servicio de comunidades mediante un contrato tipado.

Esta distribución exige coordinar información entre aplicaciones. Por ejemplo, un cambio en el perfil se publica como evento para actualizar los datos de ese usuario que necesitan comunidades y administración.

<figure>

![Diagrama de contenedores de SolidarianID con el frontend Next.js, la pasarela Nginx, los servicios de usuarios y comunidades, la aplicación de administración y sus conexiones con Kafka, KurrentDB, PostgreSQL y MongoDB.](../../../assets/projects/solidarianid/architecture.png)

<figcaption>Diagrama de contenedores del MVP: aplicaciones, servicios, almacenamiento y comunicación mediante eventos.</figcaption>
</figure>

## Reglas de negocio y organización del backend

El backend aplica ideas de **Domain-Driven Design (DDD), arquitectura hexagonal y Clean Architecture** para separar las reglas del producto de las herramientas que las ejecutan. El dominio contiene entidades y validaciones; la capa de aplicación coordina los casos de uso; y la infraestructura conecta bases de datos, APIs y mensajería.

Una acción, por ejemplo, agrupa sus objetivos y eventos. Sus reglas permiten impedir inscripciones duplicadas, rechazar la participación en un evento ya celebrado y evitar aportaciones superiores a la cantidad pendiente de un objetivo. Los objetos de valor validan conceptos como identificadores, cantidades o fechas.

Los casos de uso trabajan con contratos de repositorio y NestJS conecta sus implementaciones mediante inyección de dependencias. Así, la lógica de participación puede expresarse sin depender directamente de TypeORM, MongoDB o Kafka. Los puntos de entrada validan los datos recibidos y las políticas de autorización comprueban la relación del usuario con el recurso.

El servicio de usuarios gestiona el acceso con contraseñas protegidas mediante bcrypt y tokens JWT enviados en cookies HttpOnly. Separa el token de acceso de las sesiones de renovación, que se almacenan en PostgreSQL con el token protegido mediante un hash y su estado de revocación. También incorpora acceso con Google mediante OAuth 2.0.

## Event Sourcing y persistencia

Una de las decisiones más características es el uso de **Event Sourcing en el servicio de usuarios**. KurrentDB conserva una secuencia de hechos por usuario, como su creación o los cambios de nombre, ubicación y preferencias. Al reproducir esos eventos en orden, el servicio reconstruye su estado.

Para buscar por nombre de usuario o teléfono, el servicio mantiene una **proyección en PostgreSQL**: un modelo de consulta que se actualiza a partir de los eventos. El proceso guarda la posición que ha procesado para poder continuar desde ella.

Esta separación entre el historial de escritura y el modelo de búsqueda aplica **CQRS** en esta parte del sistema. Kafka y KurrentDB cumplen funciones diferentes: Kafka comunica cambios entre aplicaciones y KurrentDB conserva los eventos que permiten reconstruir a los usuarios.

El resto de la persistencia se ajusta a las necesidades de cada componente:

- **PostgreSQL** almacena las relaciones entre comunidades, miembros, causas, acciones y participación, además de la proyección y las sesiones del servicio de usuarios en otra base lógica.
- **MongoDB** conserva los datos administrativos, las solicitudes y las representaciones de usuarios que utiliza el panel.
- **IndexedDB**, mediante Dexie, mantiene las notificaciones locales en el navegador.

Cada aplicación consulta los datos que necesita para sus operaciones habituales. Mantener esas representaciones sincronizadas mediante eventos introduce retos de recuperación ante fallos y tratamiento de mensajes repetidos.

## Una experiencia web con capacidades PWA

La aplicación de usuario utiliza **Next.js, React y TypeScript**, con App Router para organizar las páginas públicas, la autenticación y las pantallas de la aplicación. Combina componentes de servidor para preparar contenido y componentes de cliente para formularios e interacción.

Tailwind CSS y los componentes basados en shadcn/ui y Base UI dan continuidad a la interfaz. React Hook Form y Zod gestionan los formularios y sus validaciones. Tras registrarse, la persona puede completar preferencias como los ODS y las categorías de causas que le interesan.

Redux Toolkit mantiene el estado de autenticación, Apollo Client gestiona GraphQL, su caché y las suscripciones, y Axios centraliza las llamadas REST y la recuperación de sesión. Las integraciones se agrupan por funcionalidad para compartir el acceso a datos y el comportamiento entre pantallas.

El manifiesto y el service worker, gestionado con Serwist, permiten instalar la web como **PWA** en navegadores compatibles. La aplicación incluye estrategias de caché, una página de respaldo para la navegación sin conexión y recepción de notificaciones push. Las operaciones como enviar solicitudes o registrar aportaciones requieren conexión con el backend.

## Administración, métricas e informes

El panel administrativo utiliza **NestJS con vistas Handlebars** generadas en el servidor y sesiones HTTP para identificar a los administradores. Desde él se revisan las propuestas de comunidades, causas y acciones y se consulta la información de los usuarios.

El dashboard reúne totales de usuarios e iniciativas aprobadas, causas por ODS, distribución de usuarios por país y estadísticas de comunidades e incorporación de miembros. Chart.js representa los gráficos con información procedente de MongoDB y de consultas gRPC al servicio de comunidades.

<figure>

![Dashboard de administración con recuentos de comunidades, usuarios, causas y acciones, y gráficos de comunidades, nacionalidades, ODS e incorporaciones mensuales.](../../../assets/projects/solidarianid/admin-dashboard.png)

<figcaption>Indicadores y gráficos de actividad del panel administrativo con datos de demostración.</figcaption>
</figure>

La generación de informes con PDFKit permite obtener documentos de usuario con sus datos personales, ubicación y comunidades asociadas.

## Pruebas y automatización

El proyecto aborda la calidad en varios niveles: **Jest** para servicios y reglas de negocio, **Supertest** para endpoints y **Testcontainers** para pruebas de integración con dependencias reales en contenedores temporales. Entre estas últimas se incluye la comunicación entre usuarios y comunidades mediante Kafka.

Administración incorpora escenarios de interfaz con Cypress. La configuración de Stryker aplica pruebas de mutación a una selección del modelo y servicio de usuarios y a objetos de valor: introduce cambios en el código para comprobar si las pruebas detectan comportamientos incorrectos.

GitHub Actions define flujos de integración continua para frontend y backend con comprobaciones de formato, lint y compilación. El backend añade pruebas con cobertura y análisis en SonarQube; el frontend incluye comprobación de tipos.

Docker Compose describe el entorno local con las bases de datos, Kafka, Nginx y las aplicaciones del backend. El repositorio también incluye un flujo manual de despliegue con Docker Hub y AWS CloudFormation, EC2 y Systems Manager. La plantilla de infraestructura requiere actualizarse para incluir KurrentDB y el frontend como servicio y cubrir la composición actual completa.

El trabajo en equipo nos permitió conectar decisiones de modelado, interfaz, datos y automatización sobre un mismo producto. El flujo de una propuesta resume esa experiencia: empieza en un formulario, atraviesa permisos y reglas de negocio, llega a otra aplicación y vuelve al usuario mediante eventos y notificaciones.

## Tecnologías y librerías

<div class="case-study-table">

| Tecnología                                             | Uso en el proyecto                                                                |
| ------------------------------------------------------ | --------------------------------------------------------------------------------- |
| **TypeScript y Node.js**                               | Lenguaje compartido y entorno de ejecución de las aplicaciones.                   |
| **Next.js y React**                                    | Navegación, renderizado e interacción en la aplicación de usuario.                |
| **NestJS y Handlebars**                                | Servicios del backend y vistas del panel administrativo.                          |
| **Tailwind CSS, shadcn/ui y Base UI**                  | Estilos adaptables y componentes de interfaz.                                     |
| **React Hook Form y Zod**                              | Gestión y validación de formularios.                                              |
| **Redux Toolkit, Apollo Client y Axios**               | Estado de autenticación, operaciones GraphQL y llamadas REST.                     |
| **Apache Kafka y gRPC**                                | Eventos entre aplicaciones y consultas internas con contratos tipados.            |
| **PostgreSQL, MongoDB y KurrentDB**                    | Datos relacionales, documentos administrativos e historial de eventos de usuario. |
| **TypeORM y Mongoose**                                 | Acceso a datos y adaptación de los repositorios al almacenamiento.                |
| **Serwist, Web Push y Dexie**                          | Capacidades PWA, notificaciones y almacenamiento local.                           |
| **Chart.js y PDFKit**                                  | Gráficos del panel y generación de informes de usuario.                           |
| **Jest, Supertest, Testcontainers, Cypress y Stryker** | Pruebas de negocio, API, integración, interfaz y mutación.                        |
| **GitHub Actions y SonarQube**                         | Automatización de validaciones y análisis de calidad.                             |
| **Docker Compose y Nginx**                             | Entorno de ejecución local y pasarela de entrada.                                 |
| **AWS CloudFormation, EC2 y Systems Manager**          | Definición de infraestructura y automatización del despliegue.                    |

</div>
