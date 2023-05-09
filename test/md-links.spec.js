//const { mdLinksMl } = require('../index.js');
import {mdLinksMl} from "../index.js";

describe('mdLinksMl', () => {

  /*it('should...', () => {
    console.log('FIX ME!');
  });*/
 /* it('Deberia devolver una promesa', () => {
    expected(mdLinksMl()).toBe(typeof Promise);
  });*/ 
  //¡instancia=pertenece a la categoria! "instanceof promise"
  it('Debe rechazar cuando el path no existe', () =>{
    return mdLinksMl('/rutaSinExistir.md').catch((error)=>{
      expect(error).toBe('La ruta no existe, no podemos continuar')
    })
  })

});
