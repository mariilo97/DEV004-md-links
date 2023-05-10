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
  it('Debe rechazar cuando el path no existe', () =>{
    return mdLinksMl('/rutaSinExistir.md').catch((error)=>{
      expect(error).toBe('La ruta no existe, no podemos continuar')
    })
  })
  it('Debe ser una ruta absoluta', () => {
    return expect(Promise.resolve('Readme.md')).resolves.toBe('Readme.md')
  })
  /*test('resuelve a limon', () => {
    // Es esencial que se agregue un statement de return
    return expect(Promise.resolve('limon')).resolves.toBe('limon');*/
  /*test('el dato es peanut butter', () => {
    return expect(fetchData()).resolves.toBe('peanut butter');*/
 /* test('has lemon in it', () => {
    return fetchBeverageList().then(list => {
      expect(list).toContain('lemon');
    });*/
});
