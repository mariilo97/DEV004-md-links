//const { mdLinksMl } = require('../index.js');
import {mdLinksMl} from "../index.js";
import { leerArchivo } from "../Api.js";

describe('mdLinksMl', () => {

  /*it('should...', () => {
    console.log('FIX ME!');
  });*/
  it('Deberia devolver una promesa', () => {
    const res = mdLinksMl('./index.js');
    expect(res instanceof Promise).toBe(true);
  });
  //¡instancia=pertenece a la categoria! "instanceof promise"  
  it('Debe rechazar cuando el path no existe', () =>{
    return mdLinksMl('/rutaSinExistir.md').catch((error)=>{
      expect(error).toBe('La ruta no existe, no podemos continuar')
    })
  })
  it('Debe ser una ruta absoluta', () => {
    return expect(Promise.resolve('Readme.md')).resolves.toBe('Readme.md')
  })
});

describe('leerArchivo', () => {
  it('Deberia devolver una promesa', () => {
    const res = leerArchivo('./Api.js');
    expect(res instanceof Promise).toBe(true);
  });
  // it('Debe leer un archivo', ()=>{
  //   return leerArchivo('Readme.md').then((res)=>{
  //     expect(res).toBe(expected)
  //   })
  // })
});
