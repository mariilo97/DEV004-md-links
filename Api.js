import { readFile } from 'node:fs';

//Solo leer los archivos
export const leerArchivo = () => {
  return new Promise ((resolve, reject)=>{
    readFile('Readme.md', 'utf8', (err, data) => {
    if (err) reject(err);
    {
      // console.log('algo pasa aqui', data)
    
       resolve(data)
    }
    
  })

  })

} 

 
//Extraer los links 
