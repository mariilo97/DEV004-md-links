//const { mdLinksMl } = require('../index.js');
import {mdLinksMl} from "../index.js";

describe('mdLinksMl', () => {

  /*it('should...', () => {
    console.log('FIX ME!');
  });*/
  it('Deberia devolver una promesa', () => {
    const res = mdLinksMl('./index.js');
    expect(res instanceof Promise).toBe(true);
  });
  //¡instancia=pertenece a la categoria! "instanceof promise"
//Intento de crear el test de la ruta existente
   it('Deberia devolver que existe una ruta', () => {
    const res = mdLinksMl('../pruebas.md');
  return res.then((result) => {
    expect(result).toBe('exito');
   })
  });
    // it('can find things', () => {
    //   return mdLinksMl('Readme.md', {}, results => {
    //     expect(results.length).toBeGreaterThan(0);
    //  });

  
  it('Debe rechazar cuando el path no existe', () =>{
    return mdLinksMl('/rutaSinExistir.md').catch((error)=>{
      expect(error).toBe('La ruta no existe, no podemos continuar')
    })
  })
  it('Debe ser una ruta absoluta', () => {
    return expect(Promise.resolve('Readme.md')).resolves.toBe('Readme.md')
  })
  // intento de test con ruta alternativa
  // it('Ruta relativa convertida en absoluta'), () =>{
  //   return expect(Promise.resolve('Readme.md')).catch.toBe('Readme.md')
  // }

 
});

  /*test('resuelve a limon', () => {
    // Es esencial que se agregue un statement de return
    return expect(Promise.resolve('limon')).resolves.toBe('limon');*/
  /*test('el dato es peanut butter', () => {
    return expect(fetchData()).resolves.toBe('peanut butter');*/
 /* test('has lemon in it', () => {
    return fetchBeverageList().then(list => {
      expect(list).toContain('lemon');
    });*/
