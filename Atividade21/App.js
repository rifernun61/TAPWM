let app = require('./app/config/server');

let rotaHome = require('./app/routes/home.js');

rotaHome(app);

let rotaAddUsuario = require('./app/routes/adicionar_usuario.js');

rotaAddUsuario(app);

let rotaHistoria = require('./app/routes/historia.js');

rotaHistoria(app);

let rotaCursos = require('./app/routes/cursos.js');

rotaCursos(app);

let rotaProfs = require('./app/routes/professores.js')

rotaProfs(app);

app.listen(3000, function () {

    console.log("Servidou iniciado")

});