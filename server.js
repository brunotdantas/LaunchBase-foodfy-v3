const express = require('express');
const nunjucks = require('nunjucks'); // template engine usada para renderizar páginas e aplicar lógicas simples a estas
const low = require('lowdb'); // https://github.com/typicode/lowdb/tree/master/examples
const FileSync = require('lowdb/adapters/FileSync');
const normalizePort = require('normalize-port');
const server = express();
const Serverport = normalizePort(process.env.PORT || '3000');

const adapter = new FileSync('data.json')
const db = low(adapter)

const receitas =
    db.get('receipts')
    .filter({})
    .value()

/******************************
 *  Server Setups   
 ******************************/
// configurar express para usar arquivos estaticos das pastas abaixo
    server.use(express.static('public/css')); 
    server.use(express.static('public/img')); 
    server.use(express.static('public/')); 

    server.set("view engine", "njk") // define qual o motor de view, neste caso Njk

    nunjucks.configure("views",{
        express: server,
        autoescape: false, // permite mostrar levar html do back end para o front
        noCache: true 
    })// configura qual a pasta dos templates

/******************************
 *  ROTAS  
 ******************************/
server.get("/", function(req,res){
    return res.render("index", { ListaReceitas : receitas }); 
})

server.get("/receitas", function(req,res){
    return res.render("receitas", { ListaReceitas : receitas }); 
})

server.get("/sobre", function(req,res){
    return res.render("sobre"); // renderiza a views
})

// pagina carregada de acordo com a query string 
server.get("/receita", function(req,res){
    const id = req.query.id;
    const receitaEncontrada = receitas.find(function(receitaEncontrada){
        return receitaEncontrada.id == id; // ja retorna true ou false
    });

    if (!receitaEncontrada){
        return res.send("Receita não encontrada");
    }

    return res.render("receita", { receita: receitaEncontrada })
        
})


/******************************
 *  Setup do server para execução    
 ******************************/
server.listen(Serverport, function(){
    console.log(`server is running at port ${Serverport}` );
})