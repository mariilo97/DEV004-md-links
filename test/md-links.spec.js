import {mdLinksMl} from "../index.js";
import { leerArchivo, extraerLinks, validLinks } from "../Api.js";

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

describe('validLinks', () => {
  it('Debe validar enlaces', (done) => {
    const resultValid =
    [{
      link: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
      href: 'C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/Prueba1.md',
      status: 200,
      statusText: 'OK👍'
    },
    {
     link: 'https://nodejs.org/es/',
      href: 'C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/Prueba1.md',
      status: undefined,
      statusText: 'Fail 😒'
    }]
    validLinks(resultValid).then((res) => {
      expect(res.length).toBe(resultValid.length);
      expect(res[0].statusText).toBe( 'OK👍')
      expect(res[1].statusText).toBe( 'Fail 😒')
      done()
    })
  })
  it('No debe validar enlaces', () => {
    const resulInvalid = [{
      link: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
      href: 'C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/Prueba1.md',
      status: 200,
      statusText: 'OK👍'
    },
    {
     link: 'https://nodejs.org/es/',
      href: 'C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/Prueba1.md',
      status: undefined,
      statusText: 'Fail 😒'
    }]
    validLinks(resulInvalid).catch((err) => {
      expect(err.length).toBe(resultInvalid.length)
      expect(err[0].statusText).toBe('')
      expect(err[1].statusText).toBe( 'OK👍')
    })
  })
});

describe('mdLinksMl', () => {
  // it.only('Deberia devolver una promesa', () => {
  //   const res = mdLinksMl('./index.js');
  //   expect(res instanceof Promise).toBe(true);
  // });
  //¡instancia=pertenece a la categoria! "instanceof promise"  
  it('Debe rechazar cuando el path no existe', () => {
    return mdLinksMl('/rutaSinExistir.md').catch((error) => {
      expect(error).toBe('La ruta no existe, no podemos continuar')
    })
  })
  // it('la ruta existe', () => {
  //   return mdLinksMl('README.md').then((res)=>{
  //     expect(res).resolve(5000)
  //   })
  // })
  // it('Debe ser una ruta absoluta', () => {
  //   return expect(Promise.resolve('Readme.md')).resolves.toBe('Readme.md')
  // })
});
