import { error } from 'node:console';
import { readFile } from 'node:fs';

export const leerArchivo = (route) => { //Solo leer los archivos
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

export const extraerLinks = (contenido, route) => {//Solo Extraer los links 

  let regex = /(?=\[(!\[.+?\]\(.+?\)|.+?)]\((https:\/\/[^\)]+)\))/gi

  let links = [...contenido.matchAll(regex)].map((m) => ({ text: m[1], link: m[2], href: route }))

  //console.log('aqui pasa algo', links)
  return links
}

//creando función para validar links
export function validLinks(arrLinks){ //debe recibir un array, que represente mis 3 objetos 
    // console.log(arrLinks,29);
    const newArr5props = arrLinks.map((object)=>{
      // console.log(object,31);
     return fetch(object.link) //Hacer peticion HTTP
      .then((res)=>{
        // console.log(res.status);
        object.status = res.status
        if(res.status <= 299){
          object.statusText = 'OK👍'
        }else{
          object.statusText = 'Fail 😒'
        }
        // object.statusText = res.status <= 299 ? 'OK👍': 'Fail 😒'; // otra forma de llamar la condional 
        // console.log(object);
        return object
      })
      .catch((error)=>{
        // console.log(error, '********');
        object.status = error.status
        object.statusText = 'Fail 😒'
        // console.log(object);
        return object
      })
    })
    return Promise.all(newArr5props)
};

