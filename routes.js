const express = require('express')
const general_contrl = require('./controllers/general');
const admin_contrl = require('./controllers/admin');

const routes = express.Router()

// General 
  routes.get("/", general_contrl.index); // página principal 
  routes.get("/receitas", general_contrl.Receitas); // Todas as receitas cadastradas 
  routes.get("/sobre", general_contrl.Sobre); // Informações sobre a empresa  
  routes.get("/receita", general_contrl.UmaReceita); // Mostra uma receita específica

// ADMIN 

    routes.get("/admin/recipes/", admin_contrl.showAll); // página principal 

    routes.get("/admin/recipes/create", admin_contrl.create); // Mostrar formulário de nova receita
    routes.get("/admin/recipe/", admin_contrl.show); // Exibir detalhes de uma receita
    routes.get("/admin/recipe/edit", admin_contrl.edit); // Mostrar formulário de edição de receita
    routes.get("/admin/recipe/delete", admin_contrl.delete); // Deletar uma receita

    routes.post("/admin/recipes",   admin_contrl.post); // Cadastrar nova receita
    routes.put("/admin/recipes",    admin_contrl.put); // Editar uma receita

module.exports = routes