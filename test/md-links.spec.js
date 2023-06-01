//import {mdLinksMl} from "../index.js";
import { leerArchivo, extraerLinks } from "../Api.js";

// describe('mdLinksMl', () => {
//   it('Deberia devolver una promesa', () => {
//     const res = mdLinksMl('./index.js');
//     expect(res instanceof Promise).toBe(true);
//   });
//   //¡instancia=pertenece a la categoria! "instanceof promise"  
//   it('Debe rechazar cuando el path no existe', () =>{
//     return mdLinksMl('/rutaSinExistir.md').catch((error)=>{
//       expect(error).toBe('La ruta no existe, no podemos continuar')
//     })
//   })
//   it('Debe ser una ruta absoluta', () => {
//     return expect(Promise.resolve('Readme.md')).resolves.toBe('Readme.md')
//   })
// });

describe('leerArchivo', () => {
  it('Deberia devolver una promesa', () => {
    const res = leerArchivo('./Api.js');
    expect(res instanceof Promise).toBe(true);
  });
  it('Debe leer un archivo', () => {
    leerArchivo('pruebas.md/Prueba3.md').then((res) => {
      expect(res).toMatch('[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado')
    })
  });
  it('No existe archivo para leer', () => {
    leerArchivo('C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/pruebaVacia.md').catch((err) => {
      expect(err).toThrow('No se encontro el archivo')
    })
  })
});

describe('extraerLinks', () => {
  it('Debe extraer un archivo', () => {
    const contenido = `## 1. Preámbulo
    [Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
    ligero muy popular entre developers. Es usado en muchísimas plataformas que
    manejan texto plano (GitHub, foros, blogs, ...) y es muy común
    encontrar varios archivos en ese formato en cualquier tipo de repositorio.`
    const route = 'C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/Prueba1.md'
    const arr = extraerLinks(contenido, route);
    const result = [{
      text: 'Markdown',
      link: 'https://es.wikipedia.org/wiki/Markdown',
      href: 'C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/Prueba1.md'
    },]
    expect(arr).toEqual(result)
    expect(extraerLinks('', route)).not.toHaveLength(5)
    expect(extraerLinks('', route)).toHaveLength(0)
    // expect(arr).toBe('https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg');
  })
});

// const listaDeCompras = [
//   'pañales',
//   'pañuelos',
//   'bolsas de basura',
//   'toallas de papel',
//   'leche',
// ];

// test('la leche se encuentra en la lista de compras', () => {
//   expect(listaDeCompras).toContain('leche');
//   expect(new Set(listaDeCompras)).toContain('leche');
// });