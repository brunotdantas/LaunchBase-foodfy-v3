const low = require('lowdb'); // https://github.com/typicode/lowdb/tree/master/examples
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data.json')
const db = low(adapter)

const receitas =
    db.get('receipts')
        .filter({})
        .value()

exports.index = function (req, res) {
    return res.render("index", { ListaReceitas: receitas });
}


exports.Receitas = function (req, res) {
    return res.render("receitas", { ListaReceitas: receitas });
}

exports.Sobre = function (req, res) {
    return res.render("sobre"); // renderiza a views
}

exports.UmaReceita = function (req, res) {
    const id = req.query.id;
    const receitaEncontrada = receitas.find(function (receitaEncontrada) {
        return receitaEncontrada.id == id; // ja retorna true ou false
    });

    if (!receitaEncontrada) {
        return res.send("Receita não encontrada");
    }

    return res.render("receita", { receita: receitaEncontrada })

}

