module.exports = function(app){
    app.get('/informacoes/historia', function(req, res){
        res.render('informacoes/historia');
    });
}