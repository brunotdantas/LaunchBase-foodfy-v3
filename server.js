const express = require('express');
const nunjucks = require('nunjucks'); // template engine usada para renderizar páginas e aplicar lógicas simples a estas
const normalizePort = require('normalize-port');
const routes = require("./routes");
const methodOverride = require('method-override');
//---------------------------------------------------
const server = express();
const Serverport = normalizePort(process.env.PORT || '3000');
server.use(express.urlencoded({ extended: true }))

    // -- pasta de arquivos estaticos para o nunjuck
    server.use(express.static('public/css')); 
    server.use(express.static('public/img')); 
    server.use(express.static('public/')); 

    server.use(methodOverride('_method')); // permitir put e delete
    server.use(routes);

    server.set("view engine", "njk") // define qual o motor de view, neste caso Njk

    nunjucks.configure("views",{
        express: server,
        autoescape: false, // permite mostrar levar html do back end para o front
        noCache: true 
    })// configura qual a pasta dos templates


    server.listen(Serverport, function(){
        console.log(`server is running at port ${Serverport}` );
    })