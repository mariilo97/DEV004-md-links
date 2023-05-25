//creamos nuestros require
import { log } from 'console';
import { existsSync, statSync } from 'fs';
// AS es para crear un alias cuando dos nombres son los mismos y no se crucen en la funcion 
import { isAbsolute, resolve as resolvePath, extname } from 'path';
import { extraerLinks, leerArchivo } from "./Api.js";
// Mi constante debe tener como parametro Path y Option (lo que necesitamos reconocer y como resolverlo(si valida o no))
//const mdLinksMl = (path, options) => {
export const mdLinksMl = (route, options) => { // Creamos la instancia de markdown-it
  //Creamos la promesa, Funtion(Ejecuta), Callback(resolve y reject = funcion que resuelve la promesa(.then) o rechasa la promesa(.catch))
  return new Promise((resolve, reject) => {
    //Identificamos si es una ruta 
    if (existsSync(route)) {
      resolve('la ruta existe')
      //confirmamos si la ruta es absoluta o la convertimos 
      // startsWith()Determina si una cadena comienza con los caracteres dde una cadena especifica
      //const isPathAbsolute = isAbsolute(route);
      if (isAbsolute(route)) {
        resolve('Ruta absoluta');
        //Nuestra ruta absoluta
        //usar "statSync()" es un metodo estatico de fs 
        // let stats = statSync(path);
        // if(stats.isFile() === true){
        //   console.log('es un archivo', extname(path));
        //   //creamos la instancia del archivo 
        //   if(extname(path) === ".md"){
        //     console.log('Es un archivo MD');
        //   }else{
        //     console.log('Este archivo no contiene MD');
        //   }
        // }
      } else {
        console.log('ruta resolviendose', );
        const routeAbsolute = resolvePath(route)
        // convertir la ruta
        let stats = statSync(routeAbsolute);
        if (stats.isFile() === true) {
          resolve('es un archivo', extname(routeAbsolute));
          //creamos la instancia del archivo 
          if (extname(routeAbsolute) === ".md") {
            console.log('Es un archivo MD');
            leerArchivo(routeAbsolute).then((res) => {
              console.log(res, extraerLinks(res, routeAbsolute));
              // resultado de extraer links recorrerlo y hacer petcion http
              // const arrayLinks = extraerLinks()
              //  console.log(arrayLinks)
            })
          } else {
            reject('Este archivo no contiene MD');
          }
        } else {
          reject('Por el momento no leemos directorios, prueba con un archivo');
        }
      }
      //Contiua la logica de Diagrama 

      //comprobamos si es un archivo ("statSync" Permite saber si el archivo encontrado es un directorio o una funcion)
    } else {
      //Si no existe la ruta rechazamos la promesa.
      reject('La ruta no existe, no podemos continuar')    
    }
  })
}
//const md = fs.readFileSync(path, 'utf8');

/*module.exports = {
  mdLinksMl
};*/

// Import the path module
// const path = require('path');



mdLinksMl('pruebas.md/Prueba1.md');