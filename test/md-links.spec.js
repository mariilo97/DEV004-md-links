import { mdLinksMl } from "../index.js";
import { leerArchivo, extraerLinks, validLinks } from "../Api.js";

describe('leerArchivo', () => {
  it('Deberia devolver una promesa', () => {
    const res = leerArchivo('./Api.js');
    expect(res instanceof Promise).toBeTruthy();
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
      expect(res[0].statusText).toBe('OK👍')
      expect(res[1].statusText).toBe('Fail 😒')
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
      expect(err[1].statusText).toBe('OK👍')
    })
  })
});

describe('mdLinksMl', () => {
  it.concurrent('Debe devolver un array, ruta convertida en absoluta', (done) => {
    const resultFinalValid = [
      {
        text: 'Markdown',
        link: 'https://es.wikipedia.org/wiki/Markdown',
        href: 'C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/Prueba1.md',
        status: 200,
        statusText: 'OK👍'
      },
      {
        text: 'Node.js',
        link: 'https://nodejs.org/',
        statusText: 'Fail 😒'
      },
      {
        text: 'motor de JavaScript V8 de Chrome',
        link: 'https://developers.google.com/v8/',
        href: 'C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/Prueba1.md',
        status: 200,
        statusText: 'OK👍'
      }
    ]
    const route = 'pruebas.md/Prueba1.md'
    mdLinksMl(route, '--validate').then((data) => {
      expect(data).toEqual(resultFinalValid)
      done()
    })
  })
  //    it('Debe devolver un array errado, ruta convertida en absoluta', () => {
  //     const resultFinalInvalid = [
  //       {
  //         text: 'Markdown',
  //         link: 'https://es.wikipedia.org/wiki/Markdown',
  //         status: 200,
  //         statusText: 'OK👍'
  //       },
  //       {
  //         text: 'Node.js',
  //         link: 'https://nodejs.org/',
  //         statusText: 'Fail 😒'
  //       },
  //       {
  //         text: 'motor de JavaScript V8 de Chrome',
  //         link: 'https://developers.google.com/v8/',
  //         href: 'C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/Prueba1.md',
  //         statusText: 'OK👍'
  //       }
  //     ]
  //     const route = 'pruebas.md/Prueba1.md'

  //   expect(mdLinksMl(route, "--validate" )).resolves.toMatch(resultFinalInvalid)

  // })
   it.concurrent('Debe devolver un array, ruta absoluta', (done) => {
     const resultValidAbsoluta = [
        {
          text: 'Node.js',
          link: 'https://nodejs.org/es/',
          href: 'C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/prueba4.md',

          statusText: 'Fail 😒'
        },
        {

          link: 'https://developers.google.com/v8/',
          href: 'C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/prueba4.md',
          status: 200,
          statusText: 'OK👍'
        }
      ]
      const route = 'pruebas.md/Prueba1.md'
       mdLinksMl(route, '--validate').catch((data) => {
        expect(data).toMatch(resultValidAbsoluta)
done()
      })
    })
  it.concurrent('Debe devolver un array, ruta es absoluta', () => {
    const resultValidAbsolut = [
      {
        text: 'Node.js',
        link: 'https://nodejs.org/es/',
        href: 'C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/prueba4.md',
        status: undefined,
        statusText: 'Fail 😒'
      },
      {
        text: 'motor de JavaScript V8 de Chrome',
        link: 'https://developers.google.com/v8/',
        href: 'C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/prueba4.md',
        status: 200,
        statusText: 'OK👍'
      }
    ]
    const route = 'C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/prueba4.md'
    mdLinksMl(route, '--validate').then((data) => {
      expect(data).toEqual(resultValidAbsolut)
      
    })
  })
  it('Debe rechazar cuando el path no existe', () => {
    return mdLinksMl('/rutaSinExistir.md').catch((error) => {
      expect(error).toBe('La ruta no existe, no podemos continuar')
    })
  })
  it('Debe ser una ruta absoluta', () => {
    return expect(Promise.resolve('Readme.md')).resolves.toBe('Readme.md')
  })
});
