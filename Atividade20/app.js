// Importação da configuração do servidor Express
const app = require('./app/config/server');

// Importação e execução dos módulos de rotas (injeção da instância do app)
const rotaHome = require('./app/routes/home');
rotaHome(app);

const rotaSobre = require('./app/routes/sobre');
rotaSobre(app);

const rotaProgramacao = require('./app/routes/programacao');
rotaProgramacao(app);

const rotaContato = require('./app/routes/contato');
rotaContato(app);

const rotaInscricao = require('./app/routes/inscricao');
rotaInscricao(app);

// Desafio Extra: Rota com res.send()
const rotaNovidades = require('./app/routes/novidades');
rotaNovidades(app);

// Inicialização do servidor HTTP na porta 3000
const PORT = 3000;
app.listen(PORT, function() {
    console.log(`--------------------------------------------------`);
    console.log(`Servidor da Semana de Tecnologia rodando com sucesso!`);
    console.log(`Acesse localmente em: http://localhost:${PORT}`);
    console.log(`--------------------------------------------------`);
});
