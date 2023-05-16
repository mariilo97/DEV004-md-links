import { readFile } from 'node:fs';


export const leerArchivo = readFile('C:\Users\MARY LOPEZ\DEV004-md-links\README.md', (err, data) => {
  if (err) //throw err;
  console.log(err);
  {
    console.log('algo pasa aqui', data)
  }
}); 