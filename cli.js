// process 

  // console.log(process.argv);
  if(process.argv.includes('--validate')){
    mdLinksMl('C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/Prueba1.md', '--validate')
   .catch((err) => { console.log(err) })
   .then(console.log)
   }
   if(!process.argv.includes('--validate')){
     mdLinksMl('C:/Users/MARY LOPEZ/DEV004-md-links/pruebas.md/Prueba1.md')
    .catch((err) => { console.log(err) })
    .then(console.log)
    }