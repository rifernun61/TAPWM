const express = require('express');
const app = express();

// Configuração da View Engine
app.set('view engine', 'ejs');

// Definição do diretório de views relativo à raiz da aplicação onde o app.js é executado
app.set('views', './app/views');

// Middleware para processar dados de formulários (URL-encoded) caso necessário
app.use(express.urlencoded({ extended: true }));

module.exports = app;
