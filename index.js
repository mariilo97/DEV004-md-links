//creamos nuestros require
import { log } from 'console';
import { existsSync } from 'fs';
import { isAbsolute, resolve } from 'path';
// Mi constante debe tener como parametro Path y Option (lo que necesitamos reconocer y como resolverlo(si valida o no))
//const mdLinksMl = (path, options) => {
export const mdLinksMl = (path, options) => { // Creamos la instancia de markdown-it
  //Creamos la promesa, Funtion(Ejecuta), Callback(resolve y reject = funcion que resuelve la promesa(.then) o rechasa la promesa(.catch))
  return new Promise((resolve, reject) => {
    //Identificamos si es una ruta 
    if (existsSync(path)) {
//confirmamos si la ruta es absoluta o la convertimos 
// startsWith()Determina si una cadena comienza con los caracteres dde una cadena especifica

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

   
const isPathAbsolute = isAbsolute("README.md");
if(isPathAbsolute === true){
  console.log('Ruta absoluta');
  //Nuestra ruta absoluta
}else{
  console.log(resolve('README.md'), 'README.md');
  // convertir la ruta
}
mdLinksMl();