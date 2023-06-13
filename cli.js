#!/usr/bin/env node

import { mdLinksMl } from "./index.js"
import { argv } from 'node:process';
// process 

//   if(process.argv.includes('--validate')){
//     mdLinksMl(route, routeAbsolute, '--validate')
//    .catch((err) => { console.log(err) })
//    .then(console.log)
//    }
//    if(!process.argv.includes('--validate')){
//      mdLinksMl(route, routeAbsolute)
//     .catch((err) => { console.log(err) })
//     .then(console.log)
//     }

const route = process.argv[2];
const option = process.argv[3];
const option2 = process.argv[4];

if (route && option === undefined) {
    mdLinksMl(route)
        .then((res) => {
            res.forEach((element, i) => {
                console.log(' ');
                // console.log(unique(i += 1));
                console.log(`href: ${element.href}`);
                console.log(`text: ${element.text}`);
                console.log(`links: ${element.links}`);
                console.log('---------------------------')
            });
        })
        .catch((err) => console.log((err)));
} else if (route && option === '--validate' && option2 === undefined) {
    mdLinksMl(route, option)
        .then((res) => {
            res.forEach((element, i) => {
                // console.log(unique(i += 1));
                console.log((`href: ${element.href}`));
                console.log((`text: ${element.text}`));
                console.log((`links: ${element.links}`));
                if (element.ok === 'ok') {
                    console.log(ok(`status : ${element.status}`));
                    console.log(ok(`statusText: ${element.ok}`));
                }
                console.log('------------------------------')
            });
        })
        .catch((err) => console.log((err)));
} else if (route && option === '--stats' && option2 === undefined) {
    mdLinksMl(route)
        .then((res) => {
            const totalLinks = res.length;
            const linksArray = res.map((object) => object.links)
            const uniqueLinks = linksArray.filter((elem, index) => linksArray.indexOf(elem) === index).length;
            console.log(`Total: ${totalLinks}`);
            console.log(`Unique: ${uniqueLinks}`);
        })
        .catch((err) => console.log((err)));
} else if (route && option === '--stats' && option2 === '--validate') {
    mdLinksMl(route, option2)
        .then((res) => {
            const totalLinks = res.length;
            const linksArray = res.map((object) => object.links);
            const uniqueLinks = linksArray.filter((elem, index) => linksArray.indexOf(elem) === index).length;
            const brokenLinks = res.filter((object) => object.statusText === 'Fail 😒').length;
            console.log((`Total: ${totalLinks}`));
            console.log((`Unique: ${uniqueLinks}`));
            console.log((`Broken: ${brokenLinks}`));
        })
        .catch((err) => console.log(error(err)));
} else if (route && option === 'validate' && option2 === '--stats') {
    mdLinksMl(route, option)
        .then((res) => {
            const totalLinks = res.length;
            const linksArray = res.map((object) => object.links);
            const uniqueLinks = linksArray.filter((elem, index) => linksArray.indexOf(elem) === index).length;
            const brokenLinks = res.filter((object) => object.statusText === 'Fail 😒').length;
            console.log((`Total: ${totalLinks}`));
            console.log((`Unique: ${uniqueLinks}`));
            console.log((`Broken: ${brokenLinks}`));
        })
        .catch((err) => console.log((err)));
} else if (argv.includes('--help')) {
    console.log(unique(`
    md-links <ruta> [opcion]
    
     -<ruta>: La ruta del archivo que se desea evaluar.
     -[opcion]: Ingresar la opcion deseada 
    
    * --validate -> Crea la peticion HTTP y valida si el o los links funcionan.

    * --stats -> Estadísticas básicas sobre los links.

     * --stats --validate o --validate --stats -> Texto especifico de la estadística de los links
                                                      y si alguno de ellos estan rotos.
     `
    ));
};