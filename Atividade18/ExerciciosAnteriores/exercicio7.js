let http = require('http');
let server = http.createServer((req, res) => {
    let opcao = req.url;
    if (opcao == '/historia') {
        res.end("<html><body>História da Fatec Sorocaba</body></html>");
    }
    if (opcao == '/cursos') {
        res.end("<html><body>Cursos da Fatec Sorocaba</body></html>");
    }
    if (opcao == '/professores') {
        res.end("<html><body>Professores da Fatec Sorocaba</body></html>");
    }
    if (opcao == '/alunos') {
        res.end("<html><body>Alunos da Fatec Sorocaba</body></html>");
    }
    else
        res.end("<html><body>Site da Fatec Sorocaba!</body></html>");
})


server.listen(3000);
console.log('Servidor inicializado');