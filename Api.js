import { error } from 'node:console';
import { readFile } from 'node:fs';
// import { axios } from "axios";
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
export const extraerLinks = (contenido, route) => {

  let regex = /(?=\[(!\[.+?\]\(.+?\)|.+?)]\((https:\/\/[^\)]+)\))/gi

  let links = [...contenido.matchAll(regex)].map((m) => ({ text: m[1], link: m[2], href: route }))

  //console.log('aqui pasa algo', links)
  return links
}
// //Hacer peticion HTTP
// export const validate = (links) => {
//   //recorre el array con el resultado de ExtraerLinks
//   const array = links.map((links)=> {
//     async function valiData() {
//       const response = await fetch(route);
//       // const jsonData = await response.json();
//       console.log(valiData);
//     }
//   }
//    )}
//    validate()

  // console.log('++++', array)
//   export  const validate = (links) => { 
//     const result =links.map(links){     //petición http 
//       return axios
//     .get(link.href) //le hace la petición http al link
//     .then (result => ({...link, status: result.status, message: 'Ok'}))
//     .catch(error => {
//       return {...link, status: error.response.status, message: 'Fail', }
//     })
//    };
//   //console.log('result validation', result) // muestra array de promesas pendientes
//     return Promise.all(result);
// }
  //crea la peticion

//  validate()

//creando función para validar links
export function validLinks(arrLinks){ //debe recibir un array, llamar a la función con getmdLinks
    // console.log(arrLinks,58);
    const newArr5props = arrLinks.map((object)=>{
      // console.log(object,60);
     return fetch(object.link)
      .then((res)=>{
        // console.log(res.status);
        object.status = res.status
        if(res.status <= 299){
          object.statusText = 'OK👍'
        }else{
          object.statusText = 'Fail 😒'
        }
        // object.statusText = res.status <= 299 ? 'OK👍': 'Fail 😒';
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
  // return new Promise((resolve) => {
    //     const arrPromise = [];
    //     arrLinks.forEach((object) => {
    //         arrPromise.push(fetch(object.href)) // fetch trabaja con objetos, llamamos href (URL)
    //     });
    //     //allSettled permite ejecutarlo y devolver un resultado, no retiene las otras ejecuciones
    //     Promise.allSettled(arrPromise).then((result)=>{ //fetch devuelve una promesa por eso está asociado a un then
    //        console.log(result, arrLinks, '*****');
    //       for (let i = 0; i < result.length; i++){
    //             let okValue
    //             if(result[i].status === 'fulfilled'){ //si encuentra el status
    //                 result[i].value.ok ? okValue ='ok' : okValue ='fail'
    //                 arrLinks[i].status = result[i].value.status // agregamos el valor del status
    //                 arrLinks[i].ok = okValue // agregamos ok o fail según corresponda
    //             }
    //             else{ //en el caso de no encontrar status
    //                 okValue = 'fail' //declaramos el valor de ok como fail
    //                 arrmdLinks[i].status = 'ERROR' // podría ser redirección, connect timeout, entre otros
    //                 arrmdLinks[i].ok = okValue
    //             }
    //         }
    //         resolve(arrLinks) // se resuelve la promesa devolviendo arrmdLinks con status y ok
    //     })
    // });
    return Promise.all(newArr5props)
};
// Ejemplo de código de Ale
