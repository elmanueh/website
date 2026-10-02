---
title: 'Cloud Platform'
description: 'Plataforma personal de infraestructura que sigue principios de GitOps para alojar, publicar y actualizar aplicaciones desde una configuración versionada, reproducible y automatizable, independiente del proveedor cloud.'
tags:
  - 'Ansible'
  - 'Docker'
  - 'Nginx'
  - 'Certbot'
---

## Infraestructura reproducible

Cloud Platform nace de una necesidad concreta: poder cambiar de servidor, formatearlo o recuperarme de un problema y volver a desplegar mis servicios desde una configuración conocida. Quiero que la infraestructura sea algo que puedo reconstruir y entender, sin depender de recordar cada ajuste que hice en una máquina.

GitOps es una metodología que combina un estado declarativo, Git como fuente central de verdad y la sincronización automática de la infraestructura con lo definido en el repositorio. La arquitectura intenta seguir estos principios: la configuración queda versionada y los cambios activan su aplicación automatizada con Ansible. Git permite revisar los cambios, conservar su historial y recuperar configuraciones anteriores. Ansible convierte esas definiciones en un proceso reproducible para preparar un servidor y desplegar los servicios.

La plataforma separa la configuración de los servicios del proveedor que aloja la infraestructura. Puede trasladarse entre entornos compatibles sin vincular el proyecto a un proveedor cloud concreto. Cada aplicación conserva su propia configuración, mientras la plataforma resuelve las tareas compartidas de ejecución, publicación y gestión de certificados.

## Arquitectura

La arquitectura tiene dos recorridos: el que permite desplegar cambios y el que sigue una visita a la web. Separarlos ayuda a entender qué responsabilidad tiene cada herramienta.

- **GitHub Actions** inicia la automatización y comprueba la configuración antes del despliegue.
- **Ansible** conecta al servidor mediante Secure Shell (SSH) y aplica el estado definido en el repositorio.
- **Docker** ejecuta las aplicaciones en contenedores.
- **Docker Compose** describe las imágenes, redes y servicios de cada aplicación.
- **Nginx** recibe las visitas y las dirige a la aplicación correspondiente según el dominio.
- **Certbot e IONOS** permiten obtener y renovar los certificados que utiliza Nginx para ofrecer HTTPS.

![Arquitectura de Cloud Platform: GitHub Actions ejecuta Ansible por SSH, el servidor aloja aplicaciones Docker detrás de Nginx y Certbot gestiona certificados mediante IONOS](../../../assets/projects/cloud-platform-banner.png)

Una imagen de contenedor es el paquete con el que se distribuye una aplicación. Cloud Platform descarga imágenes ya publicadas en GitHub Container Registry (GHCR). La construcción del código pertenece al repositorio de cada aplicación. Esta separación permite actualizar un servicio sin mezclar su desarrollo con la configuración de la infraestructura.

## Recorrido de una petición

<ol class="case-study-flow" aria-label="Recorrido de una petición">
  <li><strong>Visitante</strong><span>Petición HTTPS</span></li>
  <li><strong>Nginx</strong><span>Certificado y dominio</span></li>
  <li><strong>Red Docker</strong><span>Comunicación interna</span></li>
  <li><strong>Aplicación</strong><span>Respuesta del servicio</span></li>
</ol>

El sistema de nombres de dominio (DNS) dirige el dominio al servidor. Allí, Nginx recibe las peticiones y redirige el tráfico de HTTP a HTTPS, estableciendo una conexión cifrada con el visitante mediante el certificado del dominio.

Después envía la petición al contenedor correspondiente a través de una red interna de Docker. La aplicación recibe el tráfico a través del proxy, sin necesidad de exponer directamente su puerto al exterior. Así, la publicación de los servicios y la gestión de sus certificados quedan centralizadas.

## Despliegue declarativo

El repositorio describe el **estado deseado**: qué aplicaciones deben ejecutarse y con qué configuración. Los cambios en la configuración de la plataforma activan un despliegue automatizado.

Ansible comprueba la compatibilidad del servidor y organiza el despliegue en cuatro etapas:

<div class="case-study-steps">

1. **Docker:** instala las herramientas de contenedores y prepara las redes necesarias.
2. **Certificados:** configura Certbot y solicita los certificados necesarios para los dominios.
3. **Aplicaciones:** descubre sus definiciones, descarga las imágenes y aplica cada proyecto de Docker Compose.
4. **Nginx:** genera las configuraciones por dominio, comprueba su validez y activa el proxy compartido.

</div>

El orden resuelve dependencias: las aplicaciones necesitan el entorno de contenedores y Nginx necesita los certificados y la configuración de los servicios que va a publicar.

Este enfoque toma Git como referencia para los despliegues. Ansible reaplica la configuración declarada en cada ejecución, aunque el servidor no observa el repositorio continuamente. Los cambios manuales se corrigen en el siguiente despliegue en la medida en que estén cubiertos por la automatización.

## Control de versiones

Las imágenes de las aplicaciones combinan una versión legible con un digest calculado mediante SHA-256. La referencia tiene una forma como `aplicacion:v1.2.3@sha256:…`: la etiqueta comunica la versión y el digest identifica el contenido solicitado.

Esto permite revisar una actualización en Git y saber qué imagen se quiere ejecutar, incluso si una etiqueta del registro cambia posteriormente. Para volver a una versión anterior, puedo restaurar su referencia y desplegar de nuevo, siempre que esa imagen siga disponible.

- **Versión (`v1.2.3`):** identifica la versión publicada para quien revisa el cambio.
- **Digest (`sha256:…`):** identifica el contenido que Docker debe descargar.

La fijación por digest permite identificar con precisión las imágenes de las aplicaciones. La reproducción del entorno completo también depende de las versiones de las herramientas y los paquetes que lo componen.

## Certificados HTTPS

Para ofrecer HTTPS, el servidor necesita un certificado que demuestre su identidad para el dominio. Certbot lo solicita mediante el protocolo Automatic Certificate Management Environment (ACME) y utiliza la API DNS de IONOS para demostrar el control de ese dominio.

La validación mediante DNS permite obtener los certificados de los dominios antes de arrancar Nginx. Publicar un servicio sigue requiriendo su registro DNS y su configuración en el proxy.

La automatización solicita los certificados necesarios y habilita su renovación periódica, de forma independiente de los despliegues de aplicaciones. Certbot gestiona los certificados y el proxy los utiliza en modo de solo lectura. Una recarga permite que Nginx utilice los certificados renovados.

La gestión de certificados también requiere coordinar los cambios de cobertura: añadir dominios a la configuración debe acompañarse de la emisión o actualización del certificado correspondiente.

## Incorporar aplicaciones

Cada aplicación reúne su manifiesto, su definición de Docker Compose y, cuando necesita acceso público, una plantilla de Nginx. Ansible descubre esas definiciones en el repositorio, sin que tenga que añadir cada proyecto a una lista central de tareas.

<div class="case-study-table">

| Configuración                | Responsabilidad                                          |
| ---------------------------- | -------------------------------------------------------- |
| Manifiesto de la aplicación  | Describe cómo se integra la aplicación en la plataforma. |
| Definición de Docker Compose | Define el entorno de ejecución de la aplicación.         |
| Plantilla de Nginx           | Configura el acceso público al servicio.                 |

</div>

Esta estructura separa la configuración de cada proyecto de las tareas comunes de la plataforma. Una aplicación puede desplegar servicios internos sin generar una ruta pública en Nginx.

Cada proyecto de Docker Compose puede agrupar varios servicios. Si una aplicación necesita una base de datos, puede definir una red propia para ella y conectar al proxy el servicio que atiende las peticiones.
