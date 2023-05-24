import { error } from 'node:console';
import { readFile } from 'node:fs';

//Solo leer los archivos
export const leerArchivo = (route) => {
  return new Promise((resolve, reject) => {
    readFile(route, 'utf8', (err, data) => {
      if (err) reject(err);
      {
        // console.log('algo pasa aqui', data)
        resolve(data)
      }
    })
  })
}
//Extraer los links 
export const extraerLinks = (contenido) => {

  let regex = /(?=\[(!\[.+?\]\(.+?\)|.+?)]\((https:\/\/[^\)]+)\))/gi

  let links = [...contenido.matchAll(regex)].map((m) => ({ text: m[1], link: m[2] }))

  console.log('aqui pasa algo', links)
  return links
}
//Hacer peticion HTTP
