//creamos nuestros require
import { Console, log } from 'console';
import { existsSync, statSync } from 'fs';
// AS es para crear un alias cuando dos nombres son los mismos y no se crucen en la funcion 
import { isAbsolute, resolve as resolvePath, extname } from 'path';
import { extraerLinks, leerArchivo, validLinks } from "./Api.js";
//import { totalstats} from "./calcularStats.js"
// Mi constante debe tener como parametro Path y Option (lo que necesitamos reconocer y como resolverlo(si valida o no))
export const mdLinksMl = (route, option) => { // Creamos la instancia de markdown-it
  //Creamos la promesa, Funtion(Ejecuta), Callback(resolve y reject = funcion que resuelve la promesa(.then) o rechasa la promesa(.catch))
  return new Promise((resolve, reject) => {
    //Identificamos si es una ruta 
    if (existsSync(route)) {
      // resolve('la ruta existe')
      if (isAbsolute(route)) {  //confirmamos si la ruta es absoluta
        // resolve('Ruta absoluta');
        //Nuestra ruta absoluta
        //usar "statSync()" es un metodo estatico de fs 
        let stats = statSync(route);
        if (stats.isFile() === true) {
          // resolve('es un archivo', extname(route));
          //creamos la instancia del archivo 
          if (extname(route) === ".md") {
            // console.log('Es un archivo MD');
            leerArchivo(route).then((res) => {
              //console.log(res, 25);
              const tresObjetos = extraerLinks(res, route)
              if (route, option === "--validate") {
                validLinks(tresObjetos).then((res) => {
                  //  console.log(res, 28);
                  resolve(res)
                }).catch((err) => {
                  //  console.log(err, 30);
                })
              }
              if (route, !option) {
                resolve(tresObjetos)
              }
              // }).catch((err)=>{
              //   console.log(err);
              // })
            })
          } else {
            //console.log('Este archivo no contiene MD');
          }
        }
      } else {
        //console.log('ruta resolviendose', );
        const routeAbsolute = resolvePath(route)
        // convertir la ruta
        let stats = statSync(routeAbsolute);
        if (stats.isFile() === true) {
          // resolve('es un archivo', extname(routeAbsolute));
          //creamos la instancia del archivo 
          if (extname(routeAbsolute) === ".md") {
            // console.log('Es un archivo MD');
            leerArchivo(routeAbsolute).then((res) => {
              // console.log('*****', extraerLinks(res,routeAbsolute))
              // resolve();
              const array3props = extraerLinks(res, routeAbsolute)  // resultado de extraer links recorrerlo y hacer petcion http
              //  console.table(prueba)
              if (routeAbsolute, option === "--validate") {
                validLinks(array3props).then((res) => {
                  //console.log(res, 64);
                  resolve(res) // cambiar por resolve
                }).catch((err) => {
                 // console.log(err, 67);
                })
              }
              if (routeAbsolute, !option) {
                resolve(array3props)
              }
            })
          } else {
            reject('\x1b[31m Este archivo no contiene MD');
          }
        } else {
          reject('\x1b[31m Por el momento no leemos directorios, prueba con un archivo');
        }
      }
    } else {
      //Si no existe la ruta rechazamos la promesa.
      reject( '\x1b[31m La ruta no existe, no podemos continuar')
    }
  })
}
// mdLinksMl('C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/prueba4.md')
//    .catch((err) => { console.log(err) })
//    .then(console.log)
// if (process.argv.includes('--validate')) {
//   mdLinksMl('C:/Users/MARY LOPEZ/DEV004-md-links/README.md', '--validate')
//     .catch((err) => { console.log(err) })
//     .then(console.log)
// }