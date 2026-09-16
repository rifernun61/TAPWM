module.exports = function(app){
    app.get('/informacoes/cursos', function(req, res){
        res.render('informacoes/cursos');
    });
}