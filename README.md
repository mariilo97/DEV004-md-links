# Markdown Links

## Índice

* [1. Resumen](#1-Resumen)
* [2. Como instalarlo](#2-Como-instalarlo)
* [3. Como utilizarlo](#3-Como-utilizarlo)
* [4. Apoyo personal](#4-Apoyo-personal)

***

## 1. Resumen

Markdown Links, proyecto totalmente pensado para que el usuario pueda hacer una revision valida de los enlaces de sus archivos MD, esto con la intención de conocer a través de la estadistica de los mismos la cantidad de links que emiten alguna especie de falla o que definitivamente se encuentran en buen estado. 

Este programa escrito con vanilla JavaScript y utilizando la aplicación Node.js. 

## 2. Como instalarlo

+++++++++++++++++++++++

## 3. Como utilizarlo 

API

La funcion mdLinksMl que le da vida a la Api contienes las siguientes opciones. 

validate:false
Nos entregara el arreglo de tres objetos = link: URL encontrada.
                                           text: Texto que aparecía dentro del link ().
                                           href: Ruta del archivo donde se encontró el link.

validate:true
Nos entregará el arreglo de cinco objetos = link: URL encontrada.
                                            text: Texto que aparecía dentro del link ().
                                            href: Ruta del archivo donde se encontró el link.
                                            status: Código de respuesta HTTP.
                                            statusText: Mensaje 'Fail 😒' en caso de rechazo, Mesaje 'OK👍' en caso de éxito.

CLI

Compuesta por su parametros 
Route: Ruta absoluta o Ruta relativa y convertida en absoluta. 
Option: --validate = modulo que crea la peticion HTTP y valida que sea un links funcional. 
        --stats = arroja la estadistica básica del links, *Total y *Unique
        --validate --stats = arroja estadisticas y validación, *Total, *Unique y *Broken.

## 4. Apoyo personal

Creamos el diagrama de flujo con la intencion de guiarnos en todo momento para la realización completa de este proyecto. 

*Diagrama de flujo de Api. Creamos la funcion mdLinksMl y en esta viviran pequeñas funciones para su total uso. 
![APIDiagramaDeFlujo](C:/Users/MARY LOPEZ\DEV004-md-links/API-Diagrama de flujo..png)

*Diagrama de flujo de Cli. Damos vida a cada "option" y determinamos su llamada por comando.
![CLIDiagramaDeFlujo](C:/Users/MARY LOPEZ/DEV004-md-links/CLI-Diagrama de flujo!.png)