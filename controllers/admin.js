// ADMIN // ---------------------
const low = require('lowdb'); // https://github.com/typicode/lowdb/tree/master/examples
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data.json')
const db = low(adapter)

let receitas =
    db.get('receipts')
        .filter({})
        .value()

// rotas 
exports.showAll = function (req, res) {
    let receitas =
    db.get('receipts')
        .filter({})
        .value()

    return res.render("adm_gerenciar", { ListaReceitas: receitas });
}

exports.create = function (req,res){
    return res.render("adm_criar");
}
exports.show = function (req,res){
    const id = req.query.id;
    const receitaEncontrada = receitas.find(function (receitaEncontrada) {
        return receitaEncontrada.id == id; 
    });

    if (!receitaEncontrada) {
        return res.send("Receita não encontrada");
    }

    return res.render("adm_receita", { receita: receitaEncontrada })
}
exports.edit  = function (req,res){
    const id = req.query.id;
    const receitaEncontrada = receitas.find(function (receitaEncontrada) {
        return receitaEncontrada.id == id; 
    });

    if (!receitaEncontrada) {
        return res.send("Receita não encontrada");
    }

    return res.render("adm_editar", { receita: receitaEncontrada })
}
exports.post = function (req,res){
    
    var { rec_img = '' } = req.body;
    var { ingredients = [] } = req.body;
    var { preparo = [] } = req.body;
    var { add_info = '' } = req.body; 
    var { titulo_rec = '' } = req.body; 
    var { rec_author = '' } = req.body; 


    const _ = db._ // get lodash instance associated with your db
    var maxid = db.get('receipts')
            .map('id')
            .reverse()
            .take(1)
            .value();
    maxid++
   
    db.get('receipts')
    .push({ 
        id: maxid, 
        image: rec_img,
        title: titulo_rec,
        author: rec_author,
        numAcessos : 0,
        ingredients: ingredients,
        preparation: preparo,
        information: add_info
    })
    .write()

    let receitas =
    db.get('receipts')
        .filter({})
        .value()

    return res.render("adm_gerenciar", { ListaReceitas: receitas });
}
exports.put = function (req,res){
// editar receita 
    var { rec_id } = req.body;
    var { rec_img } = req.body;
    var { ingredients } = req.body;
    var { preparo } = req.body;
    var { add_info } = req.body;

    rec_id = parseInt(rec_id)

    if (db.get('receipts').find({"id":rec_id}).value()){
        // when found update
        console.log(
            db
            .get('receipts')
            .find({"id":rec_id})
            .assign({ 
                "image": rec_img,
                "ingredients": ingredients,
                "preparation": preparo,
                "information" : add_info
            })
            .write()
        );
    }else{
        // when NOT found insert
        console.log(
            'Receita não encontrada no banco de dados'
        );
    }


    return res.redirect(`/admin/recipe?id=${rec_id}`)
}
exports.delete = function (req,res){
    var id_rec = req.query.id;
    id_rec = parseInt(id_rec);

    db.get('receipts')
    .remove({ id: id_rec })
    .write()

    receitas =
    db.get('receipts')
        .filter({})
        .value()

    return res.render("adm_gerenciar", { ListaReceitas: receitas });

}